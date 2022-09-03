export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/ymapPlugin.js',  mode: 'client' },
    "~plugins/eventBus.js",
    '@/plugins/persistedstate.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxt/postcss8',
    '@nuxtjs/google-fonts',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
    '@nuxtjs/composition-api/module'
  ],
  googleFonts: {
    display: 'swap',
    preconnect: true,
    families: {
      Montserrat: {
        wght: [ 600, 400, 700]
      }
    }
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    
  ],
  env: {
    strapiBaseUri: "http://admin.996661-cn43153.tmweb.ru:1337/"
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: "http://admin.996661-cn43153.tmweb.ru:1337/graphql",
      }
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://admin.996661-cn43153.tmweb.ru:1337/',
    credentials: true,
    common: {
      'Cache-Control': 'max-age=0',
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/json; charset=UTF-8',
      Allow: 'GET, POST',
      'Access-control-allow-methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type'
      // 'Authorization': 'Basic Y2tfODVlNDRlODczNTI2MWQ0NWExOWQ4ZjdhYWYwMTJmOGQ2NDBjMmRhYzpjc180MjYxYmI2MzlmNGU5YTE4YzE0Njg1MTM2MWQ2MzE3ODA0YTgxNmZj'
    },
    // proxy: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
   build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  }
}
