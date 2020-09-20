/* eslint-disable nuxt/no-cjs-in-config */
import config from './config'

const path = require('path')
const IS_PROD = process.env.NODE_ENV === 'production'

export default {
  server: config.server,
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: config.head.default_title || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: config.head.default_description || process.env.npm_package_description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~assets/css/global.less'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/i18n' },
    { src: '~/plugins/axios' },
    { src: '~/plugins/backend/' },
    { src: '~/plugins/icons', mode: 'client' }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Server Middleware
  */
  serverMiddleware: {
    '/chino-api': '~/chino-api'
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    publicPath: '/resources/',
    analyze: IS_PROD,
    extend (config, ctx) {
      // ...
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.exclude = [path.resolve(__dirname, 'assets/svg')]
      // Includes /icons/svg for svg-sprite-loader
      config.module.rules.push({
        test: /\.svg$/,
        include: [path.resolve(__dirname, 'assets/svg')],
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      })
    }
  }
}
