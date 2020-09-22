import VueCookies from 'vue-cookies'

// cookie default config: expire = 1 month, secure = true
VueCookies.config('1m', '', '', true)

export default (context, inject) => {
  inject('cookies', VueCookies)
}
