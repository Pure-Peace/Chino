export default (axios) => {
  return {
    testGet: (params) => {
      return axios.get('/web-service/testGet', {
        params
      })
    },
    testPost: (params) => {
      return axios.get('/web-service/testPost', params)
    }
  }
}
