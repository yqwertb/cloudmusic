<template>
  <div class="my-info" style="display: none">
    <transition name="fade">
      <loading v-show="isLoading" class="info-loading"></loading>
    </transition>
    <div class="my-info__wrapper" v-show="!isLoading">
      <div class="my-info__header">
        <div class="my-info__head__img">
          <img :src="getImg" />
        </div>
        <div class="my-info__head__name">
          <span class="my-name">{{getName}}</span>
          <span class="my-lv">LV{{getLv}}</span>
        </div>
        <div class="my-info__head__sign">
          <span class="sign" :class="{ signed: this.userinfo.sign }" @click="toSign">{{SignText}}</span>
        </div>
      </div>
      <div class="my-info__friend">
        <div class="friend-item" v-for="(item, index) in count" :key="index">
          <div class="friend-item__count">{{item}}</div>
          <div class="friend-item__name">{{text[index]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/common/loading/loading.vue";

import {dailySign} from "@/network/user-act.js"

export default {
  name: "HeaderInfo",
  components: {
    Loading,
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    },
    isGetDedail: {
      type: Boolean
    }
  },
  data() {
    return {
      userinfo: {},
      text: ['动态', '粉丝', '关注'],
      count: [0, 1, 2],
      isLoading: true,
    };
  },
  watch: {
    info: {
      handler: function(n, o) {
        // this.SignText
        // this.getLv
      },
      immediate: true,
      deep: true
    },
  },
  created() {
    let timer = setInterval(() => {
      if(this.isGetDedail) {
        if(this.info.eventCount !== undefined) {
          this.userinfo = Object.assign({}, this.userinfo, this.info)
          this.count.splice(0, 1, this.info.eventCount)
          this.count.splice(1, 1, this.info.followeds)
          this.count.splice(2, 1, this.info.follows)
          setTimeout(() => {
            this.isLoading = false
          },100)

        }
      }
      if(window.sessionStorage.getItem('isLogin') === 'false') {
        clearInterval(timer)
      }
      if(document.querySelector(".my-info").style.display === 'none') {
        this.isLoading = true
      }
      
    }, 2000);
  },
  computed: {
    getImg() {
      return this.$store.state.user["user-info"].img;
    },
    getName() {
      return this.$store.state.user["user-info"].name;
    },
    SignText() {
      return this.userinfo.sign ? "已签到" : "签到";
    },
    getLv() {
      return this.userinfo.level
    }
  },
  methods: {
    toSign() {
      console.log(1);
      let timestamp = new Date().getTime()
      if(!this.userinfo.sign) {
        dailySign(timestamp).then( res => {
          if(res.code === 200) {
            this.userinfo = Object.assign({}, this.userinfo, {'sign': true})
            alert("签到成功，获得五积分")
          }
        })
      }
    }
  },
};
</script>

<style scoped>
.my-info {
  position: relative;
  top: 44px;
  left: 850px;
  background-color: #fff;
  z-index: 99;
  width: 250px;
  box-shadow: 0 0 8px #e2e2e2;
  -webkit-transition: all 0.2s linear;
  -moz-transition: all 0.2s linear;
  -ms-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.info-loading {
  height: 156px
}
.my-info__wrapper {
  padding: 25px 10px 15px 10px;
}
.my-info__header {
  display: flex;
  justify-content: space-between;
  height: 50px;
  margin-bottom: 10px;
}
.my-info__head__img img {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.my-info__head__name {
  flex: 0.8;
  margin-left: -5px;
  position: relative;
}
.my-name {
  display: block;
  max-width: 100px;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  margin-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.my-lv {
  position: relative;
  top: -60px;
  right: -70px;
  font-size: 8px;
  background-color: #fff;
  color: var(--netease-default);
  font-weight: 900;
  padding: 2px 8px;
  border-radius: 55px;
  border: 1px solid var(--netease-default);
}
.my-info__head__sign {
  height: 50px;
  line-height: 50px;
  margin-left: 10px;
}
.sign {
  cursor: pointer;
  padding: 3px 5px;
  font-size: 14px;
  border: 1px solid #e1e1e2;
  border-radius: 4px;
}
.signed {
  cursor: default;
  color: #c0c0c0;
}
.my-info__friend {
  display: flex;
  justify-content: space-around;
  padding-top: 15px;
  text-align: center;
  border-top: 1px solid #e9e9e9;
}
.friend-item__count {
  font-size: 18px;
  font-weight: 700;
}
.friend-item__name {
  padding-top: 4px;
  font-size: 14px;
}
@keyframes infoIn {
  from {
    transform: translateY(80px);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes infoOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.in {
  animation: infoIn 0.3s;
}
.out {
  visibility: hidden;
  opacity: 0;
}
.my-info::before {
  content: "";
  width: 10px;
  height: 10px;
  display: block;
  position: absolute;
  top: -5px;
  left: calc(50% - 5px) !important;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  background-color: white;
  -webkit-box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.05);
  z-index: 1;
}
</style>