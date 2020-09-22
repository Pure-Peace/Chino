import VueCookies from 'vue-cookies'

export default (context, inject) => {
  inject('cookies', VueCookies)
}
