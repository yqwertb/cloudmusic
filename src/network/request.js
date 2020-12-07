import axios from 'axios'


export function request(config) {
  const instance = axios.create({
    // baseURL: 'https://music.server.61play.top/',
    baseURL: 'http://192.168.31.240:3000/',
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
    return res
  }, err => {
    return Promise.reject(err.response)
  })
  return instance(config)
}
