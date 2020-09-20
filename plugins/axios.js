const serverHandler = handle => process.server && handle()
const clientHandler = handle => process.client && handle()

export default function ({ store, redirect, req, router, app: { $axios } }) {
  // 请求拦截器
  $axios.onRequest((config) => {
    clientHandler(() => {
      // 客户端请求开始
      // NProgress.start()
    })
    // config.headers.common['Authorization'] = token
  })

  // 响应拦截器
  $axios.interceptors.response.use(
    (response) => {
      const resHandlers = {
        401 () {
          console.log('401错误')
        },
        404 () {
          console.log('404错误')
        }
      }

      clientHandler(() => {
        // NProgress.done()
      })

      serverHandler(() => {

      })

      resHandlers[response.data.code]()
    },
    (error) => {
      const errHandlers = {
        500 () {
          console.log('500错误')
        },
        404 () {
          console.log('404错误')
        }
      }

      clientHandler(() => {
        // NProgress.done()
      })

      serverHandler(() => {

      })

      errHandlers[error.response.status]()

      return Promise.reject(error.response) // 返回接口返回的错误信息
    })
}
