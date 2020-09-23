export default {
  server: {
    port: 8688,
    host: '127.0.0.1'
  },
  head: {
    default_title: '主页 - Kafuu',
    default_description: 'Kafuu，一个osu!私人服务器！'
  },
  i18n: {
    default_locale: 'zh-CN',
    fallback_locale: 'en-US'
  },
  chino_api: {
    enabled: false,
    base_path: '/chino-api',
    title: 'Chino Api',
    description: '这是Chino Api~',
    version: '1.0'
  },
  cookies: {
    expires: '1m',
    only_https: false
  }
}
