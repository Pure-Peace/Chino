import VueCookies from 'vue-cookies'

VueCookies.config('1m', '', '', true)

export default (context, inject) => {
  inject('cookies', VueCookies)
}
