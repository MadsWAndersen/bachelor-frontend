export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@pinia/nuxt"],
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
  runtimeConfig: {
    secret: process.env.AUTHORIZATION,
    public: {
      authentication: process.env.AUTHORIZATION,
      project_alias: process.env.PROJECT_ALIAS,
      accept_lang: process.env.ACCEPT_LANGUAGE,
    }
  },
  app: {
    pageTransition: { name: 'slide', mode: 'out-in' }
  },
 
})