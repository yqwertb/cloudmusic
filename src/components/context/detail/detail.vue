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
      handler: function() {
        // this.id = this.$route.params.id
        // this.init()
      },
      immediate: true
    }
  },
  created() {
    this.id = this.$route.params.id
    this.init()
  },
  methods: {
    init() {
      this.getPlayListDetail(this.id)
    },
    //网络请求
    getPlayListDetail(id) {
      getPlayListDetail(id).then(result => {
        let res = result.data
        Object.assign(this.headInfo, {
          coverImg: res.playlist.coverImgUrl,
          createTime: res.playlist.createTime,
          trackCount: res.playlist.trackCount,
          playCount: res.playlist.playCount,
          tags: res.playlist.tags,
          des: res.playlist.description,
          name: res.playlist.name,
          creatorImg: res.playlist.creator.avatarUrl,
          creatorName: res.playlist.creator.nickname
        })
        Object.assign(this.contentInfo, {
          tracks: res.playlist.tracks,
          commentCount: res.playlist.commentCount,
          subscribers: res.playlist.subscribers,
        })
      })
    }
  },
  beforeRouteUpdate(to, from, next) {  
    this.id = to.params.id
    next()
    this.init()
  }
}
</script>

<style scoped>
.detail-wrapper {
}
</style>