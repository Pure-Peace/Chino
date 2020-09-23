/* eslint-disable nuxt/no-cjs-in-config */
import config from './config'

const path = require('path')
const fs = require('fs')

const IS_PROD = process.env.NODE_ENV === 'production'

// Files in the current directory
const localFile = name => path.resolve(__dirname, name)

export default {
  server: (() => {
    const serverConfig = {}

    // If you have a certificate, use https
    try {
      serverConfig.https = {
        key: fs.readFileSync(localFile('cert.key')),
        cert: fs.readFileSync(localFile('cert.crt'))
      }
    } catch { }

    return Object.assign(serverConfig, config.server)
  })(),
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
      { hid: 'description', name: 'description', content: config.head.default_title || process.env.npm_package_description }
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
    { src: '~/plugins/storages', mode: 'client' },
    { src: '~/plugins/bus' },
    { src: '~/plugins/cookies' },
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
  serverMiddleware: (() => {
    // here's your middleware
    const middleware = {

    }

    // start chino api if enabled
    if (config.chino_api.enabled) {
      const CHINO_PATH = config.chino_api.base_path
      middleware[CHINO_PATH] = `~${CHINO_PATH}`
    }
    return middleware
  })(),
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    vendor: ['vue-i18n'],
    publicPath: '/resources/',
    analyze: IS_PROD,
    extend (config, ctx) {
      // ...
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.exclude = [localFile('assets/svg')]
      // Includes /icons/svg for svg-sprite-loader
      config.module.rules.push({
        test: /\.svg$/,
        include: [localFile('assets/svg')],
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      })
    }
  },
  // customize nuxt.js router (vue-router).
  router: {
    middleware: 'i18n'
  }
}
