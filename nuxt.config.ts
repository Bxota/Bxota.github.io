// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  alias: {
    '/css': '/assets/css'
  },
  css: ['~/assets/css/main.css'],

  experimental: {
    payloadExtraction: false
  },

  app: {
    baseURL: '/',
    buildAssetsDir: 'assets',
    head: {
      meta: [
        {
          'http-equiv': 'Permissions-Policy',
          content: 'interest-cohort=(), browsing-topics=()'
        }
      ]
    }
  },

  build: {
    transpile: ['vue-remix-icons'],
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Montserrat: [300, 400, 500, 600]
    },
    display: 'swap',
    download: true,
    fontsDir: 'assets',
    fontsPath: 'fonts'
  },

  runtimeConfig: {
    githubToken: process.env.GH_TOKEN,
  },

  site: { 
    url: 'https://bxota.github.io',
    siteUrl: 'https://bxota.github.io'
  },

  robots: {
    robotsTxt: false
  },

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/work',
        '/certificates',
        '/about',
        '/api/github',
      ]
    }
  }
})
