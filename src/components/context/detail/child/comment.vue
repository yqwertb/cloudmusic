<template>
  <div class="comments">
    <div class="comments-input-wrapper" v-show="false">
      <textarea class="comments-input"></textarea>
    </div>
    <div v-if="isLoading" class="detail-loading loading"></div>
    <div class="comments-wrapper" v-else-if="!isLoading">
      <div class="hot-comments" v-if="hotLength !== 0">
        <div class="hot-head">精彩评论</div>
        <div class="hot-comment" v-for="(item, index) in hot" 
          :key="index">
          {{item.time | formatTime}}
        </div>
      </div>
      <div class="last-comments" v-if="lastLength !== 0">
        <div class="last-head">最新评论</div>
        <div class="last-comment" v-for="(item, index) in last" 
          :key="index">
          <div class="comment-item-top">
            <div class="comment-item-img">
              <img :src="defaultPic"/>
            </div>

          </div>
          <div class="comment-item-bottom">
            <div class="comment-item-time">{{item.time | formatTime}}</div>
            <div class="comment-item-act">fenxiang</div>
          </div>
        </div>
      </div>
      <div class="none-comments" v-else-if="hotLength === 0 && lastLength === 0">
        还没有评论~
      </div>
    </div>
  </div>
</template>

<script>
import loadingGif from '../../../../assets/img/loading.gif'

export default {
  name: 'comment',
  data() {
    return {
      hot: null,
      last: null,
      hotLength: null,
      lastLength: null,
      isLoading: true,
      defaultPic: loadingGif,
    }
  },
  props: {
    commentInfo: {
      type: Array
    }
  },
  watch: {
    commentInfo: {
      handler: function(old, last) {
        this.hot = last[0]
        this.last = last[1]
        this.hotLength = this.hot.length
        this.lastLength = this.last.length

        setTimeout(() => {
          this.isLoading = false
        }, 300)
      },
      deep: true
    }
  },
  components: {
    
  },
  beforeUpdate() {
    setTimeout(() => {
      this.$utils.getImg('.comment-item-img', this.info.coverImgUrl, this.info.avatarUrl)
      // this.getImg(getImg)
      this.arrowShow()
    }, 400)
  }
}
</script>

<style scoped>
.comments {
  width: 100%;
  min-height: 500px;
}
.comments-input-wrapper {
  width: 100%;
  height: 130px;
  background: #f0f0f2;
  margin-top: 30px;
}
.comments-input {
  position: relative;
  top: 6%;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  height: 85px;
  font-size: 16px;
  padding: 2px 4px;
  border: none;
  box-shadow: 0 0 5px #e1e1e2;
}
.hot-head, .last-head {
  font-size: 14px;
  padding-bottom: 4px;
  border-bottom: 2px solid #efefef; 
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>