<template>
  <ClientOnly fallback="📄 در حال آماده‌سازی PDF...">
    <div>
      <div v-if="loading" class="loading">
        📄 در حال بارگذاری PDF...
      </div>

      <div v-else-if="error" class="error">
        ❌ {{ error }}
      </div>

      <div v-else class="pdf-viewer">
        <div class="controls">
          <button @click="prevPage" :disabled="currentPage <= 1">⬅️ صفحه قبلی</button>
          <span>صفحه {{ currentPage }} از {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage >= totalPages">صفحه بعدی ➡️</button>
          <div class="zoom-controls">
            <button @click="zoomOut">🔍-</button>
            <span>{{ Math.round(scale * 100) }}%</span>
            <button @click="zoomIn">🔍+</button>
          </div>
        </div>

        <div class="viewer-container">
          <div class="pdf-page-container">
            <canvas ref="canvas"></canvas>
            <div ref="highlightLayer" class="highlightLayer" :style="highlightLayerStyle"></div>
            <div ref="textLayer" class="textLayer" :style="highlightLayerStyle"></div>
          </div>
        </div>

        <div class="debug-panel">
          <div class="positions-debug">
            <h4>اطلاعات موقعیت:</h4>
            <p>صفحه: {{ currentPage }}</p>
            <p>هایلایت‌ها: {{ currentHighlights.length }}</p>
            <p>متن‌های یافت شده: {{ textItems.length }}</p>
            <button @click="showTextItems = !showTextItems">
              {{ showTextItems ? 'مخفی کردن متن‌ها' : 'نمایش متن‌های صفحه' }}
            </button>
          </div>

          <div v-if="showTextItems" class="text-items-list">
            <h4>متن‌های صفحه {{ currentPage }}</h4>
            <div v-for="(item, index) in textItems" :key="index" class="text-item">
              <span class="item-index">#{{ index }}</span>
              <span class="item-text">"{{ item.str }}"</span>
              <span class="item-coords">({{ Math.round(item.transform[4]) }}, {{ Math.round(item.transform[5]) }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
const { $pdfjsLib } = useNuxtApp();

const props = defineProps({
  pdfUrl: { type: String, required: true },
  pageNumber: { type: [Number, String], default: 1 },
  positions: { type: Array, default: () => [] }
})

// Refs
const loading = ref(false)
const error = ref('')
const canvas = ref(null)
const highlightLayer = ref(null)
const textLayer = ref(null)
const currentPage = ref(1)
const totalPages = ref(0)
const currentHighlights = ref([])
const textItems = ref([])
const showTextItems = ref(false)
const scale = ref(1.5)

let pdfDoc = null
let currentViewport = null

// computed properties
const highlightLayerStyle = computed(() => {
  if (!currentViewport) return {}
  return {
    width: `${currentViewport.width}px`,
    height: `${currentViewport.height}px`
  }
})

// هایلایت‌های صفحه جاری
const updateCurrentHighlights = () => {
  if (!props.positions || !Array.isArray(props.positions)) {
    currentHighlights.value = []
    return
  }

  const allPositions = props.positions.flat().filter(pos => pos && typeof pos === 'object')
  currentHighlights.value = allPositions.filter(position => position.page === currentPage.value)
}

// پیدا کردن موقعیت واقعی متن در PDF
const findTextPosition = async (highlight) => {
  if (!pdfDoc || !currentViewport) return null

  try {
    const page = await pdfDoc.getPage(currentPage.value)
    const textContent = await page.getTextContent()
    
    const searchText = highlight.context || highlight.text || ''
    if (!searchText) return null

    // جستجوی متن در بین آیتم‌های متنی
    for (const item of textContent.items) {
      if (item.str.includes(searchText) || searchText.includes(item.str)) {
        const transform = item.transform
        const x = transform[4]
        const y = transform[5]
        
        // تبدیل مختصات PDF به مختصات صفحه
        const viewportCoords = currentViewport.convertToViewportPoint(x, y)
        
        return {
          left: viewportCoords[0],
          top: currentViewport.height - viewportCoords[1], // PDF Y معکوس است
          width: item.width * currentViewport.scale,
          height: item.height * currentViewport.scale,
          text: item.str
        }
      }
    }
    
    return null
  } catch (err) {
    console.error('خطا در پیدا کردن موقعیت متن:', err)
    return null
  }
}

// رندر صفحه
const renderPage = async (pageNum) => {
  if (!pdfDoc || !canvas.value) return

  try {
    const page = await pdfDoc.getPage(pageNum)
    currentViewport = page.getViewport({ scale: scale.value })

    const ctx = canvas.value.getContext('2d')
    canvas.value.width = currentViewport.width
    canvas.value.height = currentViewport.height

    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

    const renderContext = {
      canvasContext: ctx,
      viewport: currentViewport
    }

    await page.render(renderContext).promise

    // استخراج متن برای دیباگ
    const textContent = await page.getTextContent()
    textItems.value = textContent.items

    currentPage.value = pageNum
    updateCurrentHighlights()
    await renderHighlights()

  } catch (err) {
    console.error('خطا در رندر صفحه:', err)
  }
}

// رندر هایلایت‌ها با مختصات واقعی
const renderHighlights = async () => {
  if (!highlightLayer.value || !currentViewport) return

  // پاک کردن هایلایت‌های قبلی
  highlightLayer.value.innerHTML = ''

  const highlights = currentHighlights.value
  if (highlights.length === 0) return

  for (const highlight of highlights) {
    await createHighlightElement(highlight)
  }
}

// ایجاد المان هایلایت با مختصات واقعی
const createHighlightElement = async (highlight) => {
  if (!highlightLayer.value) return

  // پیدا کردن موقعیت واقعی متن
  const textPosition = await findTextPosition(highlight)
  
  if (!textPosition) {
    console.warn('متن پیدا نشد برای هایلایت:', highlight)
    
    // روش جایگزین: استفاده از موقعیت‌های تقریبی
    createApproximateHighlight(highlight)
    return
  }

  const highlightDiv = document.createElement('div')
  highlightDiv.className = `pdf-highlight ${highlight.type}`
  
  highlightDiv.style.position = 'absolute'
  highlightDiv.style.left = `${textPosition.left}px`
  highlightDiv.style.top = `${textPosition.top}px`
  highlightDiv.style.width = `${textPosition.width}px`
  highlightDiv.style.height = `${textPosition.height}px`

  highlightDiv.style.backgroundColor = highlight.type === 'text' 
    ? 'rgba(255, 235, 59, 0.6)' 
    : 'rgba(76, 175, 80, 0.6)'
  highlightDiv.style.border = '2px solid #ff9800'
  highlightDiv.style.borderRadius = '3px'
  highlightDiv.style.pointerEvents = 'auto'
  highlightDiv.style.zIndex = '100'

  // اضافه کردن اطلاعات برای دیباگ
  highlightDiv.title = `متن: "${textPosition.text}"`

  highlightLayer.value.appendChild(highlightDiv)
}

// روش جایگزین برای زمانی که متن دقیق پیدا نمی‌شود
const createApproximateHighlight = (highlight) => {
  const highlightDiv = document.createElement('div')
  highlightDiv.className = `pdf-highlight ${highlight.type} approximate`
  
  // استفاده از موقعیت‌های نسبی
  const pageWidth = currentViewport.width
  const pageHeight = currentViewport.height
  
  const line = highlight.line || 1
  const column = highlight.column || 1
  
  const top = (line / 50) * pageHeight  // فرض 50 خط در صفحه
  const left = (column / 100) * pageWidth // فرض 100 ستون در صفحه
  const width = pageWidth * 0.2
  const height = pageHeight * 0.03

  highlightDiv.style.position = 'absolute'
  highlightDiv.style.left = `${left}px`
  highlightDiv.style.top = `${top}px`
  highlightDiv.style.width = `${width}px`
  highlightDiv.style.height = `${height}px`

  highlightDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.3)'
  highlightDiv.style.border = '1px dashed #f44336'
  highlightDiv.style.borderRadius = '3px'
  highlightDiv.title = 'هایلایت تقریبی - متن دقیق پیدا نشد'

  highlightLayer.value.appendChild(highlightDiv)
}

// کنترل‌های صفحه
const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    await renderPage(currentPage.value + 1)
  }
}

const prevPage = async () => {
  if (currentPage.value > 1) {
    await renderPage(currentPage.value - 1)
  }
}

// کنترل‌های زوم
const zoomIn = async () => {
  scale.value = Math.min(scale.value + 0.25, 3)
  await renderPage(currentPage.value)
}

const zoomOut = async () => {
  scale.value = Math.max(scale.value - 0.25, 0.5)
  await renderPage(currentPage.value)
}

// بارگذاری PDF
const loadPdf = async () => {
  try {
    loading.value = true
    error.value = ''

    const pdfPath = `http://dms-back.test/pdf/${props.pdfUrl}`

    const loadingTask = $pdfjsLib.getDocument({
      url: pdfPath,
      cMapUrl: '/cmaps/',
      cMapPacked: true,
      disableFontFace: true
    })

    pdfDoc = await loadingTask.promise
    totalPages.value = pdfDoc.numPages

    const initialPage = parseInt(props.pageNumber) || 1
    await renderPage(initialPage)
  } catch (err) {
    error.value = 'خطا در بارگذاری PDF: ' + err.message
    console.error('❌ خطا:', err)
  } finally {
    loading.value = false
  }
}

// واکنش به تغییرات
watch(() => props.positions, (newPositions) => {
  console.log('🔄 موقعیت‌های هایلایت به روز شد')
  updateCurrentHighlights()
  if (pdfDoc && currentViewport) {
    renderHighlights()
  }
}, { deep: true })

watch(() => props.pageNumber, (newPage) => {
  if (pdfDoc && newPage) {
    const pageNum = parseInt(newPage)
    if (pageNum >= 1 && pageNum <= totalPages.value) {
      renderPage(pageNum)
    }
  }
})

onMounted(async () => {
  if (props.pdfUrl) {
    await loadPdf()
  }
})

watch(() => props.pdfUrl, async (newUrl) => {
  if (newUrl) {
    await loadPdf()
  }
})
</script>

<style scoped>
/* استایل‌ها مانند قبل */
.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #d32f2f;
  background-color: #ffebee;
  border-radius: 8px;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  flex-wrap: wrap;
}

.controls button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.controls button:hover:not(:disabled) {
  background: #e3f2fd;
  border-color: #2196f3;
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.zoom-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.viewer-container {
  display: flex;
  justify-content: center;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: auto;
  max-width: 100%;
}

.pdf-page-container {
  position: relative;
  display: inline-block;
}

canvas {
  display: block;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 100%;
  height: auto;
}

.highlightLayer {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.textLayer {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.2;
  pointer-events: none;
}

.pdf-highlight {
  position: absolute;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.3s ease;
  z-index: 100;
  pointer-events: auto;
}

.pdf-highlight:hover {
  transform: scale(1.03);
  z-index: 200;
  box-shadow: 0 0 8px rgba(255, 152, 0, 0.8);
}

.pdf-highlight.approximate {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 0.3; }
  50% { opacity: 0.6; }
  100% { opacity: 0.3; }
}

.debug-panel {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.positions-debug {
  margin-bottom: 1rem;
}

.text-items-list {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  background: white;
}

.text-item {
  padding: 0.5rem;
  margin: 0.25rem 0;
  border-bottom: 1px solid #eee;
  font-family: monospace;
  font-size: 0.8rem;
}

.item-index {
  color: #666;
  margin-left: 0.5rem;
}

.item-text {
  color: #333;
  margin: 0 0.5rem;
}

.item-coords {
  color: #007bff;
  font-size: 0.7rem;
}
</style>