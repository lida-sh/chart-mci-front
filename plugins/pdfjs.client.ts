import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';


export default defineNuxtPlugin(() => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  return {
    provide: { pdfjsLib },
  };
});
