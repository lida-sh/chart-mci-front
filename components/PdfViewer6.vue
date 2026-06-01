<template>
  <ClientOnly fallback="📄 در حال آماده‌سازی PDF...">
    <div>
      <div v-if="loading" class="loading">
        📄 در حال بارگذاری PDF...
      </div>

      <div v-else-if="error" class="error">
        ❌ {{ error }}
        <pre style="text-align:left; direction:ltr; background:#f8f8f8; padding:10px;">{{ fullError }}</pre>
      </div>

      <div v-else class="pdf-viewer">
        <div class="canvas-container">
          <canvas ref="canvas"></canvas>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
definePageMeta({
  ssr: false
})
const { $pdfjsLib } = useNuxtApp();


const props = defineProps({
  pdfUrl: { type: String, required: true },
  pageNumber: { type: [Number, String], default: 1 } // 👈 شماره صفحه هدف
})

const loading = ref(false)
const error = ref('')
const fullError = ref('')
const canvas = ref(null)
const currentPage = ref(1)
let pdfDoc = null
let pdfReady = ref(false)

const renderPage = async (num) => {
  if (!pdfDoc || !canvas.value) return
  const page = await pdfDoc.getPage(num)
  const scale = 2.0
  const viewport = page.getViewport({ scale })

  const ctx = canvas.value.getContext('2d')
  const outputScale = window.devicePixelRatio || 1

  canvas.value.width = viewport.width * outputScale
  canvas.value.height = viewport.height * outputScale
  ctx.setTransform(outputScale, 0, 0, outputScale, 0, 0)
  ctx.clearRect(0, 0, viewport.width, viewport.height)

  await page.render({ canvasContext: ctx, viewport }).promise
  currentPage.value = num
  console.log(`✅ صفحه ${num} رندر شد.`)
}

const loadPdf = async () => {
  try {
    loading.value = true
    error.value = ''
    fullError.value = ''
    pdfReady.value = false

    const pdfPath = `http://dms-back.test/pdf/${props.pdfUrl}`
    console.log('📄 مسیر PDF:', pdfPath)

    const loadingTask = $pdfjsLib.getDocument({
      url: pdfPath,
      cMapUrl: '/cmaps/',
      cMapPacked: true,
      disableFontFace: true
    })

    pdfDoc = await loadingTask.promise
    console.log('✅ PDF لود شد:', pdfDoc.numPages, 'صفحه')
    pdfReady.value = true
  } catch (err) {
    error.value = 'خطا در بارگذاری PDF'
    fullError.value = String(err)
    console.error('❌ خطا:', err)
  } finally {
    loading.value = false
  }
}

// وقتی canvas و pdf آماده شدند، صفحه‌ی مشخص‌شده را نمایش بده
watch([canvas, pdfReady], async ([canvasEl, ready]) => {
  if (canvasEl && ready) {
    await nextTick()
    const targetPage = parseInt(props.pageNumber) || 1
    const safePage = Math.min(Math.max(targetPage, 1), pdfDoc.numPages)
    console.log('🎯 رفتن به صفحه:', safePage)
    await renderPage(safePage)
  }
})

onMounted(async () => {
  if (props.pdfUrl) await loadPdf()
})

watch(() => props.pdfUrl, async () => {
  if (props.pdfUrl) await loadPdf()
})
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}
.error {
  text-align: center;
  padding: 2rem;
  color: #d32f2f;
  background-color: #ffebee;
  border-radius: 8px;
  margin: 1rem 0;
  direction: ltr;
}
.canvas-container {
  display: flex;
  justify-content: center;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: auto;
  max-width: 100%;
}
canvas {
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 100%;
  height: auto;
}
</style>
