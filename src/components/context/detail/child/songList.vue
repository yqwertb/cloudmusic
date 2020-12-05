<template>
  <div class="songlist">
    <div class="songlist-head">
      <div class="head-item short">操作</div>
      <div class="head-item title">音乐标题</div>
      <div class="head-item creator">歌手</div>
      <div class="head-item album">专辑</div>
      <div class="head-item short">时长</div>
    </div>
    <div class="songlist-content">
      <div class="content-item" v-for="(item, index) in trackList" :key="index" >
        <div class="item item-num">{{index + 1}}</div>
        <!-- <div class="item item-act">❤</div> -->
        <div class="item item-title">{{item.name}}</div>
        <div class="item item-creator">{{item.creator[0].name}}</div>
        <div class="item item-album">{{item.album.name}}</div>
        <div class="item item-duration">{{item.duration | getDuration}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'songList',
  data() {
    return {
      trackList: undefined,
    }
  },
  props: {
    tracks: {
      type: Array
    }
  },
  watch: {
    tracks: {
      handler: function() {
        this.trackList = this.tracks
      }
    }
  },
  filters: {
    getDuration(item) {
      let date = new Date(item)
      let min = date.getUTCMinutes()
      let sec = date.getUTCSeconds() < 10 ? `0${date.getUTCSeconds()}` : date.getUTCSeconds()
      return `${min}:${sec}`
    }
  }
}
</script>

<style scoped>
.songlist-head {
  display: flex;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: #999999;
  border-bottom: 1px solid #e1e1e2;
}
.head-item {
  flex: 1;
}
.songlist-content {
  
}
.content-item {
  display: flex;
}
.item {
  flex: 1;
  font-size: 14px;
}
.item-title, .item-album {
  flex: 1.9 !important;
}
</style>