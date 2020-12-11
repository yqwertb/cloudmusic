import axios from 'axios'


export function request(config) {
  const instance = axios.create({
    baseURL: 'https://music.server.61play.top/',
    // baseURL: 'http://192.168.31.240:3000/',
    // baseURL: 'http://localhost:3000/',
    // baseURL: 'http://192.168.31.247:3000/',
    timeout: 5000,
    withCredentials: true,
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {
    return Promise.reject(err.request)
  })

  instance.interceptors.response.use(res => {
    if(res.config.url === '/check/music') {
      res = res.data
    }
    return res
  }, err => {
    // let res = err.response
    // if(err.config.url === '/check/music') {
    //   res = err.response.data
    // }
    // 生产环境不要返回
    // return Promise.reject(res)
    // return Promise.resolve(err.response)
    return err.response.data
  })
  return instance(config)
}
