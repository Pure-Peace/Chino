<template>
  <div id="app">
    <div id="main">
      <sider-layout
        :fixed="themeSiderFixed"
        :show="themeShowSider"
        :open="themeOpenSider"
        :mini="miniScreen"
      />
      <div class="main-layout">
        <div
          class="main-layout-mask"
          :style="showMask ? 'display: block; background-color: rgb(0, 0, 0,.5);' : 'display: none; background-color: rgb(0, 0, 0, 0);'"
          @click.stop="sidebarOpenSwitch"
        />
        <main-layout
          :fixed="themeTopNavbarFixed"
          :show-breadcrum="themeShowBreadcrum"
        />
      </div>
    </div>
  </div>
</template>

<script>
import mainLayout from '@/components/mainLayout'
import siderLayout from '@/components/siderLayout'
import { mapGetters } from 'vuex'

export default {
  components: {
    mainLayout,
    siderLayout
  },
  data () {
    return {
      screenWidth: process.client ? document.body.clientWidth : 0,
      watingRefresh: false
    }
  },
  computed: {
    ...mapGetters(['themeSiderFixed', 'themeOpenSider', 'themeTopNavbarFixed', 'themeShowSider', 'themeShowBreadcrum']),
    showMask () {
      return this.miniScreen && this.themeOpenSider
    },
    miniScreen () {
      return this.screenWidth <= 900
    }
  },
  watch: {
    screenWidth (val) {
      if (this.showMask) { this.$store.commit('setThemeOpenSider', false) }
      if (!this.watingRefresh) {
        this.screenWidth = val
        this.$store.commit('setPageWidth', val)

        this.watingRefresh = true
        setTimeout(() => {
          this.watingRefresh = false
        }, 200)
      }
    }
  },
  mounted () {
    console.log(this)
    this.$store.commit('setIsMobile', this.isMobile())
    if (this.miniScreen) { this.$store.commit('setThemeOpenSider', false) }
    const that = this
    window.screenWidth = document.body.clientWidth
    that.screenWidth = window.screenWidth
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },
  methods: {
    sidebarOpenSwitch () {
      this.$store.commit('setThemeOpenSider', false)
    },
    isMobile () {
      return navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
    }
  }

}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgba(255, 255, 255, 0.85);
  min-height: 100%;
}

#main {
  display: flex;
  min-height: 100%;
}

.main-layout {
  flex: 1;
  transition: 0.4s ease;
  height: 100%;
}

.main-layout-mask {
  background-color: rgb(0, 0, 0, 0);
  position: fixed;
  z-index: 6;
  width: 100%;
  height: 100%;
  transition: 0.4s ease;
  cursor: pointer;
}

.logo-text {
  font-size: 16px;
  font-weight: bold;
  font-family: 'Open Sans', sans-serif, Arial, Helvetica;
}

.outline-button {
  box-sizing: border-box;
  border: 2px solid #c5cae9;
  padding: 7px 20px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  transition: 0.4s ease;
  margin: 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.outline-button:hover {
  background-color: rgba(0, 0, 0, 0.015);
  filter: brightness(1.1) opacity(0.9);
}

.outline-button:active {
  background-color: rgba(0, 0, 0, 0.1);
  filter: brightness(0.9);
}

.primary-button {
  background-color: #4c62db;
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  transition: 0.4s ease;
  margin: 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 2px 4px #14141421;
}

.primary-button:hover {
  filter: brightness(1.1);
}

.primary-button:active {
  filter: brightness(0.9);
}
</style>
