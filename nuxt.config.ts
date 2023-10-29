export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    pageTransition: { name: 'slide', mode: 'out-in' }
  },
  serverMiddleware: ['~/middleware/setCustomHeader.ts'],
  render: {
    static: {
      setHeaders(res: any) {
        res.setHeader('umb-project-alias', 'pba-webdev')

      }
    }
  },
})