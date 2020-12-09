import {request} from './request'

export function dailySign() {
  return request({
    url: '/daily_signin',
    params: {
      type: 1,
    },
    withCredentials: true
  })
}

export function sentComm(...arg) {
  let url = '/comment'

  if(arg[0] === 1) {
    return request({
      url,
      params: {
        type: arg[1],
        id: arg[2],
        content: arg[3],
      }
    })
  } else {
    return request({
      url,
      params: {
        type: arg[1],
        id: arg[2],
        content: arg[3],
        commentId: arg[4]
      }
    })
  }
}

/**
 * arg应该包含以下参数
 * tpye：资源类型
 * id：资源id
 * 
 */
export function deleteComm(...arg) {
  return request({
    url: '/comment',
    params: {
      t: 0,

    }
  })
}

/**
 * t:1 发送, 2 回复
 * tpye: 0歌曲,1mv,2专辑,3歌单,4电台,5视频,6动态
 * id：资源id
 * content :要发送的内容
 * arg:commentId :回复的评论id (回复评论时必填)
 */
export function comment(t, type, id, content, ...arg) {
  let commentId = arg
  let obj = {t, type, id, content}
  if(commentId) {
    obj['commentId'] = commentId
  }
  return request({
    url:'/comment',
    params: ojb
  })
}