<template>
  <div class="comments">
    <div class="comments-input-wrapper" v-show="false">
      <textarea class="comments-input"></textarea>
    </div>
    <div v-if="isFirstLoading" class="detail-loading loading"></div>
    <div class="comments-wrapper" v-else-if="!isFirstLoading">
      <div class="hot-comments" v-if="hotLength !== 0">
        <div class="hot-head">精彩评论</div>
        <div class="hot-comment comment-item" v-for="(item, index) in hot" 
          :key="index">
          <div class="comment-item-img">
            <img :src="defaultPic"/>
          </div>
          <div class="comment-right">
            <div class="comment-item-top">
              <div class="comment-item-context">
                <div class="context-comment">
                  <span class="context-name">{{item.user.nickname}}:</span>
                  {{item.content}}
                </div>
                <div :class="['context-reply', {'context-delate': item.beReplied[0].content === null}]" v-if="item.beReplied.length !== 0">
                  <span v-if="item.beReplied[0].content" class="context-name">
                    {{item.beReplied[0].user.nickname}}:
                  </span>
                  {{item.beReplied[0].content === null ? '该评论已删除' : item.beReplied[0].content}}
                </div>
              </div>
            </div>
            <div class="comment-item-bottom">
              <div class="comment-item-time">{{item.time | formatTime}}</div>
              <div class="comment-item-act">
                <div class="act-like">
                  <i class="iconfont icon-zanpress" v-if="item.liked"></i>
                  <i class="iconfont icon-zanpress-copy" v-else-if="!item.liked"></i>({{item.likedCount}})
                </div>
                <div class="act-reply">回复</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="last-comments" v-if="lastLength !== 0">
        <div class="last-head">最新评论({{total}})</div>
        <div class="last-comment comment-item" v-for="(item, index) in last" 
          :key="index">
          <div class="comment-item-img">
            <img :src="defaultPic"/>
          </div>
          <div class="comment-right">
            <div class="comment-item-top">
              <div class="comment-item-context">
                <div class="context-comment">
                  <span class="context-name">{{item.user.nickname}}:</span>
                  {{item.content}}
                </div>
                <div :class="['context-reply', {'context-delate': item.beReplied[0].content === null}]" v-if="item.beReplied.length !== 0">
                  <span v-if="item.beReplied[0].content" class="context-name">
                    {{item.beReplied[0].user.nickname}}:
                  </span>
                  {{item.beReplied[0].content === null ? '该评论已删除' : item.beReplied[0].content}}
                </div>
              </div>
            </div>
            <div class="comment-item-bottom">
              <div class="comment-item-time">{{item.time | formatTime}}</div>
              <div class="comment-item-act">
                <div class="act-like">
                  <i class="iconfont icon-zanpress" v-if="item.liked"></i>
                  <i class="iconfont icon-zanpress-copy" v-else-if="!item.liked"></i>({{item.likedCount}})
                </div>
                <div class="act-reply">回复</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="none-comments" v-else-if="hotLength === 0 && lastLength === 0">
        还没有评论~
      </div>
      <div class="comments-bottom" v-if="lastLength === total">到底了~</div>
      <div class="detail-loading bottom-loading" v-if="isLoading"></div>
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
      defaultPic: loadingGif,
      isFirstLoading: true,
      total: null
    }
  },
  props: {
    commentInfo: {
      type: Array
    },
    lastInfo: {
      type: Array
    },
    isLoading: {
      type: Boolean
    }
  },
  watch: {
    commentInfo: {
      handler: function(old, last) {
        this.hot = last[0]
        this.last = last[1].comments
        this.hotLength = this.hot.length
        this.lastLength = this.last.length
        this.total =last[1].total

        setTimeout(() => {
          this.isFirstLoading = false
        }, 300)
      },
      deep: true
    },
    lastInfo: {
      handler: function(old, last) {
        last.forEach(item => {
          this.last.push(item)
        })
        this.lastLength = this.last.length
        this.total =last[1].total
      },
      deep: true
    }
  },
  components: {
    
  },
  beforeUpdate() {
    setTimeout(() => {
      this.getImg()
    }, 400)
  },
  methods: {
    getImg() {
      this.hot.forEach((item, index) => {
        this.$utils.getImg('.hot-comment img', item.user.avatarUrl, index)
      })
      this.last.forEach((item, index) => {
        this.$utils.getImg('.last-comment img', item.user.avatarUrl, index)
      })
    }
  }
}
</script>

<style scoped>
.comments {
  width: 100%;
  /* min-height: 500px; */
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
  margin-top: 10px;
  font-size: 14px;
  padding-bottom: 4px;
  border-bottom: 2px solid #efefef; 
}
.comment-item {
  position: relative;
  display: flex;
  margin-top: 14px;

}
.last-comment {
  border-bottom: 1px solid #efefef;
}
.comment-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  padding-bottom: 10px;
}
.comment-item-top, .comment-item-bottom {
  display: flex;
}
.comment-item-top {
  font-size: 16px;
}
.comment-item-img {
  margin-left: 5px;
  margin-bottom: 10px;
}
.comment-item-img img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.context-name {
  color: #0c73c2;
}
.comment-item-context, .comment-right {
  width: 100%;
}
.context-reply {
  width: 100%;
  margin: 6px 0;
  padding: 8px 6px;
  background: #f1f1f4;
}
.comment-item-bottom {
  justify-content: space-between;
  display: flex;
  font-size: 14px;
  color: #999999;
}
.comment-item-act {
  display: flex;
}
.act-like, .act-reply {
  cursor: pointer;
  padding: 0 10px;
}
.act-like {
  position: relative;
  top: -2px;
  border-right: 1px solid #d4ccd4;
}
.loading {
  top: 50%;
  left: 50%;
}
.comments-bottom {
  width: 100%;
  text-align: center;
  font-size: 14px;
}
.bottom-loading {
  margin-top: -80px !important;
}
.context-delate {
  text-align: center;
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