import {request} from './request'

export function checkSong(id) {
  return request({
    url: '/check/music',
    params: {
      id
    }
  })
}

export function getSongURL(id) {
  return request({
    url: '/song/url',
    params: {
      id,
      br: 192000
    }
  })
}

