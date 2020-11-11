<template>
  <div class="nav-bar home-nav" @click="navClick($event)">
    <div v-for="(item, index) in itemText" 
      class="nav-item" :key="index" :path="path[index]">
      <div class="nav-text">{{item}}</div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/common/navbar/navBar'
import navItem from '@/components/common/navbar/navItem'

export default {
  name: 'navBarBase',
  components: {
    navBar,
    navItem,
  },
  data() {
    return {
      itemText: ['个性推荐', '歌单', '主播电台', '排行榜', '歌手', '最新音乐'],
      path: ['/home/forU', '/home/songlist', '/home/dj', '/home/top', '/home/artist', '/home/newsong',],
      allItem: [],
      currentPath: undefined,
    }
  },
  mounted() {
    // this.allItem.push(document.querySelectorAll(".nav-text"))
    this.allItem = Array.from(document.querySelectorAll(".nav-text"))
    this.currentPath = this.$route.fullPath
    this.path.forEach((item, index) => {
      if(item === this.currentPath) {
        this.allItem[index].className = 'nav-text active'
      }
    })
  },
  methods: {
    navClick(e) {
      if(e.path[0].className === 'nav-text') {
        this.allItem.forEach(item => {
          item.className = 'nav-text'
        })
        e.path[0].className = 'nav-text active'
        if(this.$route.fullPath !== e.path[1].getAttribute('path')) {
          this.$router.push(e.path[1].getAttribute('path')) 
        }
      }
    }
  }
}
</script>

<style scoped>
.home-nav {
  padding: 0 15%;
  height: 40px;
  border-bottom: 1px solid #e1e1e2;
}
.nav-item {
  min-width: 60px;
}
.nav-text {
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #000;
}
.active {
  border-bottom: 2px solid #c62f2f;
  color: #c62f2f;
}
</style>