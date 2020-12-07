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
    // window.addEventListener('scroll', this.handlerScroll, true)
     window.addEventListener('scroll', this.throttle(this.handlerScroll, 500), true)
  },
  beforeUpdate() {
    this.emitCount = 0
  },
  methods: {
    throttle(func, wait) {
      var timeout, context, args, result;
      var previous = 0;

      var later = function() {
          previous = +new Date();
          timeout = null;
          func.apply(context, args)
      };

      var throttled = function() {
          var now = +new Date();
          //下次触发 func 剩余的时间
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          // 如果没有剩余的时间了或者你改了系统时间
          if (remaining <= 0 || remaining > wait) {
              if (timeout) {
                  clearTimeout(timeout);
                  timeout = null;
              }
              previous = now;
              func.apply(context, args);
          } else if (!timeout) {
              timeout = setTimeout(later, remaining);
          }
      };
      return throttled;
    },
    handlerScroll(e) {
      let restHeight = e.target.scrollHeight - e.target.offsetHeight
      if(e.target.scrollTop + 50 > restHeight) {
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
        this.$set(this.contentInfo, 'commentCount', res.playlist['commentCount'])
      })
    },

  },
}
</script>

<style scoped>
.detail-wrapper {
}
</style>