<template>
  <div class="foru page-inner">
    <transition name="fade">
      <loading v-if="isLoading" class="loading"></loading>
    </transition>
    <div v-if="!isLoading">
      <swiper :banners="banners"></swiper>
      <!-- <div v-if="!isLogin" class="not-login">登录获取更多</div> -->
      <div class="content">
        <play-list-a :recommendList="recommendList"></play-list-a>
        <private-con :privateContent="privateContent"></private-con>
        <new-songs :newSongs="newSongs"></new-songs>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from './child/swiper.vue'
import playListA from './child/playlistA.vue'
import privateCon from './child/privateCon.vue'
import newSongs from './child/newSongs.vue';
import message from '@/components/common/message/tmpmes.vue'

import Loading from "@/components/common/loading/loading.vue";

import axios from 'axios'

import {
  getBanner, getDailySong, getSong,
  getPrivatecontent,  getNewsong,
} from "@/network/home.js"

export default {
  name: 'forU',
  components: {
    swiper,
    playListA,
    privateCon,
    newSongs,
    Loading,
    message
  },
  data() {
    return {
      banners: [], //轮播图数据数组
      recommendList: [], //推荐歌单
      privateContent: [], //独家放送
      newSongs: [], //最新音乐
      isLogin: false,
      isLoading: true
    }
  },
  watch: {
    isLogin: {
      handler: function() {
        // this.isLoading = true
        // this.init()
      },
      // immediate: trues
    }
  },
  created() {
    this.isLogin = this.$store.state.user['user-info'].isLogin
    // this.getBanner()
    this.init()
  },
  mounted() {
  },
  updated() {
  },
  methods: {
    // 网络请求
    init() {
      new Promise((resolve) => {
        this.getBanner()
        this.allRequest()
        resolve()
      }).then(() => {
        this.isLoading = false
      })
      // if(this.isLogin.toString() === 'true') {
        // this.allRequest()
      // } else {
      //   new Promise((resolve) => {
      //     this.getBanner()
      //     this.allRequest()
      //     resolve()
      //   }).then(() => {
      //     this.isLoading = false
      //   })
      // }
      // this.getDailySong()
      // this.getPrivatecontent()
      // this.getNewsong()
      
    },
    allRequest() {
      let all = [this.getPrivatecontent(), this.getNewsong()]
      if(this.isLogin.toString() === 'true') {
        all.unshift(this.getDailySong())
      } else {
        all.unshift(this.getSong())
      }
      axios.all(all)
        .then(axios.spread(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 500)
        }))
    },
    getBanner() {
      getBanner().then(result => {
        let res = result.data
        res.banners.forEach((item, index) => {
          this.$set(this.banners, index, {
            imageUrl: item.imageUrl,
            targetId: item.targetId,
            titleColor: item.titleColor,
            typeTitle: item.typeTitle,
            copywriter: item.copywriter
          })
        })
      })
    },
    getSong() {
      getSong().then(result => {
        let res = result.data
        let rec = res.result
        for(let n = 0; n < 4; n++) {
          this.$set(this.recommendList, n, {
            name: rec[n].name,
            copywriter: rec[n].copywriter,
            picUrl: rec[n].picUrl,
            playcount: rec[n].playCount,
            id: rec[n].id               
          })
        }
      })
    },
    getDailySong() {
      let timestamp = new Date().getTime()
      getDailySong(timestamp).then(result => {
        let res = result.data
        let rec = res.recommend
        let length = rec.length
        let n = 0
        rec.forEach((item, index) => {
          if(index < 6 && index > 1 ) {
            this.$set(this.recommendList, n, {
              name: item.name,
              copywriter: item.copywriter,
              picUrl: item.picUrl,
              playcount: item.playcount,  
              id: item.id              
            })
            n++
          }
        })
      })
    },
    getPrivatecontent() {
      getPrivatecontent().then(result => {
        let res = result.data
        let rec = res.result
        rec.forEach((item, index) => {
          this.$set(this.privateContent, index, {
            id: item.id,
            type: item.type,
            sPicUrl: item.sPicUrl,
            name: item.name,
          })
        })
      })
    },
    getNewsong() {
      getNewsong().then(result => {
        let res = result.data
        let rec = res.result
        rec.forEach((item, index) => {
          this.$set(this.newSongs, index, {
            id: item.id,
            type: item.type,
            picUrl: item.picUrl,
            name: item.name,
            alias: item.song.alias,
            artists: item.song.artists
          })
        })
      })
    }
  }
}
</script>

<style>
.default-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #e1e1e2;
  margin-bottom: 8px;
}
.default-content {
  margin-bottom: 40px;
}
.loading {
  width: 100%;
  height: 600px;
}
.header-left {
  font-size: 22px;
  color: #000;
  padding-bottom: 5px;
}
.header-right {
  position: relative;
  bottom: -12px;
}
.header-right, .header-right-a {
  display: inline-block;
  font-size: 14px;
  color: #666666;
}
.not-login {
  margin-top: 50px;
  text-align: center;
  font-size: 26px;
}
.content {
  margin-top: 40px;
}
</style>