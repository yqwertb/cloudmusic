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
        <!-- <div class="play-pause item"><i class="iconfont icon-zanting"></i></div> -->
        <div class="play-pause item" @click="controlPlay"><i class="iconfont icon-bofang_bg"></i></div> 
        <div class="next-song item"><i class="iconfont icon-xiayishou"></i></div>
      </div>
      <div class="bar-center">
        <div class="time">00:00</div>
        <div class="progress-bar" @click="changeTime">
          <div class="progress" style="width: 0px"></div>
          <div class="progress-btn" style="transform: translateX(0px)"></div>
        </div>
        <div class="time">{{songInfo !== null ? songInfo.duration : 0| getDuration}}</div>
      </div>
      <div class="bar-right">
        <div class="volume-wrapper">
          <div class="volume-control" @click="changeVolume">
            <i class="iconfont icon-Volume-"></i>
          </div>
          <div class="volume-bar">
            <div class="volume" style="width: 60px"></div>
            <div class="volume-btn" style="transform: translateX(60px)"></div>
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
import { checkSong, getSongURL} from '@/network/songs.js'

export default {
  name: 'player',
  data() {
    return {
      defaultPic: loadingGif,
      // audio的dom
      myAudio: null,
      songInfo: null,
      timeFirst: null,
      // progressWidth: 500,
      progressWidth: 484,
      volumeWidth: 100,
      progress: null,
      progressBtn: null,
      volume: null,
      volumeBtn: null,
      volumeControl: null,
      creator: '',
      songName: '',
      timer: null,
      // 检查歌曲情况
      checked: null,
    }
  },
  props: {

  },
  watch: {

  },
  mounted() {
    this.$EventBus.$on('playSongs', this.getInfo)
    this.init()
  },
  computed: {
  },
  beforeUpdate() {
  },
  updated() {
  },
  methods: {
    init() {
      this.myAudio = document.querySelector('#myAudio')
      this.timeFirst = document.querySelectorAll('.time')[0]
      this.progress = document.querySelector('.progress')
      this.progressBtn = document.querySelector('.progress-btn')
      this.volume = document.querySelector('.volume')
      this.volumeBtn = document.querySelector('.volume-btn')
      this.volumeControl = document.querySelector('.volume-control i')
    },
    reInit() {
      this.timeFirst.innerHTML = '00:00'
      this.progress.style.width = 0
      this.progressBtn.style.transform = `translateX(0)`
    },
    getInfo(item) {
      console.log(item);
      this.songInfo = item
      this.checkSong(item.id)
      // this.getSongURL(item.id)
      this.$utils.getImg('.song-img img', this.songInfo.album.picUrl)
      this.getData(this.songInfo.creator, this.songInfo.name)
      let timer = setInterval(() => {
        if(this.songInfo.url) {
          this.start()
          clearInterval(timer)
        } 
        if(this.checked === 'false') {
          clearInterval(timer)
        }
      })
      
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
    },
    start() {
      this.myAudio.src = this.songInfo.url
      this.myAudio.load()
      this.myAudio.play()
      this.myAudio.volume = 0.6
      this.controlProgress(true, true)
      document.querySelector('.play-pause i').classList.add('icon-zanting1_bg')
      document.querySelector('.small-player').classList.add('small-player-active')
    },
    end() {
      this.myAudio.src = null
    },
    controlPlay() {
      if(this.myAudio.src === '') return
      if(this.myAudio.paused) {
        this.myAudio.play()
        this.controlProgress(true, false)
        document.querySelector('.play-pause i').classList.remove('icon-bofang_bg')
        document.querySelector('.play-pause i').classList.add('icon-zanting1_bg')
      } else {
        this.controlProgress(false, false)
        this.myAudio.pause()
        document.querySelector('.play-pause i').classList.add('icon-bofang_bg')
        document.querySelector('.play-pause i').classList.remove('icon-zanting1_bg')
      }
    },
    controlProgress(flag, ifNew) {
      if(this.myAudio.src === '') return
      let date = new Date(this.songInfo.duration)
      let fullDuration = date.getTime() / 1000
      if(ifNew) {
        clearInterval(this.timer)
        this.reInit()
      }
      this.timer = setInterval(() => {
        let newWidth = (this.myAudio.currentTime / fullDuration) * this.progressWidth
        let newDate = this.$utils.getDuration(this.myAudio.currentTime * 1000)
        this.timeFirst.innerHTML = newDate
        this.progress.style.width = newWidth + 'px'
        this.progressBtn.style.transform = `translateX(${newWidth}px)`
        if(!flag) {
          clearInterval(this.timer)
        }
      }, 1000)
    },
    changeTime(e) {
      if(this.myAudio.src === '') return
      let date = new Date(this.songInfo.duration)
      let fullDuration = date.getTime() / 1000
      let ele = null
      if(e.target.className !== 'progress-bar') {
        ele = e.path[1]
      } else {
        ele = e.target
      }
      let newWidth = e.x - ele.offsetLeft - 50
      let newDura = (newWidth / this.progressWidth) * fullDuration
      let newDate = this.$utils.getDuration(newDura)

      this.timeFirst.innerHTML = newDate
      this.progress.style.width = newWidth + 'px'
      this.progressBtn.style.transform = `translateX(${newWidth}px)`
      this.myAudio.currentTime = newDura 
    },
    changeVolume() {
      if( this.myAudio.volume === 0) {
         this.myAudio.volume = 0.6
         this.volumeControl.classList.remove('icon-Volume-Mute')
         this.volumeControl.classList.add('icon-Volume-')
      } else {
         this.myAudio.volume = 0
         this.volumeControl.classList.remove('icon-Volume-')
         this.volumeControl.classList.add('icon-Volume-Mute')
      }
    },
    tmp() {
      this.myAudio.src = this.songInfo[0].url
      this.myAudio.load()
      this.myAudio.play()
      this.myAudio.pause()
      this.myAudio.volume = 0.5
      console.log();      
    },
    checkSong(id) {
      let msg = ''
      if(this.myAudio.src) {
        this.end()
      }
      checkSong(id).then( result => {
        if(result.message === 'ok') {
          this.getSongURL(id)
          this.checked = true
        } else {
          this.checked = false
          alert(result.message)
        }
        msg = result.message
      })
      return msg
    },
    getSongURL(id) {
      getSongURL(id).then( result => {
        let res = result.data.data
        this.$set(this.songInfo, 'url', res[0].url)
      })    
    },
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
  /* background: #e83c3c; */
}
.bar-left .item i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* color: #ffffff; */
  font-size: 30px;
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
  margin-right: 16px;
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
.volume-control {
  cursor: pointer;
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