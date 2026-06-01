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
          <option value="1.2">120%</option>
          <option value="1.5">150%</option>
          <option value="2.0">200%</option>
        </select>
        <div v-if="highlightInfo.word && highlightInfo.pages.length > 0" class="highlight-info">
          هایلایت: "{{ highlightInfo.word }}" در صفحات {{ highlightInfo.pages.join(', ') }}
        </div>
      </div>
      
      <div class="canvas-container">
        <canvas ref="canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as pdfjsLib from 'pdfjs-dist';
import { BASE_URL } from '~/composables/api/api.config'

// تنظیم worker با فایل محلی
pdfjsLib.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.js';

const props = defineProps({
  pdfUrl: {
    type: String,
    required: true
  },
  highlightWord: {
    type: String,
    default: ''
  },
  highlightPages: {
    type: Array,
    default: () => [] // آرایه شماره صفحات برای هایلایت
  },
  highlightColor: {
    type: String,
    default: 'rgba(255, 255, 0, 0.3)' // رنگ پیش‌فرض هایلایت
  }
});

const loading = ref(false);
const error = ref('');
const canvas = ref(null);
const currentPage = ref(1);
const totalPages = ref(0);
const scale = ref('1.5');
const highlightInfo = ref({
  word: '',
  pages: []
});
const isPdfReady = ref(false);
const isCanvasReady = ref(false);

let pdfDoc = null;
let originalPageCanvas = new Map(); // ذخیره کپی اصلی هر صفحه

// مشاهده تغییرات در canvas ref
watch(canvas, (newCanvas) => {
  if (newCanvas) {
    console.log('Canvas render شد');
    isCanvasReady.value = true;
    if (pdfDoc && !loading.value) {
      renderCurrentPage();
    }
  }
});

// مشاهده تغییرات در props - فقط وقتی PDF آماده است
watch(() => props.highlightWord, (newWord) => {
  if (newWord && isPdfReady.value) {
    highlightInfo.value.word = newWord;
    applyHighlights();
  }
});

watch(() => props.highlightPages, (newPages) => {
  if (isPdfReady.value) {
    highlightInfo.value.pages = [...newPages];
    applyHighlights();
  }
}, { deep: true });

const loadPdf = async () => {
  if (!props.pdfUrl) return;
  
  try {
    loading.value = true;
    error.value = '';
    isPdfReady.value = false;
    
    console.log('شروع بارگذاری PDF...');
    
    const loadingTask = pdfjsLib.getDocument({
      url: `http://dms-back.test/pdf/${props.pdfUrl}`,
      standardFontDataUrl: null,
      cMapUrl: null,
      cMapPacked: false,
      disableFontFace: true,
      useSystemFonts: true,
      disableAutoFetch: true,
      disableStream: true,
      isEvalSupported: false
    });
    
    pdfDoc = await loadingTask.promise;
    totalPages.value = pdfDoc.numPages;
    
    console.log(`PDF بارگذاری شد. تعداد صفحات: ${totalPages.value}`);
    
    // مقداردهی اولیه highlightInfo از props
    highlightInfo.value = {
      word: props.highlightWord || '',
      pages: props.highlightPages || []
    };
    
    // منتظر ماندن برای اطمینان از render شدن DOM و canvas
    await waitForCanvas();
    
    if (!canvas.value) {
      throw new Error('Canvas بعد از انتظار نیز پیدا نشد');
    }
    
    await renderPage(1);
    
    // علامت گذاری که PDF آماده است
    isPdfReady.value = true;
    
    // هایلایت صفحات پس از بارگذاری
    if (highlightInfo.value.word && highlightInfo.value.pages.length > 0) {
      console.log('اعمال هایلایت اولیه...');
      await applyHighlights();
    }
    
    console.log('PDF کاملاً آماده است');
    
  } catch (err) {
    error.value = 'خطا در بارگذاری PDF: ' + err.message;
    console.error('خطای کامل:', err);
  } finally {
    loading.value = false;
  }
};

// تابع برای انتظار تا canvas render شود
const waitForCanvas = async (maxAttempts = 10) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (canvas.value) {
      console.log('Canvas پیدا شد در تلاش', attempt);
      return true;
    }
    console.log('منتظر canvas... تلاش', attempt);
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms منتظر بمان
  }
  return false;
};

const renderPage = async (num) => {
  if (!pdfDoc || !canvas.value) {
    console.warn('PDF یا canvas آماده نیست برای رندر صفحه', num, {
      hasPdfDoc: !!pdfDoc,
      hasCanvas: !!canvas.value
    });
    return;
  }
  
  try {
    console.log(`رندر صفحه ${num}...`);
    
    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport({ scale: parseFloat(scale.value) });
    
    const ctx = canvas.value.getContext('2d');
    if (!ctx) {
      console.error('Context canvas پیدا نشد');
      return;
    }
    
    // تنظیم اندازه canvas با در نظر گرفتن DPI
    const outputScale = window.devicePixelRatio || 1;
    canvas.value.height = Math.floor(viewport.height * outputScale);
    canvas.value.width = Math.floor(viewport.width * outputScale);
    
    ctx.scale(outputScale, outputScale);
    
    // پاک کردن canvas
    ctx.clearRect(0, 0, viewport.width, viewport.height);
    
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
      enableWebGL: false,
    };
    
    await page.render(renderContext).promise;
    
    console.log(`صفحه ${num} رندر شد`);
    
    // ذخیره کپی اصلی از صفحه
    saveOriginalCanvas(num);
    
    currentPage.value = num;
    
    // اگر صفحه جاری در لیست صفحات هایلایت است، هایلایت کن
    if (shouldHighlightPage(num)) {
      console.log(`هایلایت صفحه ${num} به دلیل وجود در لیست...`);
      await highlightTextInPage(num, highlightInfo.value.word);
    }
    
  } catch (err) {
    error.value = 'خطا در نمایش صفحه';
    console.error('خطای رندر:', err);
  }
};

// بررسی آیا صفحه باید هایلایت شود
const shouldHighlightPage = (pageNum) => {
  const shouldHighlight = highlightInfo.value.pages.includes(pageNum) && highlightInfo.value.word;
  console.log(`بررسی هایلایت صفحه ${pageNum}:`, shouldHighlight);
  return shouldHighlight;
};

// ذخیره کپی اصلی از صفحه
const saveOriginalCanvas = (pageNum) => {
  if (!canvas.value) {
    console.warn('Canvas برای ذخیره سازی موجود نیست');
    return;
  }
  
  try {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    tempCanvas.width = canvas.value.width;
    tempCanvas.height = canvas.value.height;
    
    tempCtx.drawImage(canvas.value, 0, 0);
    originalPageCanvas.set(pageNum, tempCanvas);
    
    console.log(`ذخیره canvas اصلی برای صفحه ${pageNum}`);
  } catch (err) {
    console.error('خطا در ذخیره canvas:', err);
  }
};

// بازگردانی صفحه اصلی
const restoreOriginalCanvas = (pageNum) => {
  const originalCanvas = originalPageCanvas.get(pageNum);
  if (!originalCanvas || !canvas.value) {
    console.warn(`Canvas اصلی برای صفحه ${pageNum} برای بازگردانی موجود نیست`);
    return false;
  }
  
  try {
    const ctx = canvas.value.getContext('2d');
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.drawImage(originalCanvas, 0, 0);
    console.log(`بازگردانی canvas اصلی برای صفحه ${pageNum}`);
    return true;
  } catch (err) {
    console.error('خطا در بازگردانی canvas:', err);
    return false;
  }
};

// هایلایت متن در صفحه مشخص شده
const highlightTextInPage = async (pageNum, text) => {
  if (!pdfDoc || !text.trim() || !canvas.value) {
    console.warn('شرایط هایلایت فراهم نیست:', {
      hasPdfDoc: !!pdfDoc,
      hasText: !!text.trim(),
      hasCanvas: !!canvas.value
    });
    return;
  }
  
  try {
    console.log(`شروع هایلایت "${text}" در صفحه ${pageNum}`);
    
    const page = await pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();
    
    // بازگردانی صفحه اصلی
    const restored = restoreOriginalCanvas(pageNum);
    if (!restored) {
      console.warn(`نمی‌توان صفحه ${pageNum} را برای هایلایت بازگردانی کرد`);
      return;
    }
    
    const ctx = canvas.value.getContext('2d');
    const viewport = page.getViewport({ scale: parseFloat(scale.value) });
    
    // جستجو و هایلایت کلمات
    let foundCount = 0;
    textContent.items.forEach((item) => {
      if (item.str && item.str.toLowerCase().includes(text.toLowerCase())) {
        highlightWord(item, ctx, viewport);
        foundCount++;
      }
    });
    
    console.log(`هایلایت "${text}" در صفحه ${pageNum}: ${foundCount} مورد پیدا شد`);
    
  } catch (err) {
    console.error('خطا در هایلایت متن:', err);
  }
};

// هایلایت یک کلمه خاص
const highlightWord = (textItem, context, viewport) => {
  try {
    // تبدیل مختصات متن به مختصات canvas
    const transform = pdfjsLib.Util.transform(viewport.transform, textItem.transform);
    const [x, y] = pdfjsLib.Util.applyTransform([textItem.x, textItem.y], transform);
    
    const width = textItem.width * viewport.scale;
    const height = textItem.height * viewport.scale;
    
    // رسم مستطیل هایلایت
    context.fillStyle = props.highlightColor;
    context.fillRect(x, y - height, width, height);
    
  } catch (err) {
    console.error('خطا در هایلایت کلمه:', err);
  }
};

// اعمال هایلایت در تمام صفحات مشخص شده
const applyHighlights = async () => {
  if (!isPdfReady.value || !highlightInfo.value.word || highlightInfo.value.pages.length === 0 || !pdfDoc) {
    console.log('شرایط هایلایت فراهم نیست:', {
      isPdfReady: isPdfReady.value,
      hasWord: !!highlightInfo.value.word,
      hasPages: highlightInfo.value.pages.length > 0,
      hasPdfDoc: !!pdfDoc
    });
    return;
  }
  
  console.log(`اعمال هایلایت "${highlightInfo.value.word}" در صفحات:`, highlightInfo.value.pages);
  
  try {
    // هایلایت در صفحات مشخص شده
    for (const pageNum of highlightInfo.value.pages) {
      if (pageNum <= totalPages.value && pageNum >= 1) {
        console.log(`هایلایت صفحه ${pageNum}...`);
        await highlightTextInPage(pageNum, highlightInfo.value.word);
      } else {
        console.warn(`شماره صفحه ${pageNum} معتبر نیست`);
      }
    }
    
    // اگر صفحه جاری در لیست هایلایت است، رندر کن
    if (shouldHighlightPage(currentPage.value)) {
      console.log('رندر مجدد صفحه جاری به دلیل هایلایت...');
      await renderPage(currentPage.value);
    }
    
    console.log('هایلایت‌ها اعمال شدند');
  } catch (err) {
    console.error('خطا در اعمال هایلایت:', err);
  }
};

const renderCurrentPage = () => {
  if (pdfDoc && canvas.value) {
    renderPage(currentPage.value);
  } else {
    console.warn('نمی‌توان صفحه را رندر کرد: PDF یا canvas آماده نیست');
  }
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

// تمیز کردن هنگام از بین رفتن کامپوننت
onUnmounted(() => {
  if (pdfDoc) {
    pdfDoc.destroy();
  }
  originalPageCanvas.clear();
});

// استفاده از nextTick برای اطمینان از render شدن DOM
watch(() => props.pdfUrl, async () => {
  await nextTick();
  if (props.pdfUrl) {
    loadPdf();
  }
});

onMounted(async () => {
  await nextTick();
  if (props.pdfUrl) {
    loadPdf();
  }
});
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

.highlight-info {
  padding: 0.5rem 1rem;
  background: #e7f3ff;
  border: 1px solid #b3d9ff;
  border-radius: 4px;
  color: #0066cc;
  font-size: 0.9rem;
  font-weight: bold;
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
  min-height: 400px;
}

canvas {
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 100%;
  height: auto;
  background: white;
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