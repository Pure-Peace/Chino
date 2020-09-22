import Vue from 'vue'

export const state = () => {
  return {
    locale: 'zh-CN',
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
    // Vue.set(state, 'locale', locale)
    console.log(this)
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
