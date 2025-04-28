// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  css: ['@/assets/css/main.css'],

  router: {
    options: {
      hashMode: true
    }
  },

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
      Montserrat: {
       wght: [300, 400, 600]
      }
    },
    display: 'swap',
    download: true,
    fontsDir: 'assets/fonts',
    fontsPath: 'fonts'
  },

  sitemap: {
    siteUrl: 'https://bxota.github.io',
  },

  site: { 
    url: 'https://bxota.github.io' 
  },

  robots: {
    robotsTxt: false
  },

  "compilerOptions": {
    "paths": {
      "~/*": ["./*"],
      "@/*": ["./*"]
    }
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
      ]
    }
  }
})
