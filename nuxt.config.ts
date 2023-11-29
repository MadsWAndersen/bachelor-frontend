export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@pinia/nuxt", '@nuxtjs/google-fonts'],
  css: ['~/assets/css/main.css'],
  nitro: {
    preset: 'netlify'
  },
  postcss: {
    plugins: {
      tailwindcss: {

      },
      autoprefixer: {},
    },
  },

  app: {
    pageTransition: { name: 'slide', mode: 'out-in' }
  },
/*  googleFonts: {
    families: {
      Lato: [100, 200, 300, 400, 500, 600, 700],
    }
  }

 */

})