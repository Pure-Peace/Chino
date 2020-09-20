import Vue from 'vue'

export const state = () => {
  return {
    showSider: true,
    showBreadcrum: false,
    openSider: false,
    siderFixed: true,
    topNavbarFixed: true,
    siderWidth: 210
  }
}

export const getters = {
  showSider: state => state.showSider,
  showBreadcrum: state => state.showBreadcrum,
  openSider: state => state.openSider,
  siderFixed: state => state.siderFixed,
  topNavbarFixed: state => state.topNavbarFixed,
  siderWidth: state => state.siderWidth
}

export const mutations = {
  setShowSider (state, setting) {
    Vue.set(state, 'showSider', typeof (setting) === 'boolean' ? setting : !state.showSider)
  },
  setShowBreadcrum (state, setting) {
    Vue.set(state, 'showBreadcrum', typeof (setting) === 'boolean' ? setting : !state.showBreadcrum)
  },
  setOpenSider (state, setting) {
    Vue.set(state, 'openSider', typeof (setting) === 'boolean' ? setting : !state.openSider)
  },
  setSiderFixed (state, setting) {
    Vue.set(state, 'siderFixed', typeof (setting) === 'boolean' ? setting : !state.siderFixed)
  },
  setTopNavbarFixed (state, setting) {
    Vue.set(state, 'topNavbarFixed', typeof (setting) === 'boolean' ? setting : !state.topNavbarFixed)
  },
  setSiderWidth (state, setting) {
    Vue.set(state, 'siderWidth', setting)
  }
}
