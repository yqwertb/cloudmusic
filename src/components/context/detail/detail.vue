<template>
  <div class="detail-wrapper page">
    <detail-head :headInfo="headInfo"></detail-head>
    <detail-content :contentInfo="contentInfo"></detail-content>
  </div>
</template>

<script>
import detailHead from './child/head.vue'
import detailContent from './child/content.vue'

import { getPlayListDetail, getPlayListComment, getSubscriber } from '@/network/detail.js'


export default {
  name: 'detail',
  components: {
    detailHead,
    detailContent
  },
  data() {
    return {
      id: undefined,
      headInfo: {},
      contentInfo: {},
      trackIds: [],
      emitCount: 0,
      initTop: 0,
    }
  },
  watch: {
    '$route': {
      handler: function(to, from) {
        this.id = to.params.id
        this.init()
      },
      immediate: true
      // deep: true
    }
  },
  mounted() {
    window.addEventListener('scroll', this.$utils.throttle(this.handlerScroll, 300), true)
  },
  beforeUpdate() {
    this.emitCount = 0
  },
  methods: {
    handlerScroll(e) {
      let restHeight = e.target.scrollHeight - e.target.offsetHeight
      let scroll = e.target.scrollTop - this.initTop
      this.initTop = e.target.scrollTop
      if(e.target.scrollTop + 50 > restHeight && scroll > 0) {
        console.log('send');
        this.$EventBus.$emit('getMoreSong')
      }
    },
    init() {
      this.getPlayListDetail(this.id)
      this.$delete(this.contentInfo, 'tracks')
    },
    //网络请求
    getPlayListDetail(id) {
      let timestamp = new Date().getTime()
      getPlayListDetail(id, timestamp).then(result => {
        let res = result.data
        let tagHead = ['coverImgUrl', 'createTime', 'trackCount',
                  'playCount', 'tags', 'description', 'name', 'subscribed',
                  'subscribedCount', 'shareCount','avatarUrl', 'nickname', 'userId']
        let tagContent = ['tracks', 'commentCount',]
        let trackItems = []
        for(let n = 0; n < tagHead.length; n++) {
          if(n > tagHead.length - 4) {
            this.$set(this.headInfo, tagHead[n], res.playlist.creator[tagHead[n]])
          } else {
            this.$set(this.headInfo, tagHead[n], res.playlist[tagHead[n]])    
          }
        }
        // 设置内容数据
        this.trackIds.splice(0, this.trackIds.length)
        trackItems = res.playlist['trackIds']
        for(let n = 0; n < trackItems.length; n++) {
          this.trackIds.push(trackItems[n].id)
        }
        this.$set(this.contentInfo, 'trackIds', this.trackIds)
        this.$set(this.contentInfo, 'listId', this.id)
        this.$set(this.contentInfo, 'commentCount', res.playlist['commentCount'])
      })
    },

  },
}
</script>

<style>
.detail-wrapper {
}
.detail-loading {
  margin: 0 auto;
  z-index: 9;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 5px solid #ffffff;
  border-top: 5px solid red;
  border-bottom: 5px solid blue;
  -webkit-animation: spin 0.5s linear infinite;
  animation: spin 0.5s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>