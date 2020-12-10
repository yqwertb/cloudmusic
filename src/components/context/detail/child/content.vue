<template>
  <div class="detail-content">
    <nav-bar @navClik="navClick">
      <nav-item @item-click="navItemClick"><div slot="nav-text">歌曲列表</div></nav-item>
      <nav-item @item-click="navItemClick"><div slot="nav-text">评论({{contentInfo.commentCount}})</div></nav-item>
      <nav-item @item-click="navItemClick"><div slot="nav-text">收藏者</div></nav-item>
    </nav-bar>
    <div class="detail-content-wrapper">
      <song-list :trackArr="trackArr" :allSongCount="allSongCount" :isLoading="isLoading" 
        v-if="contentIndex === 0" @itemClick="songItemClick"></song-list>
      <comment :commentInfo="commentInfo" :lastInfo="lastInfo" :isLoading="isLoading"
        v-else-if="contentIndex === 1"></comment>
      <collect :collectInfo="collectInfo" v-else-if="contentIndex === 2"></collect>
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
import { getSongDetail, getPlayListComment,
         getPlayListMoreComment, getSubscriber} from '@/network/detail.js'

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
      getCommentNum: 0,
      // 已经显示de评论
      getCommentCount: 20,
      listId: null,
      // 音乐id的数组
      tracksId: null,
      // 可以显示的音乐数据的数组
      trackArr: null,
      // 滚动后新加的可显示音乐数据
      newTrackArr: null,
      // 全部音乐的数量
      allSongCount: null,
      allCommentCount: null,
      // 是否加载更多歌曲
      isLoading: false,
      commentInfo: [],
      lastInfo: [],
      collectInfo: [],
      
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
          this.listId = this.contentInfo.listId
          this.init()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.$EventBus.$on('getMore', this.handlerScroll)
  },
  beforeUpdate() {
  },
  methods: {
    init() {
      this.infoUpdated()
      this.infoAssign()
      this.allSongCount = this.tracksId.length
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
          if(this.contentIndex !== 1) {
            this.contentIndex = 1
            this.getPlayListComment(this.listId)
          }
          break
        case this.textList[2]:
          this.contentIndex = 2
          this.getSubscriber(this.listId)
          break
      }
    },
    navItemClick(e) {
      // console.log(e);
    },
    handlerScroll() {
      let newArr = []
      let timer = undefined
      let allArr = []

      switch (this.contentIndex) {
        case 0:
          newArr = this.getMoreSong()
          break;
        case 1:
          newArr = this.getMoreComment()
          // console.log(this.getMoreComment());
          break;
        case 2:
          // newArr.forEach(item => {
          //   this.trackArr.push(item)
          // })
          break;
      }
      
      timer = setInterval(() => {
        if(newArr === false) return

        if(newArr.length !== 0) {
          switch (this.contentIndex) {
            case 0:
              newArr.forEach(item => {
                this.trackArr.push(item)
              })
              break;
            case 1:
              this.lastInfo.splice(0, this.lastInfo.length)
              newArr.forEach(item => {
                this.lastInfo.push(item)
              })
              this.getCommentCount = this.getCommentCount + this.lastInfo.length
              break;
            case 2:
              // newArr.forEach(item => {
              //   this.trackArr.push(item)
              // })
              break;
          }
          clearInterval(timer)
          setTimeout(() => {
            this.isLoading = false
          }, 500)
        }
      }, 100)
      setTimeout(() => {
        if(newArr.length === 0) {
          // alert('加载失败')
          this.isLoading = false
        }
      }, 3000)
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
    },
    getSubscriber(id, limit, offset) {
      this.collectInfo.splice(0, this.collectInfo.length)
      limit = 20
      offset = 0
      getSubscriber(id, limit, offset).then( result => {
        let res = result.data
        if(res.total === 0) {
          this.collectInfo.splice(0, this.collectInfo.length)
        }
        let sub = res.subscribers
        let obj = {}
        sub.forEach((item, index) => {
          obj = {
            nickname: item.nickname,
            avatarUrl: item.avatarUrl
          }
          this.$set(this.collectInfo, index, obj)
        })
      })
    },
    getPlayListComment(id) {
      getPlayListComment(id).then( result => {
        let res = result.data
        let obj = {
          comments: res.comments,
          total: res.total
        }
        this.allCommentCount = res.total
        this.$set(this.commentInfo, '0', res.hotComments)
        this.$set(this.commentInfo, '1', obj)
      })
    },
    getPlayListMoreComment(id, limit, offset) {
      let arr = []
      getPlayListMoreComment(id, limit, offset).then( result => {
        let res = result.data.comments
        res.forEach(item => {
          arr.push(item)
        })
      })
      return arr
    },
    getMoreSong() {
      this.newTrackArr = null
      let frontNum = this.trackArr.length
      let newArr = []
      if(this.allSongCount === frontNum) return false

      this.isLoading = true
      let behindNum = this.allSongCount - frontNum < 30 ? 
                      this.allSongCount - frontNum : 30 

      newArr = this.getSongDetail(this.tracksId.slice(frontNum, frontNum + behindNum))
      
      return newArr
    },
    getMoreComment() {

      let frontNum = this.getCommentCount
      console.log(this.allCommentCount);
      console.log(frontNum);
      if(this.allCommentCount === frontNum) return false

      this.isLoading = true
      this.getCommentNum = this.getCommentNum + 1
      let offset = this.getCommentNum * 20
      let limit = this.allCommentCount - frontNum < 20 ?                                                          this.allCommentCount - frontNum : 20

      let id = this.listId
      let newArr = []

      newArr =  this.getPlayListMoreComment(id, limit, offset)
      return newArr
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