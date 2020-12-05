<template>
  <div class="nav-bar" @mousemove="enter" @mouseleave="leave">
    <slot></slot>
    <div class="bottom-line" style="left: 0px"></div>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  data() {
    return {

    }
  },
  mounted() {
    // 给第一个添加active样式
    document.querySelector('.nav-item').classList.add('active')
  },
  methods: {
    enter($e) {
      let ele = document.querySelector('.bottom-line')
      let items = document.querySelectorAll('.nav-item')
      let target = $e.target
      let text = target.innerHTML
      let left = undefined
      if(text === '歌曲列表') {
        ele.style.left = 0 + 'px'
      } else if(text === '收藏者') {
        ele.style.left = 200 + 'px'
      } else {
        ele.style.left = 100 + 'px'
      } 
    },
    leave($e) {
      let ele = document.querySelector('.bottom-line')
      let items = document.querySelectorAll('.nav-item')
      let target = $e.target
      let left = undefined
      for(let n = 0; n < 3; n++) {
        if(items[n].classList[1]) {
          left = 100 * n
        }
      }
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
  width: 80px;
  height: 4px;
  background: #c62f2f;
  border-radius: 6px;
  transition: 0.2s;
}
</style>