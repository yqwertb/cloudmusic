<template>
  <div class="nav-bar" @mousemove="enter" @mouseleave="leave" @click="navClick($event)">
    <slot></slot>
    <div class="bottom-line" style="left: 0px"></div>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  data() {
    return {
      itemsDom: []
    }
  },
  mounted() {
    // 给第一个添加active样式
    document.querySelectorAll('.nav-item').forEach((item) => {
      this.itemsDom.push(item)
    })
    this.itemsDom[0].classList.add('active')
    document.querySelector('.bottom-line').style.width = this.itemsDom[0].offsetWidth + 'px'
  },
  methods: {
    getLinePos(e) {
      let path = e.path || e.composedPath()
      let target = path[1]
      let itemWidth = target.offsetWidth
      let left = target.offsetLeft
      document.querySelector('.bottom-line').style.width = itemWidth + 'px'
      return left
    },
    navClick(e) {
      let path = e.path || e.composedPath()
      if(this.itemsDom.indexOf(path[1]) !== -1) {
        this.getLinePos(e)
        this.$emit('navClik', e)
      }
    },
    enter($e) {
      let path = $e.path || $e.composedPath()
      if(this.itemsDom.indexOf(path[1]) !== -1) {
        let left = this.getLinePos($e)
        let ele = document.querySelector('.bottom-line')
        // let target = $e.target
        let target = path[1]
        let text = target.innerHTML
        if(text === '歌曲列表') {
          ele.style.left = left  + 'px'
        } else if(text === '收藏者') {
          ele.style.left = left + 'px'
        } else {
          ele.style.left = left + 'px'
        } 
      }

    },
    leave($e) {
      let ele = document.querySelector('.bottom-line')
      let items = document.querySelectorAll('.nav-item')
      let width = undefined
      let left = undefined
      for(let n = 0; n < 3; n++) {
        if(items[n].classList[1]) {
          left = items[n].offsetLeft
          width = items[n].offsetWidth
        }
        
      }
      ele.style.width = width + 'px'
      ele.style.left = left + 'px'
    }
  }
}
</script>

<style scoped>
.nav-bar {
  position: relative;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e1e1e2;
}
.bottom-line {
  position: absolute;
  bottom: 0px;
  /* width: 80px; */
  height: 4px;
  background: #c62f2f;
  border-radius: 6px;
  transition: 0.2s;
}
</style>