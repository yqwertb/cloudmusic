<template>
  <div class="new-songs default-content">
    <div class="default-header">
      <div class="header-left">最新音乐</div>
        <div class="header-right">
          <router-link to="/home/forU" class="header-right-a">更多</router-link>
        </div>
    </div>
    <div class="newsongs-content">
      <div class="content-left">
        <div class="content-item" v-for="(item, index) in newSongs.slice(0,5)" :key="index">
          <div class="song-item-num">{{index | indexChange}}</div>
          <div class="song-item-content">
            <router-link to="./">
              <div class="song-item-img">
                <img :src="url">
                <div class="play-icon">
                  <i class="iconfont icon-bofang"></i>
                </div>
              </div>  
            </router-link>
            <div class="song-item-text">
              <div class="text-up">
                {{item.name}}<span class="up-alias" v-if="!(item.alias.length === 0)">（{{item.alias[0]}}）</span>
              </div>
              <div class="text-down">
                {{item.artists | artistsChange}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="content-item" v-for="(item, index) in newSongs.slice(5,10)" :key="index">
          <div class="song-item-num">{{index+5 | indexChange}}</div>
          <div class="song-item-content">
            <router-link to="./">
              <div class="song-item-img">
                <img :src="url">
                <div class="play-icon">
                  <i class="iconfont icon-bofang"></i>
                </div>
              </div>  
            </router-link>
            <div class="song-item-text">
              <div class="text-up">
                {{item.name}}<span class="up-alias" v-if="!(item.alias.length === 0)">（{{item.alias[0]}}）</span>
              </div>
              <div class="text-down">
                {{item.artists | artistsChange}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loadingGif from '../../../../../assets/img/loading.gif'

export default {
  name: 'newSongs',
  props: {
    newSongs: {
      type: Array
    }
  },
  watch: {
    newSongs: {
      handler: function() {
        this.$nextTick(() => {
          this.getImg()
        })
      }
    }
  },
  data() {
    return {
      url: loadingGif
    }
  },
  filters: {
    indexChange(value) {
      if(value !== 9) {
        value = value + 1
        return `0${value}`
      } else {
        return 10
      }
    },
    artistsChange(value) {
      let len = value.length
      let artists = ''
      if(len !== 1) {
        value.forEach((item, index) => {
          artists = index === (len - 1) 
            ? artists.concat(`${item.name}`) : artists.concat(`${item.name}/`)
        })
      } else {
        artists = value[0].name
      }
      return artists
    }
  },
  methods: {
    getImg() {
      let arr = document.querySelectorAll('.song-item-img img')
      this.newSongs.forEach((item, index) => {
        let reg = /^(http)/i
        let newImg = new Image()
        let url = item.picUrl.replace(reg, "https")
        newImg.src = url + '?param=45y45'
        
        newImg.onerror = () => { // 图片加载错误时的替换图片
          this.picUrl = 'https://s1.ax1x.com/2020/08/26/dfEfDx.png'
        }
        newImg.onload = () => { // 图片加载成功后把地址给原来的newImg
          // console.log(item.imageUrl.match(reg));
          arr[index].src = newImg.src
        }        
      })
    }
  }
}
</script>

<style scoped>
.newsongs-content {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  border: 1px solid #ededed;
}
.content-left {
  border-right: 1px solid #ededed;
}
.content-left, .content-right {
  width: 50%;
}
.content-item, .song-item-content {
  display: flex;
  justify-content: flex-start;
}
.content-item:hover {
  background-color: #ebeced !important;
}
.content-item:nth-child(2n) {
  background-color: #f5f5f7;
}
.song-item-content {
  margin: 10px 0;
  height: 45px;
}
.song-item-num {
  width: 40px;
  line-height: 65px;
  text-align: center;
  color: #b099a4;
  font-size: 14px;
}
.song-item-img img {
  width: 45px;
  height: 45px;
}
.song-item-img {
  height: 45px;
  position: relative;
}
.play-icon {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.icon-bofang {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
}
.song-item-text {
  width: 334.5px;
  margin-left: 10px;
  padding: 2px 0;
  font-size: 15px;
  color: #000;
}
.text-up {
  padding-bottom: 8px;
}
.text-down {
  color: #8894b1;
}
.text-up, .text-down {
  width: 100%;
  padding-right: 10px;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.up-alias {
  padding-left: 5px;
  color: #8894b1;
}
</style>