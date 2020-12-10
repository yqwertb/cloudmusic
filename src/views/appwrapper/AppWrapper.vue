<template>
  <div id="app__wrapper">

    <!-- 公用的头部 -->
    <app-header @headerLogin="login" @infoEvent="infoEvent" 
      :isLogin="isLogin" @unLogin="unLogin" ref="header"></app-header>
    <header-info v-if="isLogin" :info="info" :is-get-dedail="isGetDedail"></header-info>

    <!-- 不同的页面区域 -->
    <div id="app__content">

      <!-- loginActive -->
      <login v-if="loginActive" @cellLogin="subLogin" @loginClose="loginClose"></login>
      <app-side :myPlayList="myPlayList" :myStarList="myStarList"></app-side>
  
      <router-view id="content"></router-view>

    </div>
  
    <!-- 底部固定播放器 -->
    <player></player>
  </div>
</template>

<script>
import AppHeader from './child/AppHeader'
import AppSide from './child/AppSide'
import Login from './child/login'
import HeaderInfo from './child/HeaderInfo'

import player from '@/components/context/player/player.vue'

import {phoneLogin, refreshLogin, logout} from '@/network/user-status.js'
import {getDetail, getPlaylist} from '@/network/user-info.js'

export default {
  name: 'AppWrapper',
  data() {
    return {
      isLogin: false, //是否登录账户
      loginActive: false, //登录页面开启的权限
      InfoActive_child: false, // 子组件点击判断信息弹框是否弹出
      InfoActive: false, //页面监听事件 判断信息弹框是否弹出
      user: {}, //用户信息  包括img name id 和 token
      info: {},
      infoCount: false, 
      //false时，说明info元素没有创建  不能监听click 在sublogin函数改为true true时，在updated监听一次
      isGetDedail: false,
      currentRoute: {},
      myPlayList: [],
      myStarList: [],
   }
  },
  watch: {

  },
  mounted() {
    if(this.$store.state.user['user-info'].name) {
      this.isLogin = true 
      this.$store.commit('change_login', true)
      this.dataRefresh()
      this.infoOut()
      this.getPlaylist(this.user.uid)
    }
  },
  updated() {
    if(this.$store.state.user['user-info'].name && this.isLogin) {
      this.isLogin = true 
      this.$store.commit('change_login', true)
      this.dataRefresh()
    }
    if(this.infoCount) {
      this.infoCount = false
      this.infoOut()
    }
  },
  components: {
    AppHeader,
    AppSide,
    Login,
    HeaderInfo,
    // context
    player
    // common
  },
  computed: {
  },
  methods: {

    // 保存路由信息
    getRoute() {
      // Object.assign(this.currentRoute, this.$route)
      this.$router.go(0)
      this.$router.push({path: '/home/forU'})
    },
    // 提交用户登录数据
    dataRefresh() {
      for(let n in this.$store.state.user['user-info']) {
        this.user[n] = this.$store.state.user['user-info'][n]
      }
    },    
    subLogin(o) {
      let timestamp = new Date().getTime()
      phoneLogin(o.phone, o.psw, timestamp).then(result => {
        if(result.data.code === 200) {
          let res = result.data
          let allCookies = document.cookie

          this.user.isLogin = true
          this.user.uid = res.account.id
          this.user.name = res.profile.nickname
          this.user.img = res.profile.avatarUrl
          this.user.token = res.token

          this.$store.commit('set_cookies', allCookies)
          this.$store.commit('set_storge', this.user)
          this.$store.commit('set_user', this.user)

          this.infoCount = true
          this.isLogin = !this.isLogin
          this.loginActive = !this.loginActive
          this.getRoute()
        } else {
          alert("账号或密码错误")
        }
        
      }).catch(res => {
        alert(res.data.message)
        // this.getRoute()
      })
    },
    getPlaylist(uid) {
      let id = uid
      getPlaylist(id).then(result => {
        let starIndex = 0
        let arr = []
        let res = result.data.playlist
        res.forEach((item, index) => {
          if(item.userId.toString() === id) {
            this.$set(this.myPlayList, index, item)
          } else {
            this.$set(this.myStarList, starIndex, item)
            starIndex++
          }
        })
      })
    },
    //获取头部用户弹出层的信息
    getInfoDetail(uid) {
      let timestamp = new Date().getTime()
      getDetail(uid, timestamp).then(result => {
        let res = result.data
        this.info.level = res.level
        this.info.eventCount = res.profile.eventCount
        this.info.follows = res.profile.follows
        this.info.followeds = res.profile.followeds
        this.info.sign = res.pcSign
      })
      this.isGetDedail = true
      setTimeout(() => {
        this.isGetDedail = false
      },2000)
    },
    loginClose() {
      this.loginActive = !this.loginActive
    },
    //允许登录组件激活
    login() {
      this.loginActive = true
    },
    unLogin() {
      logout().then(result => {
        let res = result.data
        this.isLogin = false
        this.$store.commit('change_login', false)
        this.user = {}
        this.info = {}
        this.isGetDedail = false
        window.sessionStorage.removeItem('token')
        window.sessionStorage.removeItem('user_uid')
        window.sessionStorage.removeItem('user_name')
        window.sessionStorage.removeItem('user_img')
        window.sessionStorage.setItem('isLogin', false)
        window.sessionStorage.setItem('sideItem', 0)
        this.getRoute()
      })
    },
    infoEvent() {
      //添加点击事件，点击某些元素外，关闭元素
      let ele = document.querySelector(".my-info")

      if(!this.InfoActive_child && this.isLogin) {
        this.getInfoDetail(this.user.uid)
        
        ele.setAttribute("class", "in my-info")
        ele.style.display = 'block'
        // 和infoOut函数的控制变量保持一致
        this.InfoActive_child = !this.InfoActive_child
        this.InfoActive = !this.InfoActive
      } else if (this.InfoActive_child) {
        ele.setAttribute("class", "out my-info")
        this.InfoActive_child = !this.InfoActive_child
        this.InfoActive = !this.InfoActive
      }
    },
    infoOut() {
      this.$nextTick(() => {
        document.body.addEventListener('click', (e)=> {
           this.infoOutEvent(e)
        }, false)
      })
    },
    infoOutEvent(e) {
      let ele = document.querySelector(".my-info")      
      if (e.target.className !== 'my-info' && e.target.className !== 'username' && this.isLogin) {
        if(ele.style.display === 'block' && this.InfoActive && ! ele.contains(e.target)) {
          this.InfoActive = !this.InfoActive
          this.InfoActive_child = !this.InfoActive_child
          ele.setAttribute("class", "out my-info")
          ele.style.display = 'none'
        }
      }
    },
  },
}
</script>

<style scoped>
#app__wrapper {
  position: relative;
  width: 1200px;
  height: 100vh;
  margin: 0 auto;
}
#app__content {
  display: flex;
  width: 100%;
  height: calc(100% - 45px);
  /* position: fixed;
  top: 44px; */
  /* width: 1200px; */
  /* height: calc(100% - 130px); */
  /* height: 100%; */
  background-color: #fafafa;
}
#content {
  /* width: 960px; */
  /* height: 100%; */
  /* height: calc(100% - 55px); */
  width: 80%;
  height: 100%;
  padding-bottom: 60px;
}
</style>