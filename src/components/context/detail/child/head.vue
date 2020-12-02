<template>
  <div class="detail-head"  v-if="update">
    <div class="head-left">
      <img :src="defaultPic"> 
    </div>
    <div class="head-right">
      <div class="right-head">
        <div class="right-head-left">
          <span class="right-head-tag">{{tagTexts[0]}}</span>
          <span class="right-head-text">{{info.name}}</span>
        </div>
        <div class="right-head-right">
          <div class="songs-count">
            <span class="head-right-default">歌曲数</span>
            <span class="head-right-count">{{info.trackCount}}</span>
          </div>
          <div class="play-count">
            <span class="head-right-default">播放数</span>
            <span class="head-right-count">{{ info.playCount | getPlaycount}}</span>
          </div>
        </div>
      </div>
      <div class="right-creator">
        <div class="creator">
          <img :src="info.avatarUrl">
          <span class="creator-name">{{info.nickname}}</span>
        </div>
        <div class="creat-time">{{info.createTime | changeTime}}</div>
      </div>
      <div class="right-btn">
        <div class="play-all">
          <i class="iconfont icon-bofang2"></i>播放全部
        </div>
        <div class="star-list">
          <i :class="['iconfont',{'icon-shoucang': !info.subscribed, 'icon-shoucang1': info.subscribed}]"></i>{{getSubScribed}}
        </div>
        <div class="share-list">
          <i class="iconfont icon-fenxiang"></i>{{getShared}}
        </div>
      </div>
      <div class="right-foot">
        <div class="foot-tag">{{info.tags | getTags}}</div>
        <div class="foot-des">简介：{{info.description === null ? '暂无简介' : info.description}}</div>
      </div>
    </div>                                                                                         
  </div>
</template>

<script>
import loadingGif from '../../../../assets/img/loading.gif'

export default {
  name: 'detailHead',
  props: {
    headInfo: {
      type: Object
    }
  },
  watch: {
    headInfo: {
      handler: function(n) {
        this.$nextTick(() => {
        })
      },
      // immediate: true,
      deep: true
    }
  },
  data() {
    return {
      tagTexts: ['歌单', '专辑', '精品歌单'],
      info: this.headInfo,
      update: true,
      defaultPic: loadingGif,
      uid: window.sessionStorage.getItem('user_uid')
    }
  },
  beforeUpdate() {
    setTimeout(() => {
      document.querySelector('.head-left img').src = this.defaultPic
    },100)
    setTimeout(() => {
      this.getImg()
    },300)
  },
  filters: {
    changeTime(value) {
      if(value === undefined) return
      value = new Date(value)
      let year = value.getFullYear()
      let month = (value.getMonth() + 1) < 10 ? `0${value.getMonth() + 1}` :
                  (value.getMonth() + 1)
                  // console.log(value.getDate());
      let day = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate()
      // let str = 
      value = year + '-' + month + '-' + day + '创建'
      return value
    },
    getPlaycount(item) {
      if(item === undefined) return
      let str = item.toString()
      let length = str.length
      if(length < 5) {
        return item
      }
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
    getTags(item) {
      if(item === undefined) return 
      if(item.length === 0) return '标签：暂无标签'
      let str = '标签：'
      item.forEach((n,index) => {
        if(index < item.length - 1) {
          str = str + n + '/'
        } else {
          str  = str + n
        }
      })
      return str
    }
  },
  computed: {
    getSubScribed() {
      let item = this.info.subscribedCount
      if(this.info.subscribed) {
        return `已收藏(${item})`
      } else {
        return `收藏(${item})`
      }
    },
    getShared() {
      let item = this.info.shareCount
      return `分享(${item})`
    }
  },
  methods: {
    getImg() {
      let arr = document.querySelectorAll('.detail-head img')
      arr.forEach((item, index) => {
        let newImg = new Image()
        newImg.src = index === 0 ? this.info.coverImgUrl : this.info.avatarUrl
        newImg.onerror = () => { // 图片加载错误时的替换图片
          this.picUrl = 'https://s1.ax1x.com/2020/08/26/dfEfDx.png'
        }
        newImg.onload = () => { // 图片加载成功后把地址给原来的newImg
          item.src = index === 0 ? this.info.coverImgUrl : this.info.avatarUrl
        }
      })
    }
  }
}
</script>

<style scoped>
.detail-head {
  display: flex;
  margin-top: 30px;
}
.head-left, .head-left img {
  width: 250px;
  height: 250px;
}
.head-right {
  display: flex;
  flex-direction: column;
  padding-left: 25px;
  width: 605px;
}
.right-head {
  display: flex;
  height: 35px;
  justify-content: space-between;
}
.right-head-tag {
  position: relative;
  top: -2px;
  padding: 2px 4px;
  border: 1px solid #e03f40;
  font-size: 13px;
  color: #e03f40;
  border-radius: 3px;
}
.right-head-text {
  display: inline-block;
  padding-left: 10px;
  font-size: 20px;
  height: 35px;
  line-height: 35px;
  font-weight: bold;
}
.right-head-right {
  display: flex;
  color: #999999;
}
.songs-count {
  padding-right: 8px;
  border-right: 2px solid #e1e1e2;
}
.play-count {
  padding-left: 8px;
}
.songs-count, .play-count {
  display: flex;
  flex-direction: column;
  text-align: right;

}
.head-right-default {
  font-size: 16px;
}
.head-right-count {
  font-weight: bold;
  font-size: 14px;
}
.right-creator {
  display: flex;
  margin-top: 12px;
}
.creator-name {
  display: block;
  float: right;
  height: 40px;
  padding-left: 10px;
  line-height: 40px;
  font-size: 16px;
  color: #444444;
}
.creator img {
  /* display: inline-block; */
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.creat-time {
  padding-left: 20px;
  line-height: 40px;
  color:#999999;
  font-size: 14px;
}
.right-btn {
  display: flex;
  margin-top: 20px;
}
.right-btn div {
  cursor: pointer;
  margin-right: 15px;
  height: 28px;
  border-radius: 4px;
  line-height: 25px;
  padding: 0px 10px;
  font-size: 14px;
  background: #ffffff;
  color: #000000;
  border: 1px solid #e1e1e2;
  transition: 0.2s;
}
.right-btn div i {
  position: relative;
  top: 1px;
  padding-left: 2px;
  padding-right: 8px;
}
.right-btn  .play-all {
  background: #c62f2f;
  color: #ffffff;
}
.play-all:hover {
  background: #b12323;
}
.star-list i {
  font-size: 14px;
}
.star-list:hover, .share-list:hover {
  background: #f5f5f7;
}
.right-foot {
  margin-top: 30px;
}
.foot-tag, .foot-des {
  font-size: 14px;
}
.foot-des {
  position: relative;
  margin-top: 6px;
  height: 58px;
  overflow: hidden;
}

</style>