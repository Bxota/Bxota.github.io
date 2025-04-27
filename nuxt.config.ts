// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'
      }
    ]
  },
  build: {
    transpile: ['vue-remix-icons'],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Montserrat: [300, 400, 600]
    },
    display: 'swap'
  },
  sitemap: {
    siteUrl: 'https://bxota.github.io',
  },
  robots: {
    rules: [
      {
        userAgent: '*',
        allow: '/'
      }
    ]
  },
  "compilerOptions": {
    "paths": {
      "~/*": ["./*"],
      "@/*": ["./*"]
    }
  },
})
