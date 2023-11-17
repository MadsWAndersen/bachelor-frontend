export default defineNuxtConfig({
  devtools: { enabled: true },
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

  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"]
})