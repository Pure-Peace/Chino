export const state = () => ({
  locale: 'zh-CN'
})

export const getters = {
  getLocale (state) {
    return state.locale
  }
}

export const mutations = {
  setLocale (state, locale) {
    state.locale = locale
  }
}

export const actions = {
  // TODO ajax here
}
