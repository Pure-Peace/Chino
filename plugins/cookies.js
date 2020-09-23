import VueCookies from 'vue-cookies'
import config from '~/config'

// cookie default config
VueCookies.config(config.cookies.EXPIRES, '', '', config.cookies.ONLY_HTTPS)

export default (context, inject) => {
  inject('cookies', VueCookies)
}
