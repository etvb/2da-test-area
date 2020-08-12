const pkg = require('./package')

module.exports = {
  mode: 'universal',
  env: {
    apiUrl: process.env.API_URL || 'http://localhost:8000/api/v1/',
    // apiUrl: process.env.API_URL || 'https://api.skillzzbox.com/api/v1/'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { property:"og:image", content: 'http://www.skillzzbox.com/man-coffee-cup-pen.jpg' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/ffavicon.ico' },
      { rel:"stylesheet", href:"https://use.fontawesome.com/releases/v5.2.0/css/all.css"}
    ],
    script: [{ src: '/js/facebook-pixel.js', type: 'text/javascript' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['@/assets/css/styles.sass'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/paypal.js', ssr: false },
    { src: '~/plugins/vueJsonExcel.js', ssr: false},
    { src: '~/plugins/moment-timezone-inject.js' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
