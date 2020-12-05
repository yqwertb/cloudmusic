<template>
  <div class="detail-wrapper page">
    <detail-head :headInfo="headInfo"></detail-head>
    <detail-content :contentInfo="contentInfo"></detail-content>
  </div>
</template>

<script>
import detailHead from './child/head.vue'
import detailContent from './child/content.vue'

import { getPlayListDetail, getSongDetail,
        getPlayListComment, getSubscriber } from '@/network/detail.js'
import { checkSong, getSongURL} from '@/network/songs.js'

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
  methods: {
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
        this.getSongDetail(this.trackIds)
        this.$set(this.contentInfo, 'commentCount', res.playlist['commentCount'])
      })
    },
    getSongDetail(idArr) {
      let ids = idArr.toString()

      getSongDetail(ids).then( result => {
        let res = result.data
        let songsArr = res.songs
        let songItem = {}
        let tracks = []
        songsArr.forEach((item, index) => {
          songItem = {
            id: item.id,
            name: item.name,
            album: {
              id: item.al.id,
              name: item.al.name,
            },
            creator: item.ar,
            duration: item.dt
          }
          tracks.push(songItem)
        })
        this.$set(this.contentInfo, 'tracks', tracks)
      })
    }
  },
}
</script>

<style scoped>
.detail-wrapper {
}
</style>