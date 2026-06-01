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

const loadPdf = async () => {
  pdfDoc = await $pdfjsLib.getDocument({
    url: props.pdfUrl,
    disableFontFace: true,
    cMapUrl: "/cmaps/",
    cMapPacked: true,
  }).promise;

  await renderPage(props.page);
};

const renderPage = async (pageNum) => {
  const page = await pdfDoc.getPage(pageNum);
  const scale = 1.5;
  const viewport = page.getViewport({ scale });

  // تنظیم canvas
  const ctx = canvas.value.getContext("2d");
  canvas.value.width = viewport.width;
  canvas.value.height = viewport.height;

  // رندر PDF روی canvas
  const renderContext = {
    canvasContext: ctx,
    viewport,
  };
  await page.render(renderContext).promise;

  // دریافت متن صفحه
  const textContent = await page.getTextContent({ normalizeWhitespace: true });

  // کشیدن هایلایت روی canvas
  highlightOnCanvas(ctx, textContent, props.keyword, viewport);
};


/* -------------------- هایلایت روی canvas -------------------- */
const highlightOnCanvas = (ctx, textContent, keyword, viewport) => {
  if (!keyword?.trim()) return;

  ctx.save();
  ctx.fillStyle = "yellow";
  ctx.globalAlpha = 0.5;

  textContent.items.forEach((item) => {
    if (item.str.includes(keyword)) {
      const positions = $pdfjsLib.Util.transform(viewport.transform, item.transform);
      const x = positions[4];
      const y = positions[5] - item.height;
      const width = item.width;
      const height = item.height;

      ctx.fillRect(x, y, width, height);
    }
  });

  ctx.restore();
};


onMounted(loadPdf);

// اگر کلمه تغییر کرد → صفحه را دوباره رندر کن
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
</style>
