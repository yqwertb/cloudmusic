import {request} from './request'

export function phoneLogin(phone, password, timestamp) {
  return request({
    method: 'post',
    url: '/login/cellphone',
    data: {
      phone, 
      password,
      timestamp
    },
  })
}

export function mailLogin(email, password) {
  return request({
    url: '/login',
    params: {
      email, 
      password
    }
  })
}

//国家选择暂时留着
export function captchaLogin(phone) {
  return request({
    url: '/captcha/sent',
    params: {
      phone,
    }
  })
}

//国家选择暂时留着
export function verifyCaptcha(phone, captcha) {
  return request({
    url: '/captcha/verify',
    params: {
      phone,
      captcha
    }
  })
}

export function refreshLogin() {
  return request({
    url: '/login/refresh',
  })
}

export function logout() {
  return request({
    url: '/logout'
  })
}
