<template>
  <div class="detail-wrapper page">
    <detail-head :headInfo="headInfo"></detail-head>
    <detail-content :contentInfo="contentInfo"></detail-content>
  </div>
</template>

<script>
import detailHead from './child/head.vue'
import detailContent from './child/content.vue'

import {getPlayListDetail} from '@/network/detail.js'

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
    }
  },
  watch: {
    '$route': {
      handler: function(to, from) {
        this.id = to.params.id
        this.init()
      },
      immediate: true
    }
  },
  methods: {
    init() {
      this.getPlayListDetail(this.id)
    },
    //网络请求
    getPlayListDetail(id) {
      getPlayListDetail(id).then(result => {
        let res = result.data
        let tag1 = ['coverImgUrl', 'createTime', 'trackCount',
                  'playCount', 'tags', 'description', 'name', 'subscribed',
                  'subscribedCount', 'shareCount','avatarUrl', 'nickname', 'userId']
        let tag2 = ['tracks', 'commentCount', 'subscribers']
        for(let n = 0; n < tag1.length; n++) {
          if(n > tag1.length - 4) {
            this.$set(this.headInfo, tag1[n], res.playlist.creator[tag1[n]])
          } else {
            this.$set(this.headInfo, tag1[n], res.playlist[tag1[n]])    
          }
        }
        for(let n = 0; n < tag2.length ; n++) {
          this.$set(this.contentInfo, tag2[n], res.playlist[tag2[n]])
        }
      })
    }
  },
}
</script>

<style scoped>
.detail-wrapper {
}
</style>