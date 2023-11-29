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
  prettier: {
    tabWidth: 2,
    singleQuote: true,
    semi: false
  },

  app: {
    pageTransition: { name: 'slide', mode: 'out-in' }
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    UmbProjectAlias: 'pba-webdev',
    AcceptLanguage: 'en-US',
    Authorization: 'Basic elFJZk50eEpCYWFidFFDSTNweDg6',
    public: {
      apiBase: '/api',
    }

  },
})