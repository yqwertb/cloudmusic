<template>
  <div class="detail-content">
    <nav-bar @navClik="navClick">
      <nav-item @item-click="navItemClick"><div slot="nav-text">歌曲列表</div></nav-item>
      <nav-item @item-click="navItemClick"><div slot="nav-text">评论({{contentInfo.commentCount}})</div></nav-item>
      <nav-item @item-click="navItemClick"><div slot="nav-text">收藏者</div></nav-item>
    </nav-bar>
    <div class="detail-content-wrapper">
      <song-list :trackArr="trackArr" :allCount="allCount" @pushNewSongs="pushNewSongs"
        v-if="contentIndex === 0" @itemClick="songItemClick"></song-list>
      <comment v-else-if="contentIndex === 1"></comment>
      <collect v-else-if="contentIndex === 2"></collect>
    </div>
  </div>
</template>

<script>
import NavBar from '../../../common/navbar/navBar.vue'
import NavItem from '../../../common/navbar/navItem.vue'
import SongList from './songList.vue'
import Comment from './comment.vue'
import collect from './collect.vue'

import { checkSong, getSongURL} from '@/network/songs.js'
import { getSongDetail} from '@/network/detail.js'

export default {
  name: 'detailContent',
  props: {
    contentInfo: {
      type: Object
    }
  },
  data() {
    return {
      contentIndex: 0,
      textList: ['歌曲列表', '评论', '收藏者'],
      tracksId: null,
      trackArr: null,
      // 滚动后新加的
      newTrackArr: null,
      // 全部音乐的数量
      allCount: null,
      commentInfo: {},
      collectInfo: {},
    }
  },
  components: {
    NavBar,
    NavItem,
    SongList,
    Comment,
    collect
  },
  watch: {
    contentInfo: {
      handler: function() {
        if(Object.getOwnPropertyDescriptor(this.contentInfo, 'trackIds')) {
          this.tracksId = this.contentInfo.trackIds
          this.init()
        }
      },
      deep: true
    }
  },
  beforeUpdate() {
    this.emitCount = 0
  },
  methods: {
    init() {
      this.infoUpdated()
      this.infoAssign()
      this.allCount = this.tracksId.length
      this.trackArr = this.getSongDetail(this.tracksId.slice(0, 30))
    },
    infoUpdated() {
      let eles = document.querySelectorAll('.nav-item')
      eles.forEach((item, index) => {
        if(index === 0) 
          item.classList.add('active')
        else
          item.classList.remove('active')
      })
      this.contentIndex = 0
      this.commentCount = this.contentInfo.commentCount
      document.querySelector('.bottom-line').style.left = 0 + 'px'
    },
    infoAssign() {

    },
    navClick(e) {
      let path = e.path || e.composedPath()
      let target = path[0]
      let targetText = target.innerHTML
      let reg = /^评论/
      this.textList[1] = targetText.match(reg) ? targetText.match(reg).input : null

      switch (targetText) {
        case this.textList[0]:
          this.contentIndex = 0
          this.trackArr.splice(0, this.trackArr.length)
          this.trackArr = this.getSongDetail(this.tracksId.slice(0, 30))
          break
        case this.textList[1]:
          this.contentIndex = 1
          break
        case this.textList[2]:
          this.contentIndex = 2
          break
      }
    },
    navItemClick(e) {
      // console.log(e);
    },
    pushNewSongs(number) {
      this.newTrackArr = null
      let frontNum = number
      let behindNum = this.allCount - frontNum < 30 ? 
                      this.allCount - frontNum : 30 
      let newArr = []
      newArr = this.getSongDetail(this.tracksId.slice(frontNum, frontNum + behindNum))
      let timer = setInterval(() => {
        if(newArr.length !== 0) {
          newArr.forEach(item => {
            this.trackArr.push(item)
          })
          clearInterval(timer)
        }
      }, 100)
    
      // console.log(this.emitCount);
    },
    songItemClick(id) {
      this.getSongURL(id)
    },
    getSongDetail(idArr) {
      let ids = idArr.toString()
      let tracks = []

      getSongDetail(ids).then( result => {
        let res = result.data
        let songsArr = res.songs
        let songItem = {}
        songsArr.forEach((item, index) => {
          songItem = {
            id: item.id,
            name: item.name,
            album: {
              id: item.al.id,
              name: item.al.name,
            },
            creator: item.ar,
            duration: item.dt,
            mv: item.mv
          }
          tracks.push(songItem)
        })
      })
      
      return tracks
    },
    getSongURL(ids) {
      getSongURL(ids).then( result => {
        let res = result.data.data[0]
        let audio = document.querySelector('#myAudio')
        audio.setAttribute('src', res.url)
        audio.load()
        audio.play()
      })
    }
  }

}
</script>

<style scoped>
.detail-content {
  margin-top: 14px;
}
.detail-content-wrapper {
  position: relative;
}
</style>