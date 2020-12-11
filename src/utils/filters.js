const Filters = {
  changeTime(str) {
    if(str === undefined) return
    str = new Date(str)
    let year = str.getFullYear()
    let month = (str.getMonth() + 1) < 10 ? `0${str.getMonth() + 1}` :
                (str.getMonth() + 1)
    let day = str.getDate() < 10 ? `0${str.getDate()}` : str.getDate()
    str = year + '-' + month + '-' + day
    return str
  },
  getDuration(item) {
    let date = new Date(item)
    let min = date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes()
    let sec = date.getUTCSeconds() < 10 ? `0${date.getUTCSeconds()}` : date.getUTCSeconds()
    return `${min}:${sec}`
  },
  formatNum(item) {
    if(item === undefined) return
    let str = item.toString()
    let length = str.length
    if(length < 5) {
      return item
    }
    switch (length) {
      case 5:
        return `${str.slice(0,1)}.${str.slice(1,2)}万`
        break;
      case 6:
        return `${str.slice(0,2)}.${str.slice(2,3)}万`
        break;
      case 7:
        return `${str.slice(0,3)}.${str.slice(3,4)}万`
        break;
      case 8:
        return `${str.slice(0,4)}.${str.slice(4,5)}万`
        break;
      case 9:
        return `${str.slice(0,5)}.${str.slice(5,6)}万`
        break;
      case 10:
        return `${str.slice(0,6)}.${str.slice(6,7)}万`
        break;
    }
  },
  formatTime(str) {
    let now = new Date()
    let nowStamp = now.getTime();
    let rest = nowStamp - str

    str = new Date(str)
    let year = str.getFullYear()
    let month = (str.getMonth() + 1) < 10 ? `0${str.getMonth() + 1}` : (str.getMonth() + 1)
    let day = str.getDate() < 10 ? `0${str.getDate()}` : str.getDate()
    let hour = str.getHours() < 10 ? `0${str.getHours()}` : str.getHours()
    let min = str.getUTCMinutes() < 10 ? `0${str.getUTCMinutes()}` : str.getUTCMinutes()
    
    // 86400 1d 2592000 1m  31622400 1y
    if (rest < 60000) {
      str = `刚刚`
    } else if (rest < 3600000) {
      min = parseInt(rest / 1000 / 60)
      str = `${min}分钟前`
    } else if (rest < 86400000) {
      str = `${hour}:${min}`
    } else if(rest < 172800000) {
      str = `昨天 ${hour}:${min}`
    } else if(rest < 31622400000) {
      str = `${month}月${day}日 ${hour}:${min}`
    } else {
      str = `${year}年${month}月${day}日 ${hour}:${min}`
    }
    return str
  }
}



export default Filters