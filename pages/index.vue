<template>
  <div>
    <div>
      {{ $t('hello') }}
    </div>
  </div>
</template>

<script>

export default {
  mounted () {
    console.log(this)
    this.$i18n.locale = 'zh-CN'
  }

}
</script>
