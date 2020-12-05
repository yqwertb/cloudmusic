<template>
  <div class="detail-content">
    <nav-bar>
      <nav-item @itemClik="navClick"><div slot="nav-text">歌曲列表</div></nav-item>
      <nav-item @itemClik="navClick"><div slot="nav-text">评论({{contentInfo.commentCount}})</div></nav-item>
      <nav-item @itemClik="navClick"><div slot="nav-text">收藏者</div></nav-item>
    </nav-bar>
    <div class="detail-content-wrapper">
      <song-list :tracks="tracks" v-if="contentIndex === 0"></song-list>
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
      commentCount: '-',
      tracks: null,
      commentInfo: {},
      collectInfo: {}
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
        if(Object.getOwnPropertyDescriptor(this.contentInfo, 'tracks')) {
          this.init()
        }
      },
      deep: true
    }
  },
  methods: {
    init() {
      this.infoUpdated()
      this.infoAssign()
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
      this.tracks = this.contentInfo.tracks
      document.querySelector('.bottom-line').style.left = 0 + 'px'
    },
    infoAssign() {
      console.log(this.contentInfo);
    },
    navClick(e) {
      let targetText = e.target.innerHTML
      switch (targetText) {
        case this.textList[0]:
          this.contentIndex = 0
          break
        case this.textList[1]:
          this.contentIndex = 1
          break
        case this.textList[2]:
          this.contentIndex = 2
          break
      }
    }
  }

}
</script>

<style scoped>
.detail-content {
  margin-top: 14px;
}
</style>