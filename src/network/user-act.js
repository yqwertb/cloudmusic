import {request} from './request'

export function dailySign(timestamp) {
  return request({
    url: '/daily_signin',
    params: {
      type: 1,
      timestamp
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