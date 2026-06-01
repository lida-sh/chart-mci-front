<template>
  <div>
    <div v-if="loading" class="loading">
      📄 در حال بارگذاری PDF...
    </div>
    
    <div v-else-if="error" class="error">
      ❌ {{ error }}
      <button @click="loadPdf" class="retry-btn">تلاش مجدد</button>
    </div>
    
    <div v-else class="pdf-viewer">
      <div class="controls">
        <button @click="prevPage" :disabled="currentPage <= 1">⬅️ قبلی</button>
        <span>صفحه {{ currentPage }} از {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages">بعدی ➡️</button>
        <select v-model="scale" @change="renderCurrentPage" class="scale-select">
          <option value="1.0">100%</option>
          <option value="1.5">150%</option>
          <option value="2.0">200%</option>
        </select>
      </div>
      
      <div class="canvas-container">
        <canvas ref="canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const loadPDFJS = () => {
  return new Promise((resolve) => {
    if (window.pdfjsLib) {
      resolve(window.pdfjsLib);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      resolve(window.pdfjsLib);
    };
    document.head.appendChild(script);
  });
};

const props = defineProps({
  pdfUrl: String
});

const loading = ref(false);
const error = ref('');
const canvas = ref(null);
const currentPage = ref(1);
const totalPages = ref(0);
const scale = ref('1.5');
let pdfDoc = null;

const loadPdf = async () => {
  if (!props.pdfUrl) return;
  
  try {
    loading.value = true;
    error.value = '';
    
    const pdfjsLib = await loadPDFJS();
    
    // تنظیمات پیشرفته برای فارسی
    const loadingTask = pdfjsLib.getDocument({
      url: `http://dms-back.test/pdf/${props.pdfUrl}`,
      cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
      cMapPacked: true,
      standardFontDataUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/standard_fonts/',
      disableFontFace: true, // غیرفعال کردن font-face برای جلوگیری از تداخل
      useSystemFonts: false, // استفاده از فونت‌های PDF.js
    });
    
    pdfDoc = await loadingTask.promise;
    totalPages.value = pdfDoc.numPages;
    await renderPage(1);
    
  } catch (err) {
    error.value = 'خطا در بارگذاری PDF';
    console.error('خطای کامل:', err);
  } finally {
    loading.value = false;
  }
};

const renderPage = async (num) => {
  if (!pdfDoc || !canvas.value) return;
  
  try {
    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport({ scale: parseFloat(scale.value) });
    
    const ctx = canvas.value.getContext('2d');
    
    // تنظیم اندازه canvas
    canvas.value.height = viewport.height;
    canvas.value.width = viewport.width;
    
    // پاک کردن canvas
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    
    // تنظیمات رندر برای متن فارسی
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
      enableWebGL: false,
      useWorker: false,
      // غیرفعال کردن ویژگی‌هایی که باعث مشکل در فارسی می‌شوند
      textLayer: false,
      enhanceTextSelection: false,
      renderInteractiveForms: false,
      // تنظیمات بهینه برای متن
      disableAutoScale: true,
      imageLayer: false
    };
    
    await page.render(renderContext).promise;
    
    currentPage.value = num;
    
  } catch (err) {
    error.value = 'خطا در نمایش صفحه';
    console.error('خطای رندر:', err);
  }
};

const renderCurrentPage = () => {
  renderPage(currentPage.value);
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    renderPage(currentPage.value + 1);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    renderPage(currentPage.value - 1);
  }
};

watch(() => props.pdfUrl, loadPdf);
onMounted(() => props.pdfUrl && loadPdf());
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
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  flex-wrap: wrap;
}

.controls span {
  font-weight: bold;
  color: #333;
}

.controls button {
  padding: 0.5rem 1rem;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.controls button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.controls button:hover:not(:disabled) {
  background: #0056b3;
}

.scale-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
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

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .controls button, .scale-select {
    width: 100%;
    max-width: 200px;
  }
}
</style>