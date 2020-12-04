<template>
  <div class="play-list default-content">
    <div class="default-header">
      <div class="header-left">推荐歌单</div>
      <div class="header-right">
        <router-link to="/home/forU" class="header-right-a">更多</router-link>
      </div>
    </div>
    <div class="playlist-content" @click="pushRoute($event)">
      <div class="content-item" v-for="(item, index) in recommendList" 
        :key="index">
        <input style="display: none" :value="item.id">
        <div class="item-main">
          <!-- class="default-bg" -->
          <img :src="picUrl">
        <!-- <div class="item-main"
          :style="{background: 'url(' + item.picUrl +')'}"> -->
          <div class="top-text"><span>{{item.copywriter}}</span></div>
          <div class="play-count">
            <i class="iconfont icon-headphones"></i>
            <span class="count">{{getPlaycount(item)}}</span>
          </div>
          <div class="play-icon">
            <i class="iconfont icon-bofang"></i>
          </div>
        </div>
        <div class="item-text">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import loadingGif from '../../../../../assets/img/loading.gif'
export default {
  name: 'playListA',
  props: {
    recommendList: {
      type: Array
    }
  },
  data() {
    return {
      picUrl: loadingGif
    }
  },
  watch: {
    recommendList: {
      handler: function() {
        this.$nextTick(() => {
          this.getImg()
        })
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {

  },
  computed: {
    getBgi() {
      return loadingGif
    }
  },
  methods: {
    pushRoute(e) {
      // 兼容火狐和Safari浏览器
      let arr = e.path || e.composedPath()
      let wrapper = undefined
      let id = undefined
      arr.forEach(item => {
        if(item.className === 'content-item') {
          wrapper = item
        }
      })
      if(wrapper === undefined) return
      id = wrapper.children[0].value
      this.$router.push(`/albumdetail/${id}`)
    },
    getPlaycount(item) {
      let str = item.playcount.toString()
      let length = str.length
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
    getImg() {
      let arr = document.querySelectorAll('.item-main img')
      
      this.recommendList.forEach((item, index) => {
        let newImg = new Image()
        newImg.src = item.picUrl
        newImg.onerror = () => { // 图片加载错误时的替换图片
          this.picUrl = 'https://s1.ax1x.com/2020/08/26/dfEfDx.png'
        }
        newImg.onload = () => { // 图片加载成功后把地址给原来的newImg
          arr[index].src = item.picUrl
        }
      })
    }
  }
}
</script>

<style scoped>
/* import loadingGif from '../../../../../assets/img/loading.gif' */

.playlist-content {
  display: flex;
  justify-self: start;
  justify-content:space-between;
  flex-flow: wrap;
  margin-top: 8px;
}
.content-item {
  position: relative;
  width: 180px;
  height: 230px;
  margin-bottom: 10px;
}
.top-text {
  position: absolute;
  top: -100px;
  z-index: 99;
  width: 100%;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  transition: 0.3s;
  padding: 10px 10px;
  font-size: 12px;
}
.top-text span{
  height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 10px;
  display: -webkit-box;
}
.item-main {
  position: absolute;
  width: 100%;
  height: 180px;
  overflow: hidden;
}
.item-main img {
  width: 100%;
  height: 100%;
}
/* .default-bg {
  background: url('../../../../../assets/img/loading.gif');
} */
.play-count, .play-icon {
  color: #fff;
}
.play-count {
  position: absolute;
  top: 0px;
  right: 0;
  padding: 0 5px 0 5px;
  background-image: linear-gradient(to right, rgba(228, 234, 238, 0.5), rgba(5, 16, 27, 0.4));
}
.play-icon {
  position: absolute;
  display: inline-block;
  transition: 0.3s;
  opacity: 0;
  bottom: 10px;
  right: 8px;
  z-index: 99;
}
.item-text {
  position: absolute;
  bottom: 5px;
  height: 40px;
  word-break: break-all;
  color: #000;
}
.count {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
}
.icon-headphones {
  position: relative;
  top: 2px;
  right: 2px;
  font-size: 20px;
}
.icon-bofang {
  font-size: 20px;
}
.item-main:hover .play-icon {
  opacity: 1;
}
.item-main:hover .top-text {
  top: 0;
}
</style>