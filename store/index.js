import Vue from 'vue'
import config from '~/config'

export const state = () => {
  return {
    locale: config.i18n.default_locale,
    fallbackLocale: config.i18n.fallback_locale,
    isMobile: false,
    pageWidth: 1024
  }
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
