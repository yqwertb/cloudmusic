import {request} from './request'

export function getBanner() {
  return request({
    url: '/banner',
  })
}

//推荐歌单
export function getDailySong(timestamp) {
  return request({
    url: '/recommend/resource',
    params: {
      timestamp
    }
  })
}

// 独家放送
export function getPrivatecontent() {
  return request({
    url: '/personalized/privatecontent',
  })
}

// 独家放送全部列表
export function getPrivatecontentList() {
  return request({
    url: '/personalized/privatecontent/list',
    params: {
      limit,offset
    }
  })
}

// 最新音乐
export function getNewsong() {
  return request({
    url: '/personalized/newsong',
  })
}

// 推荐mv
export function getPersonalizedMv() {
  return request({
    url: '/personalized/mv'
  })
}

// 歌单页默认获取的接口
export function getTopPlaylist() {
  return request({
    url: '/top/playlist',
    params: {
      limit,
    }
  })
}