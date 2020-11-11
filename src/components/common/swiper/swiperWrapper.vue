<template>
  <div class="swiper-wrapper">
    <div class="swiper">
      <slot></slot>
    </div>
    <div class="arrow-left" @click="arrowClick('l')">
      <i class="iconfont icon-arrow-left-c"></i>
    </div>
    <div class="arrow-right" @click="arrowClick('r')">
      <i class="iconfont icon-arrow-down"></i>
    </div>
    <div class="indicator">
      <div v-for="(item, index) in slideCount" :key="index" @click="indiClick(index)"
        class="indi-item" :class="{active: index === currentIndex}">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'swiperWrapper',
  props: {
    //元素个数
    slideCount: {
      type: Number
    },
    //dom元素
    slideItems: {
      type: Array
    }
  },
  watch: {
    slideItems: {
      handler: function() {
        this.init()
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
      leftIndex: 1,
      rightIndex: undefined,
      scrolling: true, //是否在自动播放
      myTime: 70,
      time: 5000,
      handle: null, //轮播总定时器的开关
    }
  },
  methods: {
    init() {
      this.rightIndex = this.slideCount - 1
      this.domHandle()
    },
    domHandle() {
      this.handle = setInterval(() => {
        this.currentDom()
        this.leftDom()
        this.rigthDom()
        this.toLtDom()
      }, this.time);
    },
    currentDom() {
      let index = this.currentIndex
      let x = 0
      let z = 0
      let o = 1
      let timer = setInterval(() => {
        this.slideItems[index].style.transform = `perspective(1000px) translate3d(${x}px, 0, -${z}px)`
        this.slideItems[index].style.opacity = o
        o = o - 0.15
        z = z + 8
        x = x + 60
        if(o < 0.4 || o === 0.4) {
          if (index > 0) {
            this.slideItems[index-1].style.display = "none"
          }
          
          this.slideItems[index].className = "swiper-item item-right"
          this.slideItems[index].style.transform = null
          this.slideItems[index].style.opacity = null
          if(this.currentIndex < this.slideCount - 1) {
            this.currentIndex++
          } else {
            this.currentIndex = 0
          }
          clearInterval(timer)
        }
      }, this.myTime);
    },
    leftDom() {
      let index = this.leftIndex
      let x = 0
      let z = 0
      let o = 0.4
      this.slideItems[index].className = "swiper-item"
      let timer = setInterval(() => {
        this.slideItems[index].style.transform = `perspective(1000px) translate3d(${x}px, 0, -${z}px)`
        this.slideItems[index].style.opacity = o
        o = o + 0.15
        z = z + 8
        x = x + 50
        if(o > 1 || o === 1) {
          this.slideItems[index].className = "swiper-item item-current"
          this.slideItems[index].style.transform = null
          this.slideItems[index].style.opacity = null
          clearInterval(timer)
        }
      }, this.myTime);
    },
    rigthDom() {
      let index = this.rightIndex

      let x = 0
      let z = 0
      let o = 0.4
      
      let timer = setInterval(() => {
        this.slideItems[index].style.transform = `perspective(1000px) translate3d(-${x}px, 0, -${z}px)`
        o = o - 0.1
        z = z + 8
        x = x + 20
        if(o < 0 || o === 0) {
          this.slideItems[index].style.display = "none"
          this.slideItems[index].className = "swiper-item"
          this.slideItems[index].style.transform = null
          this.slideItems[index].style.opacity = null
          clearInterval(timer)
        }
      }, this.myTime);
      if(this.rightIndex === this.slideCount - 1) {
        this.rightIndex = 0
      } else {
        this.rightIndex++
      }
    },
    toLtDom() {
      if(this.leftIndex < this.slideCount - 1) {
        this.leftIndex++
      } else {
        this.leftIndex = 0
      }
      let newIndex = this.leftIndex 
      let x = 0
      let z = 0
      let o = 0
      this.slideItems[newIndex].style.display = ""
      let timer = setInterval(() => {
        this.slideItems[newIndex].style.transform = `perspective(1000px) translate3d(-${x}px, 0, ${z}px)`
        o = o + 0.1
        z = z + 8
        x = x + 10
        if(o > 0.4 || o === 0.4) {
          this.slideItems[newIndex].className = "swiper-item item-left"
          this.slideItems[newIndex].style.transform = null
          this.slideItems[newIndex].style.opacity = null
          clearInterval(timer)
        }
      }, this.myTime);
    },
    arrowClick(dir) {
      let index = this.currentIndex
      if(dir === 'l') {
        // index要减少 如果index是0 直接变为最大
        this.change(index === 0 ? this.slideCount - 1 : index - 1)
      } else {
        this.change(index === this.slideCount - 1 ? 0: index + 1)
      }
    },
    indiClick(index) {
      this.change(index)
    },
    change(cur) {
      clearInterval(this.handle)
      this.currentIndex = cur
      this.rightIndex = cur - 1 < 0 ? this.slideCount - 1 : cur - 1
      this.leftIndex = cur + 1 > this.slideCount - 1 ? 0 : cur + 1

      this.slideItems.forEach((item, cur) => {
        if(this.currentIndex === cur) {
          item.style.display = null
          item.className = "swiper-item item-current"
        } else if(this.rightIndex === cur) {
          item.style.display = null
          item.className = "swiper-item item-right"          
        } else if(this.leftIndex === cur) {
          item.style.display = null
          item.className = "swiper-item item-left"          
        } else {
          item.style.display = "none"
          item.className = "swiper-item"
        }
      })
      this.domHandle()
    },
  }
}
</script>

<style scoped>
.swiper-wrapper {
  position: relative;
}
.swiper {
  height: 100%;
}
.indicator {
  display: flex;
  justify-content: center;
  padding-top: 10px;
}
.indi-item {
  cursor: pointer;
  width: 30px;
  height: 4px;
  margin: 0 9px;
  background-color: #c8c8c8;
}
.active {
  background-color: #c62f2f;
}
.swiper-wrapper i {
  font-size: 60px;
}
.arrow-left {
  left: 0;
}
.arrow-right {
  right: 0;
}
.arrow-left, .arrow-right {
  position: absolute;
  top: 65px;
  color: #757475;
  transition: 0.5s;
  cursor: pointer;
}
.arrow-right:hover, .arrow-left:hover {
  color: #192227;
}
</style>