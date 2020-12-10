<template>
  <div class="player">
    <div class="small-player">
      <div class="song-img">
        <img :src="defaultPic"/>
      </div>
      <div class="song-info">
        <div class="info-name">{{songName}}</div>
        <div class="info-creator">{{creator}}</div>
      </div>
    </div>
    <div class="player-bar">
      <audio id="myAudio"></audio>
      <div class="bar-left">
        <div class="last-song item"><i class="iconfont icon-shangyishou"></i></div>
        <div class="play-pause item"><i class="iconfont icon-zanting"></i></div>
        <div class="next-song item"><i class="iconfont icon-xiayishou"></i></div>
      </div>
      <div class="bar-center">
        <div class="time">00:00</div>
        <div class="progress-bar">
          <div class="progress" style="width: 60px"></div>
          <div class="progress-btn" style="transform: translateX(50px)"></div>
        </div>
        <div class="time">99:99</div>
      </div>
      <div class="bar-right">
        <div class="volume-wrapper">
          <i class="iconfont icon-Volume-"></i>
          <div class="volume-bar">
            <div class="volume" style="width: 10px"></div>
            <div class="volume-btn" style="transform: translateX(10px)"></div>
          </div>
        </div>
        <div class="play-mode item"><i class="iconfont icon-1_music84"></i></div>
        <div class="playlist item"><i class="iconfont icon-caidan"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import loadingGif from '@/assets/img/loading.gif'

export default {
  name: 'player',
  data() {
    return {
      defaultPic: loadingGif,
      songInfo: null,
      creator: '',
      songName: ''
    }
  },
  props: {
    songId: {
      type: String
    }
  },
  watch: {

  },
  mounted() {
    this.$EventBus.$on('playSongs', this.getInfo)
  },
  computed: {
  },
  methods: {
    getInfo(item) {
      this.songInfo = item
      this.$utils.getImg('.song-img img', this.songInfo[0].album.picUrl)
      this.getData(this.songInfo[0].creator, this.songInfo[0].name)
      document.querySelector('.small-player').classList.add('small-player-active')
    },
    getData(items, name) {
      let len = items.length
      let str = ''
      if(len > 1) {
        items.forEach((item, index) => {
          if(index + 1 === len) {
            str = str + item.name
          } else {
            str = str + item.name + '/' 
          }
          
        })
      } else {
        str = items[0].name
      }
      this.songName = name
      this.creator = str
    }
  }
}
</script>

<style scoped>
.player {
  position: absolute;
  bottom: 0px;
  height: 50px;
  width: 100%;
}
.small-player {
  display: flex;
  position: absolute;
  bottom: 53px;
  left: 0;
  width: 240px;
  height: 60px;
  background-color: #f5f5f7;
  z-index: 99;
  opacity: 0;
  transition: 0.5s;
  box-shadow: 0 0 5px #e1e1e2;
}
.small-player-active {
  opacity: 1;
}
.song-img {
  width: 25%;
  height: 60px;
  padding-left: 10px;
}
.song-img img {
  width: 50px;
  height: 50px;
  margin: 5px 0;
}
.song-info {
  height: 60px;
  width: 75%;
  font-size: 14px;
  padding-left: 10px;
}
.info-name, .info-creator {
  overflow:hidden;
  text-overflow:ellipsis; 
  white-space:nowrap; 
}
.info-name {
  padding-top: 8px;
  color: #333333;
}
.info-creator {
  padding-top: 10px;
  color: #666666;
}
.player-bar {
  display: flex;
  height: 50px;
  background-color:#f6f6f8;
  box-shadow: 0 -3px 3px #e1e1e2;
}
.bar-left {
  display: flex;
  width: 250px;
  margin-left: 50px;
}
.bar-left .item {
  cursor: pointer;
  position: relative;
  width: 44px;
  height: 44px;
  margin: 2px 14px;
  border-radius: 50%;
  background: #e83c3c;
}
.bar-left .item i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* color: #ffffff; */
  font-size: 26px;
}

.bar-center {
  display: flex;
  height: 100%;
  width: 600px;
  line-height: 50px;
  margin-left: 40px;
}

.bar-center .time {
  font-size: 16px;
  line-height: 50px;
}
.progress-bar {
  position: relative;
  cursor: pointer;
  width: 500px;
  height: 6px;
  background: #c2c2c4;
  border-radius: 6px;
  margin: 22px 8px;
}
.progress, .volume {
  height: 100%;
  background: #e83c3c;
}
.progress-btn, .volume-btn {
  position: absolute;
  top: -3px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 4px solid #ffffff;
  background: #e83c3c;
}

.bar-right {
  display: flex;
  width: 300px;
  height: 100%;
  line-height: 50px;
  margin-left: 60px;
}
.bar-right .item {
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin: 1px 10px;

}
.bar-right .item i {
  font-size: 20px;
}
.volume-wrapper {
  display: flex;
  height: 100%;
}
.volume-bar {
  position: relative;
  cursor: pointer;
  width: 100px;
  height: 6px;
  background:#c2c2c4;
  border-radius: 6px;
  margin: 22px 8px;
}


</style>