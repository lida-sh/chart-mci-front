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
          <div class="position-controls">
            <button @click="adjustPosition('up')">⬆️ بالا</button>
            <button @click="adjustPosition('down')">⬇️ پایین</button>
            <span>تنظیم: {{ positionAdjustment }}px</span>
          </div>
        </div>

        <div class="viewer-container">
          <div class="pdf-page-container">
            <canvas ref="canvas"></canvas>
            <div ref="highlightLayer" class="highlightLayer" :style="highlightLayerStyle"></div>
          </div>
        </div>

        <div class="debug-panel">
          <div class="positions-debug">
            <h4>اطلاعات موقعیت:</h4>
            <p>صفحه: {{ currentPage }}</p>
            <p>هایلایت‌ها: {{ currentHighlights.length }}</p>
            <p>موقعیت نمونه: خط {{ sampleHighlight?.line }}, ستون {{ sampleHighlight?.column }}</p>
            <p>محاسبه شده: TOP={{ sampleHighlight?.top }}, LEFT={{ sampleHighlight?.left }}</p>
            <p>تنظیمات: {{ positionAdjustment }}px</p>
          </div>

          <div v-if="currentHighlights.length > 0" class="highlights-list">
            <h4>هایلایت‌های صفحه {{ currentPage }}</h4>
            <div v-for="(highlight, index) in currentHighlights" :key="index" class="highlight-item">
              <span class="highlight-type" :class="highlight.type">
                {{ highlight.type === 'text' ? 'متن' : 'OCR' }}
              </span>
              <div class="highlight-context">
                "{{ highlight.context }}"
              </div>
              <div class="highlight-position">
                خط {{ highlight.line }} - ستون {{ highlight.column }}
              </div>
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
const currentPage = ref(1)
const totalPages = ref(0)
const currentHighlights = ref([])
const scale = ref(1.5)
const positionAdjustment = ref(-50) // تنظیم موقعیت - منفی یعنی بالاتر

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

const sampleHighlight = computed(() => {
  return currentHighlights.value[0] || null
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

// تنظیم موقعیت
const adjustPosition = (direction) => {
  if (direction === 'up') {
    positionAdjustment.value -= 10
  } else if (direction === 'down') {
    positionAdjustment.value += 10
  }
  renderHighlights()
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

    // 🔹 رندر صفحه PDF
    await page.render(renderContext).promise

    // 🔹 استخراج متن واقعی صفحه از PDF
    const textContent = await page.getTextContent()

    // 🔹 ساخت لایه متنی مخفی برای محاسبه مختصات واقعی متن‌ها
    const textLayerDiv = document.createElement('div')
    textLayerDiv.style.display = 'none'
    document.body.appendChild(textLayerDiv)

    await $pdfjsLib.renderTextLayer({
      textContent,
      container: textLayerDiv,
      viewport: currentViewport
    }).promise

    // 🔹 چاپ مختصات واقعی هر کلمه در console
    Array.from(textLayerDiv.querySelectorAll('span')).forEach(span => {
      const rect = span.getBoundingClientRect()
      console.log('📍 متن:', span.textContent, rect)
    })

    // ✅ حالا می‌تونی از این مختصات برای جایگذاری دقیق هایلایت استفاده کنی
    currentPage.value = pageNum
    updateCurrentHighlights()
    renderHighlights()

  } catch (err) {
    console.error('خطا در رندر صفحه:', err)
  }
}

// رندر هایلایت‌ها
const renderHighlights = () => {
  if (!highlightLayer.value || !currentViewport) return

  // پاک کردن هایلایت‌های قبلی
  highlightLayer.value.innerHTML = ''

  const highlights = currentHighlights.value
  if (highlights.length === 0) return

  highlights.forEach((highlight, index) => {
    createHighlightElement(highlight, index)
  })
}

// ایجاد المان هایلایت با تنظیمات دقیق
const createHighlightElement = (highlight, index) => {
  if (!highlightLayer.value || !currentViewport) return

  const highlightDiv = document.createElement('div')
  highlightDiv.className = `pdf-highlight ${highlight.type}`

  // 📏 مقادیر پایه از ابعاد واقعی صفحه
  const pageWidth = currentViewport.width
  const pageHeight = currentViewport.height

  // تنظیمات نسبی بر اساس ابعاد صفحه
  const config = {
    topMargin: pageHeight * 0.05,      // 5٪ از بالا
    leftMargin: pageWidth * 0.08,      // 8٪ از چپ
    lineHeight: pageHeight / 45,       // حدود 45 خط در هر صفحه
    charWidth: pageWidth / 100,        // حدود 100 کاراکتر در هر خط
    lineOffset: -1
  }

  const line = (highlight.line || 1) + config.lineOffset
  const column = highlight.column || 1

  // 📍 محاسبه موقعیت درون صفحه
  let top = config.topMargin + (line * config.lineHeight)
  let left = config.leftMargin + (column * config.charWidth)

  // 📐 جهت فارسی (از راست به چپ)
  const textWidth = (highlight.length || 5) * config.charWidth
  left = pageWidth - left - textWidth // محاسبه از سمت راست

  // 🎯 تصحیح دستی چون الان بالاتر و راست‌تر نیست — بلکه چپ و بالا است:
  // اگر در گوشه چپ بالا افتاده، یعنی اعداد خیلی کوچک‌اند
  // پس باید کمی به پایین و راست ببریم:
  top += 40       // می‌برد پایین‌تر
  left += 40     // می‌برد راست‌تر

  // 📏 اندازه‌های نهایی
  const width = Math.max(80, textWidth)
  const height = config.lineHeight * 0.7

  highlightDiv.style.position = 'absolute'
  highlightDiv.style.left = `${left}px`
  highlightDiv.style.top = `${top}px`
  highlightDiv.style.width = `${width}px`
  highlightDiv.style.height = `${height}px`

  highlightDiv.style.backgroundColor = highlight.type === 'text'
    ? 'rgba(255, 235, 59, 0.6)'
    : 'rgba(76, 175, 80, 0.6)'
  highlightDiv.style.border = '1px solid #ff9800'
  highlightDiv.style.borderRadius = '3px'
  highlightDiv.style.pointerEvents = 'auto'

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

    // رندر صفحه اول
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

.position-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff3cd;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ffeaa7;
}

.position-controls button {
  padding: 0.3rem 0.6rem !important;
  font-size: 0.8rem;
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
}

.debug-panel {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
}

.positions-debug {
  padding: 1rem;
  background: #e3f2fd;
  border-radius: 8px;
  border-right: 4px solid #2196f3;
}

.positions-debug h4 {
  margin: 0 0 0.5rem 0;
  color: #1976d2;
}

.highlights-list {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-right: 4px solid #007bff;
  max-height: 400px;
  overflow-y: auto;
}

.highlight-item {
  padding: 0.75rem;
  margin: 0.5rem 0;
  background: white;
  border-radius: 6px;
  border-right: 3px solid #ddd;
}

.highlight-type {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  margin-left: 0.5rem;
  color: white;
  font-weight: bold;
}

.highlight-type.text {
  background: #ff9800;
}

.highlight-type.ocr {
  background: #4caf50;
}

.highlight-context {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #333;
}

.highlight-position {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.25rem;
}
</style>