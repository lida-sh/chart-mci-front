/** @type {import('tailwindcss').Config} */
const svgToDataUri = require('mini-svg-data-uri')
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./components/*.{vue,js}",
    "./layouts/*.vue",
    "./pages/**/*.vue",
    "./pages/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./*.{vue,js}",
  ],
  theme: {
    extend: {
      screens: {
        'mdplus': '860px', // تعریف breakpoint جدید از 964px
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '14': 'repeat(14, minmax(0, 1fr))',

        // Complex site-specific column configuration
        'footer': '200px minmax(900px, 1fr) 100px',
      },
      backgroundPosition:{
        'left-center': 'left 0.5rem center'
      },
      backgroundImage: (theme) => ({
        'multiselect-caret': `url("${svgToDataUri(
          `<svg viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>`,
        )}")`,
        'multiselect-spinner': `url("${svgToDataUri(
          `<svg viewBox="0 0 512 512" fill="${theme('colors.green.500')}" xmlns="http://www.w3.org/2000/svg"><path d="M456.433 371.72l-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z"></path></svg>`,
        )}")`,
        'multiselect-remove': `url("${svgToDataUri(
          `<svg viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>`,
        )}")`,
      })
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
  salfeList: [
    "btn-primary",
    "btn-accent",
    "btn-secondary",
    "bg-info",
    "bg-success",
    "bg-warning",
    "bg-error",
  ],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
        /* your theme name */ primary: "#1e9b61" /* Primary color */,
          "primary-focus": "#198754" /* Primary color - focused */,
          "primary-content":
            "#ffffff" /* Foreground content color to use on primary color */,

          secondary: "#8f018f" /* Secondary color */,
          "secondary-focus": "#800080" /* Secondary color - focused */,
          "secondary-content":
            "#ffffff" /* Foreground content color to use on secondary color */,

          accent: "#ffffff" /* Accent color */,
          "accent-focus": "#ffffff" /* Accent color - focused */,
          "accent-content":
            "#323232" /* Foreground content color to use on accent color */,

          neutral: "#3d4451" /* Neutral color */,
          "neutral-focus": "#2a2e37" /* Neutral color - focused */,
          "neutral-content":
            "#ffffff" /* Foreground content color to use on neutral color */,

          "base-100":
            "#ffffff" /* Base color of page, used for blank backgrounds */,
          "base-200": "#f9fafb" /* Base color, a little darker */,
          "base-300": "#d1d5db" /* Base color, even more darker */,
          "base-content":
            "#1f2937" /* Foreground content color to use on base color */,

          info: "#2094f3" /* Info */,
          success: "#02850c" /* Success */,
          warning: "#ff9900" /* Warning */,
          error: "#ff5724" /* Error */,

          "--rounded-box":
            "1rem" /* border-radius for cards and other big elements */,
          "--rounded-btn":
            "0.85rem" /* border-radius for buttons and similar elements */,
          "--rounded-badge":
            "1.9rem" /* border-radius for badge and other small elements */,

          "--animation-btn": "0.25s" /* bounce animation time for button */,
          "--animation-input":
            ".2s" /* bounce animation time for checkbox, toggle, etc */,

          "--padding-card": "1rem" /* default card-body padding */,

          "--btn-text-case": "uppercase" /* default text case for buttons */,
          "--navbar-padding": ".5rem" /* default padding for navbar */,
          "--border-btn": "1px" /* default border size for button */,
          "--focus-ring": "2px" /* focus ring size for button and inputs */,
          "--focus-ring-offset": "2px",
        },
      },
      // 'dark', // and some pre-defined theme
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: true,
  },
}

