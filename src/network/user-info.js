import {request} from './request'

export function getDetail(uid, timestamp) {
  return request({
    url: '/user/detail',
    params: {
      uid,
      timestamp
    }
  })
}

export function getSub() {
  return request({
    url: '/user/subcount'
  })
}

export function getLevel() {
  return request({
    url: '/user/level'
  })
}

export function getPlaylist(...arg) {
  return request({
    url: '/user/playlist',
    params: {
      uid: arg[0],
      limit: typeof(arg[1]) === 'number' ? arg[1] : null,
      offset: typeof(arg[2]) === 'number' ? arg[2] : null
    }
  })
}
export function getDj(uid) {
  return request({
    url: '/user/dj',
    params: {
      uid
    }
  })
}