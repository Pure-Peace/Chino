import Vue from 'vue'

export const state = () => {
  let server = {}
  const client = {
    isMobile: false,
    pageWidth: 1024
  }

  if (process.server) {
    const config = require('~/config').default
    server = {
      locale: config.i18n.default_locale,
      fallbackLocale: config.i18n.fallback_locale
    }
  }

  return Object.assign(client, server)
}

export const getters = {
  getLocale: state => state.locale,
  pageWidth: state => state.pageWidth,
  isMobile: state => state.isMobile
}

export const mutations = {
  setLocale (state, locale) {
    Vue.set(state, 'locale', locale)
    Vue.set(this.app.i18n, 'locale', locale)
    if (process.client) { this.$cookies.set('locale', locale, '5y') }
  },
  setPageWidth (state, setting) {
    Vue.set(state, 'pageWidth', setting)
  },
  setIsMobile (state, setting) {
    Vue.set(state, 'isMobile', setting)
  }
}

export const actions = {
  // TODO ajax here
}
