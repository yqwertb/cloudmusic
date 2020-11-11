<template>
  <div id="app__header">
    <div id="app__header__logo">
      <a href="javascript:void(0);" style="display: block; color: #fff">超级云音乐</a>
    </div>
    <div id="app__header__search">
      <div id="search" contenteditable="true"></div>
      <i class="iconfont icon-sousuo"></i>
    </div>
    <div id="app__header__info">
      <div id="app_header_user" class="username">
        <div id="user-info" class="username">
          <div id="user-login" @click="login" class="username">
            <img :src="getImg()" class="username" />
            <span id="username" class="username" style="margin-right: 5px">{{getName()}}</span>
            <i class="iconfont icon-jiantou-"></i>
          </div>
        </div>
      </div>
      <div id="app__header_other">
        <i class="iconfont icon-pifu"></i>
        <i class="iconfont icon-Asset"></i>
        <i class="iconfont icon-guanbi" @click='unLogin'></i>
      </div>
    </div>
  </div>
</template>

<script>
import default_img from '@/assets/img/default_img.jpg'

export default {
  name: 'AppHeader',
  props: {
    isLogin: {
      type: Boolean,
      default() {
        false
      }
    }
  },
  data() {
    return {
      user: {
        name: null,
        img: null
      }
    }
  },
  watch: {
    isLogin: {
      handler:function(n) {
        this.isLogin = n
        // console.log(this.$store.state.user['user-info']);
        if(this.isLogin) {
          this.user.name = this.$store.state.user['user-info'].name
          this.user.img = this.$store.state.user['user-info'].img
        }
      },
      immediate: true,
    },
    user: {
      handler: function(n, o) {
        if (n !== o) {
          this.getName()
          this.getImg()
        }
      },
      immediate: true,
      deep: true
    }
  },
  beforeUpdate() {
  },
  beforeUpdate() {
  },
  updated() {

  },
  computed: {
  },
  methods: {
    getName() {
      // console.log('getName');
      if(!this.isLogin) {
        return '未登录'
      } else {
        return this.user.name
      }
    },
    getImg() {
      if(!this.isLogin) {
        return default_img
      } else {
        return this.user.img
      }

    },
    //用户区的点击事件，弹出登录框或弹出用户信息
    login($e) {
      if (!this.isLogin) {
        this.$emit('headerLogin')
      } else {
        this.$emit('infoEvent', $e)
      }
    },
    unLogin() {
      if (this.isLogin) {
        this.$emit('unLogin')
      }
    }
  }

}
</script>

<style scoped>
#app__header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 1200px;
  height: 44px;
  line-height: 44px;
  color: #fff;
  background-color: var(--netease-default);
}
#app__header__logo {
  font-weight: bold;
  padding-left: 20px;
}
#app__header__search {
  width: 280px;
  display: flex;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  margin: 10px 0;
  border-radius: 8px;
  background-color: #a82828;
  
}
#app__header__search > #search {
  flex: 1;
  padding-left: 8px;
}
#app_header_user {
  width: auto;
}
#user-info {
  cursor: pointer;
  display: flex;
}  
#user-info img {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  vertical-align: middle;
  border-radius: 50%;
}
#app__header__info {
  display: flex;
  justify-content: space-between;
  width: 300px;
}
#app__header_other {
  margin-left: 40px;
}
#app__header_other i {
  cursor: pointer;
  margin-right: 20px;
}
#app__header_other i:nth-child(1), #app__header_other i:nth-child(3) {
  font-size: 18px;
}
</style>