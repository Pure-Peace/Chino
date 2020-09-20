<template>
  <div>
    <div
      class="primary-button"
      @click="()=>$store.commit('setThemeSiderFixed')"
    >
      侧边栏固定：{{ themeSiderFixed | formatBool }}
    </div>
    <div
      class="primary-button"
      @click="()=>$store.commit('setThemeOpenSider')"
    >
      开启侧边栏：{{ themeOpenSider | formatBool }}
    </div>
    <div
      class="primary-button"
      @click="()=>$store.commit('setThemeTopNavbarFixed')"
    >
      顶部导航栏固定：{{ themeTopNavbarFixed | formatBool }}
    </div>
    <div
      class="primary-button"
      @click="()=>$store.commit('setThemeShowSider')"
    >
      显示侧边栏：{{ themeShowSider | formatBool }}
    </div>
    <div
      class="primary-button"
      @click="()=>$store.commit('setThemeShowBreadcrum')"
    >
      显示面包屑导航：{{ themeShowBreadcrum | formatBool }}
    </div>
    <div
      class="primary-button"
      @click="()=>$store.commit('setIsMobile', !isMobile)"
    >
      移动端显示：{{ isMobile | formatBool }}
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  filters: {
    formatBool (val) {
      return val ? '开' : '关'
    }
  },
  computed: {
    ...mapGetters(['themeSiderFixed', 'themeOpenSider', 'themeTopNavbarFixed', 'themeShowSider', 'themeShowBreadcrum', 'isMobile'])
  }
}
</script>

<style scoped>
.primary-button {
  margin-bottom: 30px;
  height: 50px;
  background-color: #303f9f;
  font-size: 13px;
}
</style>
