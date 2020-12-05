import {request} from './request'

export function getPlayListDetail(id, timestamp) {
  return request({
    url:'/playlist/detail',
    params: {
      id,
      timestamp
    }
  })
}

export function getSongDetail(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  })
}
/*
 *将专辑 歌单的评论接口合在一起，通过flag判断
 *flag- true 专辑  - false 歌单
 */
export function getPlayListComment(id, limit, flag) {
  let url = ''
  if(flag) {
    url = '/comment/album'
  } else {
    url = '/comment/playlist'
  }
  return request({
    url,
    params: {
      id,
      limit
    }
  })
}

export function getSubscriber(id) {
  return request({
    url: '/playlist/subscribers',
    params: {
      id
    }
  })
}