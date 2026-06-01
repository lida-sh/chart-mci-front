<template>
  <div class="pdf-container items-center justify-center" ref="container">
    <div v-if="loading" class="flex gap-4 text-center">
      <h3 class="text-base font-normal">در حال بارگذاری...</h3>
      <span class="loading loading-bars loading-xl"></span>
    </div>
    <div v-else class="flex flex-col w-full items-start justify-center px-10 gap-4">
      <h6 class="text-base font-bold">کلمه مورد جستجو: <span class="text-blue-700">{{ keyword }}</span></h6>
      <h6 class="text-base font-bold">پیدا شده در صفحات: <span class="text-blue-700">{{
        useArrayToString(pagesWithKeyword) }}</span></h6>
    </div>
    <div v-for="(pageNum, index) in pageCount" :key="index" class="pdf-page" :ref="el => pageRefs[index] = el">
      <canvas :ref="el => canvasRefs[index] = el"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
const { $pdfjsLib } = useNuxtApp();
const loading = ref(true)
// ---------------- props از والد ----------------
const props = defineProps({
  pdfUrl: { type: String, required: true },
  keyword: { type: String, required: true },
  pagesWithKeyword: { type: Array, default: () => [] }, // صفحات شامل keyword
  firstPageToShow: { type: Number, default: 1 },        // اولین صفحه برای نمایش
});

const canvasRefs = ref([]);
const pageRefs = ref([]);
const pageCount = ref(0);
let pdfDoc = null;

// -------------------- بارگذاری PDF --------------------
const loadPdf = async () => {

  pdfDoc = await $pdfjsLib.getDocument({
    url: props.pdfUrl,
    disableFontFace: true,
    cMapUrl: "/cmaps/",
    cMapPacked: true,
  }).promise;

  pageCount.value = pdfDoc.numPages;
  await renderAllPages();
  loading.value = false
};

// -------------------- رندر تمام صفحات --------------------
const renderAllPages = async () => {
  for (let i = 1; i <= pageCount.value; i++) {
    const page = await pdfDoc.getPage(i);
    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    const canvas = canvasRefs.value[i - 1];
    if (!canvas) continue;
    const ctx = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // رندر PDF روی canvas
    await page.render({ canvasContext: ctx, viewport }).promise;

    // دریافت متن صفحه
    const textContent = await page.getTextContent({ normalizeWhitespace: true });

    // فقط اگر این صفحه در prop pagesWithKeyword هست → هایلایت شود
    if (props.pagesWithKeyword.includes(i)) {
      highlightOnCanvas(ctx, textContent, props.keyword, viewport);
    }
  }

  // اسکرول به صفحه اول که prop داده شده
  const firstPageEl = pageRefs.value[props.firstPageToShow - 1];
  if (firstPageEl) firstPageEl.scrollIntoView({ behavior: "smooth" });
};

// -------------------- هایلایت روی canvas --------------------
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

// اگر keyword تغییر کرد → همه صفحات دوباره رندر شود
watch(() => props.keyword, () => {
  renderAllPages();
});
const useArrayToString = (arr) => {
  return arr.slice()      // برای اینکه آرایه اصلی تغییر نکند
    .reverse().join(',');
};
// const arrayState = (arr) => {
//     if (!Array.isArray(arr) || arr.length === 0) {
//         return 0;        // آرایه مقداری ندارد
//     }

//     if (arr.length === 1) {
//         return 1;       // فقط یک مقدار دارد
//     }

//     return 2;       // بیشتر از یک مقدار دارد
// }
</script>

<style scoped>
.pdf-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pdf-page canvas {
  display: block;
  border: 1px solid #ccc;
}
</style>
