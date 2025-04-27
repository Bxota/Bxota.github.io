// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  
  // Configuration app spécifique pour GitHub Pages
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'
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
      Montserrat: [300, 400, 600]
    },
    display: 'swap',
    // S'assurer que les polices sont téléchargées et incluses dans le build
    download: true,
    // Inclure les polices localement dans le build
    fontsDir: 'assets/fonts',
    fontsPath: 'fonts'
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
  
  // Assurez-vous que les ressources statiques sont correctement générées
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },
  
  // Correction pour le dupliqué '@nuxtjs/tailwindcss' dans les modules
  compilerOptions: {
    paths: {
      "~/*": ["./*"],
      "@/*": ["./*"]
    }
  },
})