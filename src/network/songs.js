import {request} from './request'

export function checkSong(id) {
  return request({
    url: '/check/music',
    params: {
      id
    }
  })
}

export function getSongURL(ids) {
  return request({
    url: '/song/url',
    params: {
      ids,
      br: 128000
    }
  })
}