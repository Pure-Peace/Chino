<template>
  <div>
    <div
      class="primary-button"
      @click="()=>$store.commit('layouts/setSiderFixed')"
    >
      侧边栏固定：{{ siderFixed | formatBool }}
    </div>
    <div
      class="primary-button"
      @click="()=>$store.commit('layouts/setOpenSider')"
    >
      开启侧边栏：{{ openSider | formatBool }}
    </div>
    <div
      class="primary-button"
      @click="()=>$store.commit('layouts/setTopNavbarFixed')"
    >
      顶部导航栏固定：{{ topNavbarFixed | formatBool }}
    </div>
    <div
      class="primary-button"
      @click="()=>$store.commit('layouts/setShowSider')"
    >
      显示侧边栏：{{ showSider | formatBool }}
    </div>
    <div
      class="primary-button"
      @click="()=>$store.commit('layouts/setShowBreadcrum')"
    >
      显示面包屑导航：{{ showBreadcrum | formatBool }}
    </div>
    <div
      class="primary-button"
      @click="()=>$store.commit('setIsMobile', !isMobile)"
    >
      移动端显示：{{ isMobile | formatBool }}
    </div>
    <div>haha: {{ $t('hello') }}</div>
    <div
      class="primary-button"
      @click="()=>$store.commit('setLocale', 'en-US')"
    >
      设置英语
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
    ...mapGetters('layouts', ['siderFixed', 'openSider', 'topNavbarFixed', 'showSider', 'showBreadcrum']),
    ...mapGetters(['isMobile'])
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
