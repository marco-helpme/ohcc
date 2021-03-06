import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/faviconohcc.png' }
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900' },
      // { rel: 'stylesheet', url: '@/assets/css/main.css' },
      // { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/fon t@4.x/css/materialdesignicons.min.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/main.css',
    '@/assets/fonts/lucida/style.css',
    '@/assets/css/materialdesignicons.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vue-fb-customer-chat.js', ssr: false },
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/vue-pdf.js', ssr: false },
    { src: '~/plugins/moment.js', ssr: false },
    { src: '~/plugins/vue-chartjs.js', ssr: false },
    '~/plugins/vee-validate'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-material-design-icons',
    'nuxt-leaflet',
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://localhost/api/public/api/v1'

    // 'http://api.test/api/v1'
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        disable: true,
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: ['vee-validate/dist/rules', '@nuxtjs/auth'],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.output.globalObject = 'this'
      config.module.rules.push(
        {
          test: /\.pdf$/,
          loader: 'url-loader'
        }
      )
    }
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'usuarios/login', method: 'post' },
          user: { url: 'usuarios', method: 'get' }
        },
        tokenType: ''
      }
    }
  }
}
