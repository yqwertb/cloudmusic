<template>
 <!-- @scroll="handleScroll($event)" -->
  <div class="songlist">
    <div class="songlist-head">
      <div class="head-item title">音乐标题</div>
      <div class="head-item creator">歌手</div>
      <div class="head-item album">专辑</div>
      <div class="head-item short">时长</div>
    </div>
    <div class="songlist-content" @click='contentItemClick'>
      <div class="content-item" v-for="(item, index) in trackList" :key="index" @dblclick="itemClick(item.id)">
        <div class="item item-num">{{index | getIndex}}</div>
        <div class="item item-title">{{item.name}}</div>
        <div class="item item-creator">{{item.creator[0].name}}</div>
        <div class="item item-album">{{item.album.name}}</div>
        <div class="item item-duration">{{item.duration | getDuration}}</div>
      </div>
      <div class="songlist-bottom" v-if="showedCount === allSongCount">到底了~</div>
    </div>
     <div class="detail-loading loading" v-if="isLoading"></div>
  </div>
</template>

<script>
export default {
  name: 'songList',
  data() {
    return {
      trackList: null,
      // 已经展示的数量
      showedCount: null
    }
  },
  props: {
    trackArr: {
      type: Array
    },
    allSongCount: {
      type: Number
    },
    isLoading: {
      type: Boolean
    }
  },
  watch: {
    trackArr: {
      handler: function(n) {
        this.trackList = this.trackArr
        this.showedCount = this.trackList.length
      },
      deep: true
    }
  },
  beforeDestroy() {
    this.trackList.splice(0, this.trackList.length)
  },
  filters: {
    getIndex(item) {
      let index = item + 1
      return index < 10 ? '0' + index : index
    },
    getDuration(item) {
      let date = new Date(item)
      let min = date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes()
      let sec = date.getUTCSeconds() < 10 ? `0${date.getUTCSeconds()}` : date.getUTCSeconds()
      return `${min}:${sec}`
    }
  },
  methods: {
    itemClick(id) {
      this.$emit('itemClick', id)
    },
    contentItemClick(e) {
      let path = e.path || e.composedPath()
      let contentItem = path[1]
      let contentItems = document.querySelectorAll('.content-item')
      // 设置点击的背景色
      if(contentItem.classList[0] === 'content-item') {
        contentItems.forEach(item => {
          item.classList.remove('content-item-active')
        })
        contentItem.classList.add('content-item-active')
      }
    },
  }
}
</script>

<style scoped>
.songlist {
  position: relative;
}
.songlist-head {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: #999999;
  border-bottom: 1px solid #e1e1e2;
}
.head-item:first-child {
  margin-left: 30px;
}
.head-item {
  display: inline-block;
  text-align: left;
}
.songlist-content {
}
.content-item {
  font-size: 14px;
}
.content-item:nth-child(2n) {
  background: #f5f5f7;
}
.content-item:hover, .content-item-active {
  background: #ebeced !important;
}
.item {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.item-num {
  padding-left: 13px;
}
.item-act {
  text-align: center;
}
.item-num, .item-act, .item-duration {
  color: #888888;
}
.short, .item-act, .item-duration {
  width: 50px;
}
.title, .item-title {
  padding-left: 20px;
  width: 300px;
}
.creator, .item-creator {
  width: 150px;
}
.album, .item-album {
  width: 250px;
}
.item-title, .item-creator, .item-album {
  padding-right: 10px;
}
.songlist-bottom {
  width: 100%;
  text-align: center;
  font-size: 14px;
}
.loading {
  margin-top: -80px !important;
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
</style>