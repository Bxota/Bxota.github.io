// nuxt.config.ts
export default defineNuxtConfig({
  target: 'static',
  generate: {
    dir: 'dist',
    fallback: true
  },
  styleResources: {
    css: [
      '~/assets/css/main.css',
      '~/assets/css/variables.css',
      '~/assets/css/reset.css',
      '~/assets/css/base.css',
      '~/assets/css/animations.css',
      '~/assets/css/about.css',
      '~/assets/css/header.css',
      '~/assets/css/home.css',
      '~/assets/css/work.css',
      '~/assets/css/certificate.css'
    ]
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/variables.css',
    '~/assets/css/reset.css',
    '~/assets/css/base.css',
    '~/assets/css/animations.css',
    '~/assets/css/about.css',
    '~/assets/css/header.css',
    '~/assets/css/home.css',
    '~/assets/css/work.css',
    '~/assets/css/certificate.css'
  ],
  app: {
    // Ici, c'est très important : baseURL = /nom-de-ton-repo/
    baseURL: '/',
    buildAssetsDir: '_nuxt/', // pas de / devant
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'
        }
      ]
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  sitemap: {
    siteUrl: 'https://bxota.github.io',
  },

  site: { 
    url: 'https://bxota.github.io' 
  },

  robots: {
    robotsTxt: false
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/', 
        '/work',
        '/certificates'
      ]
    }
  },

  build: {
    transpile: ['vue-remix-icons'],
  },

  compatibilityDate: '2025-04-27'
})