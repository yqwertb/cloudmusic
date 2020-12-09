 const Utiles = {
  throttle(func, wait) {
    var timeout, context, args, result;
    var previous = 0;

    var later = function() {
        previous = +new Date();
        timeout = null;
        func.apply(context, args)
    };

    var throttled = function() {
        var now = +new Date();
        //下次触发 func 剩余的时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 如果没有剩余的时间了或者你改了系统时间
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
  },
  getImg(query, src) {
    let arr = document.querySelectorAll(query)
    arr.forEach((item, index) => {
      let newImg = new Image()
      newImg.src = src
      newImg.onerror = () => { // 图片加载错误时的替换图片
        this.picUrl = 'https://s1.ax1x.com/2020/08/26/dfEfDx.png'
      }
      newImg.onload = () => { // 图片加载成功后把地址给原来的newImg
        item.src = src
      }
    })
  },
 }

export default Utiles