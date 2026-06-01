<template>
  <div class="pdf-container" ref="container">
    <canvas ref="canvas"></canvas>
    <div ref="textLayer" class="textLayer"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, nextTick } from "vue";
const { $pdfjsLib } = useNuxtApp();

const props = defineProps({
  pdfUrl: { type: String, required: true },
  keyword: { type: String, required: true },
  page: { type: Number, default: 1 }
});

const container = ref(null);
const canvas = ref(null);
const textLayer = ref(null);
let pdfDoc = null;

const loadPdf = async () => {
  pdfDoc = await $pdfjsLib.getDocument({
    url: props.pdfUrl,
    disableFontFace: false,   // ⭐ ضروری برای فارسی
    cMapUrl: "/cmaps/",
    cMapPacked: true
  }).promise;

  await renderPage(props.page);
};

const renderPage = async (pageNum) => {
  const page = await pdfDoc.getPage(pageNum);

  const scale = 1.5;
  const viewport = page.getViewport({ scale });

  const ctx = canvas.value.getContext("2d");
  canvas.value.width = viewport.width;
  canvas.value.height = viewport.height;

  // Canvas render
  await page.render({
    canvasContext: ctx,
    viewport
  }).promise;

  // پاک کردن لایه متن قبلی
  textLayer.value.innerHTML = "";

  // گرفتن محتویات متن
  const textContent = await page.getTextContent();

  // ساختن TextLayer کامل
  await $pdfjsLib.renderTextLayer({
    textContent,
    container: textLayer.value,
    viewport,
    textDivs: []
  }).promise;

  // جهت‌دهی صحیح فارسی
  fixRTL();

  // هایلایت کلمه
  highlightKeyword(props.keyword);
};


// ⭐ اصلاح ساختار RTL + برعکس شدن توکن‌ها
const fixRTL = () => {
  const items = textLayer.value.querySelectorAll("span");

  items.forEach(span => {
    span.style.direction = "rtl";
    span.style.unicodeBidi = "plaintext";
  });
};


// ⭐ هایلایت دقیق فارسی روی TextLayer
const highlightKeyword = (keyword) => {
  if (!keyword || keyword.trim() === "") return;

  const spans = textLayer.value.querySelectorAll("span");

  spans.forEach(span => {
    const text = span.textContent;

    const idx = text.indexOf(keyword);
    if (idx !== -1) {
      const html = text.replace(
        keyword,
        `<mark class="hl">${keyword}</mark>`
      );
      span.innerHTML = html;
    }
  });
};

onMounted(loadPdf);

// اگر کلمه تغییر کرد → دوباره هایلایت کن
watch(() => props.keyword, async () => {
  await renderPage(props.page);
});
</script>

<style scoped>
.pdf-container {
  position: relative;
  display: inline-block;
}

canvas {
  display: block;
}

.textLayer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.textLayer span {
  position: absolute;
  white-space: pre;
}

.hl {
  background: yellow;
  color: black;
  padding: 2px 0;
}
</style>
