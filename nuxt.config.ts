// https://nuxt.com/docs/api/configuration/nuxt-config
import { PROXY_CONFIG } from "./composables/api/api.config";

export default defineNuxtConfig({
  
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css", '@vueform/multiselect/themes/default.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    tsConfig:{
      "compilerOptions": {
        "target": "ESNext",
        "module": "ESNext",
        "experimentalDecorators": true,
        "emitDecoratorMetadata":true,
        "strictPropertyInitialization":false,
        "noImplicitAny":false
      }
    }
  },
  modules: [
    "@vueuse/nuxt",
    "six-dropzone",
    "six-dropzone",
    "@pinia/nuxt"
  ],
  build: {
    transpile: ["gsap", "swc"],
  },
  nitro: {
    devProxy: PROXY_CONFIG,
     publicAssets: [
      {
        dir: 'node_modules/pdfjs-dist/cmaps',
        baseURL: '/cmaps'
      },
      {
        dir: 'node_modules/pdfjs-dist/standard_fonts',
        baseURL: '/standard_fonts'
      }
    ]
    
  },
  vite: {
    assetsInclude: ['**/*.svg'],
    optimizeDeps: {
      include: [
        'pdfjs-dist',
        'pdfjs-dist/build/pdf',
        'pdfjs-dist/build/pdf.worker.min.js',
        'pdfjs-dist/build/pdf.worker.min.mjs',
      ],
    },
    
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true
        }
      }
    }
  }
});