<template>
  <div class="detail-head"  v-if="update">
    <div class="head-left">
      <img :src="coverImg">
    </div>
    <div class="head-right">
      <div class="right-head">
        <div class="right-head-left">
          <span class="right-head-tag">{{tagTexts[0]}}</span>
          <span class="right-head-text">{{info.name}}</span>
        </div>
        <div class="right-head-right">
          <div class="songs-count">
            <span class="head-right-default">歌曲数</span>
            <span class="head-right-count">{{info.trackCount}}</span>
          </div>
          <div class="play-count">
            <span class="head-right-default">播放数</span>
            <span class="head-right-count">{{info.playCount}}</span>
          </div>
        </div>
      </div>
      <div class="right-creator">
        <div class="creator">
          <img :src="info.creatorImg">
          <span class="creator-name">{{info.creatorName}}</span>
        </div>
        <div class="creat-time">{{info.createTime | changeTime}}</div>
      </div>
      <div class="right-btn">
        <div class="play-all"></div>
        <div class="star-list"></div>
        <div class="share-list"></div>
      </div>
      <div class="right-foot">
        <div class="foot-tag"></div>
        <div class="foot-des"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detailHead',
  props: {
    headInfo: {
      type: Object
    }
  },
  watch: {
    headInfo: {
      handler: function(n) {
        console.log(1);
        Object.assign(this.info, n)
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      tagTexts: ['歌单', '专辑', '精品歌单'],
      info: this.headInfo,
      update: true
    }
  },
  filters: {
    changeTime(value) {
      return value
    }
  },
  computed: {
    coverImg() {
      // return this.info.coverImg
      return this.info.coverImg
    }
  }
}
</script>

<style scoped>
.detail-head {
  display: flex;
  margin-top: 30px;
}
.head-left, .head-left img {
  width: 250px;
  height: 250px;
}
.head-right {
  display: flex;
  flex-direction: column;
  padding-left: 25px;
}
.right-head {
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
}
.right-head-tag {
  padding: 2px 4px;
  border: 1px solid #e03f40;
  font-size: 13px;
  color: #e03f40;
  border-radius: 3px;
}
.right-head-text {
  display: inline-block;
  padding-left: 5px;
  font-size: 18px;
}
</style>