<template>
  <div class="flex flex-col w-full items-center justify-center p-10">
    <!-- <ClientOnly fallback="در حال بارگذاری..."> -->
      <!-- <div class="flex w-full items-center justify-center"> -->
      
      <PdfViewerF :pdfUrl="url" :keyword="keyword" :pagesWithKeyword="pages" :firstPageToShow="page"/>
      <!-- <PdfViewer9 :pdfUrl="url" :keyword="keyword" :highlightPages="[1, 2, 4]" :page="page"/> -->
      <!-- <PdfViewer6 :pdfUrl="filePath" :highlightWord="keyword" :highlightPages="[1, 2, 4]" :page-number="page"/> -->
      <!-- <PdfViewerWithTextLayer2 
      
      <PdfViewer6 :pdfUrl="filePath" :highlightWord="keyword" :highlightPages="[1, 2, 4]" :page-number="page"/>
      <!--<PdfViewerWithTextLayer 
            :pdfUrl="filePath" 
            :positions="positions"
            :pageNumber="getFirstPage(positions)"
          /> -->
          
    <!-- <VPdfViewer ref="pdfViewer"
      :src="url"
      :search="keyword"
      @search-highlight=""
      @document-loaded="onDocumentLoaded"
    /> -->
    <!-- </div> -->
    <!-- </ClientOnly> -->
    <!-- <PdfViewer :path="filePath" :keyword="keyword" :pages="pages" /> -->
    <!-- <PdfViewer2 :pdfUrl="filePath" /> -->
    <!-- <PdfViewer3 :pdfUrl="filePath" /> -->

  </div>
</template>

<script setup lang="ts">
import PdfViewerF from '~/components/PdfViwerF.vue';
// import { VPdfViewer, useLicense } from '@vue-pdf-viewer/viewer';
// const YOUR_DOMAIN_TOKEN =
const route = useRoute()
const searchResults = ref([])
const pdfViewer = ref<any>(null)
const getFirstPage = (positions) => {
  if (!positions || positions.length === 0) return 1
  return Math.min(...positions.map(p => p.page))
}

const filePath = encodeURIComponent(route.query.path as string)
const dir = route.query.dir as string
const url = `http://dms-back.test/pdf/${dir}/${filePath}`
const keyword = route.query.keyword as string
const textPages = JSON.parse(route.query.textPages as string || '[]');
const imagePages = JSON.parse(route.query.imagePages as string || '[]');
const pages = textPages.concat(imagePages)
// const positions = JSON.parse(route.query.positions as string)
// const fileName = route.query.name as string
const page = Array.isArray(pages) ? pages[0] : parseInt(pages)
// onBeforeMount(() => {
  // useLicense must be used here to ensure proper license
  // initialization before the component renders.
//   useLicense(YOUR_DOMAIN_TOKEN); 
// });
const onDocumentLoaded = async () => {
  console.log('لود شد')
  await nextTick()
  const viewer = pdfViewer.value

  if (viewer && keyword) {
    console.log('PDF Loaded, searching for:', keyword)

    // تست 1: متد searchText()
    if (typeof viewer.searchText === 'function') {
      viewer.searchText(keyword)
      return
    }

    // تست 2: متد highlightSearchText()
    if (typeof viewer.highlightSearchText === 'function') {
      viewer.highlightSearchText(keyword)
      return
    }

    // تست 3: متد find() (برخی buildها از PDF.js مستقیم استفاده می‌کنند)
    if (viewer.find) {
      viewer.find(keyword)
      return
    }

    console.warn('❌ هیچ متدی برای جستجو پیدا نشد. احتمالاً باید نسخه‌ی پکیج تغییر کند.')
  }
}

</script>

<style scoped>
.custom-pdf-viewer {
  /* استایل‌های پایه */
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  height: 80vh;
}


.pdf-viewer-container {
  padding: 20px;
  background: #f8f9fa;
  height: 85vh;
  width: 90%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>