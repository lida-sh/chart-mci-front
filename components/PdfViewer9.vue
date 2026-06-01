<template>
  <div class="pdf-container" ref="container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
const { $pdfjsLib } = useNuxtApp();

const props = defineProps({
  pdfUrl: { type: String, required: true },
  keyword: { type: String, required: true },
  page: { type: Number, default: 1 },
});

const canvas = ref(null);
let pdfDoc = null;
let page = null;
let viewport = null;
let textContent = null;

const scale = 1.5;
const highlightColor = "yellow";
const highlightAlpha = 0.5;

// -------------------- بارگذاری PDF --------------------
const loadPdf = async () => {
  pdfDoc = await $pdfjsLib.getDocument({
    url: props.pdfUrl,
    disableFontFace: true,
    cMapUrl: "/cmaps/",
    cMapPacked: true,
  }).promise;

  await renderPage(props.page);
};

// -------------------- رندر صفحه --------------------
const renderPage = async (pageNum) => {
  page = await pdfDoc.getPage(pageNum);
  viewport = page.getViewport({ scale });

  const ctx = canvas.value.getContext("2d");
  canvas.value.width = viewport.width;
  canvas.value.height = viewport.height;

  // رندر PDF روی canvas
  await page.render({ canvasContext: ctx, viewport }).promise;

  // دریافت متن صفحه
  textContent = await page.getTextContent({ normalizeWhitespace: true });

  // اعمال هایلایت دقیق
  highlightKeywordUltra(props.keyword);
};

// -------------------- هایلایت glyph به glyph دقیق --------------------
const highlightKeywordUltra = (keyword) => {
  if (!keyword?.trim() || !textContent) return;

  const ctx = canvas.value.getContext("2d");
  ctx.save();
  ctx.fillStyle = highlightColor;
  ctx.globalAlpha = highlightAlpha;

  textContent.items.forEach((item) => {
    const str = item.str;
    const font = textContent.styles[item.fontName];
    if (!font) return;

    const [a, b, c, d, e, f] = item.transform;
    const y = f - item.height;
    const xStart = e;

    // استخراج glyph widths واقعی
    const glyphWidths = [];
    const glyphScale = item.height / (font.ascent || 1000);
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      let w = font.widths ? font.widths[charCode] : font.defaultWidth || 500;
      glyphWidths.push(w * glyphScale / 1000);
    }

    // پیدا کردن keyword در رشته
    let startIndex = 0;
    while (true) {
      const index = str.indexOf(keyword, startIndex);
      if (index === -1) break;

      const xOffset = glyphWidths.slice(0, index).reduce((a, b) => a + b, 0);
      const wordWidth = glyphWidths.slice(index, index + keyword.length).reduce((a, b) => a + b, 0);

      ctx.fillRect(xStart + xOffset, y, wordWidth, item.height);

      startIndex = index + keyword.length;
    }
  });

  ctx.restore();
};

// onMounted(loadPdf);
onMounted(async () => {
  if (!canvas.value) return; // مطمئن می‌شویم canvas موجود است
  const ctx = canvas.value.getContext("2d");

  pdfDoc = await $pdfjsLib.getDocument({
    url: props.pdfUrl,
    disableFontFace: false,
    cMapUrl: '/cmaps/',
    cMapPacked: true
  }).promise;

  await renderPage(props.page);
  loadPdf
});
// تغییر keyword → فقط هایلایت بروزرسانی شود
watch(() => props.keyword, () => {
  page.render({ canvasContext: canvas.value.getContext("2d"), viewport }).promise.then(() => {
    highlightKeywordUltra(props.keyword);
  });
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
</style>
