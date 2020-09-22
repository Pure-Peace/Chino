import Cookie from 'cookie'

export default function ({ isHMR, app, store, route, params, error, redirect, req }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) { return }

  // parse cookie
  const cookies = Cookie.parse(req.headers.cookie || '')

  // Set locale
  const locale = cookies.locale
  if (locale) {
    store.commit('setLocale', locale)
    app.i18n.locale = store.state.locale
  }
}
