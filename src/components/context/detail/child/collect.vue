<template>
  <div class="collect">
    <div v-if="isFirstLoading" class="detail-loading first-loading"></div>
    <div class="collect-wrapper" v-else-if="!isFirstLoading">
      <div class="none-collect" v-if="!hasSub">你这烂歌单莫人收藏</div>
      <div class="collect-item" v-else v-for="(item, index) in collectInfo" :key="index">
        <div class="collect-img">
          <img :src="defaultPic"/>
        </div>
        <div class="collect-name">{{item.nickname}}</div>
      </div>      
    </div>
    <!-- <pagination :allCount="6000" :showCount="20"></pagination> -->
  </div>
</template>

<script>
import loadingGif from '../../../../assets/img/loading.gif'
import pagination from '@/components/common/pagination/pagination.vue'

export default {
  name: 'collect',
  data() {
    return {
      defaultPic: loadingGif,
      hasSub: null,
      isFirstLoading: true,
    }
  },
  props: {
    collectInfo: {
      type: Array
    }
  },
  watch: {
    collectInfo: {
      handler: function(old, last) {
        if(this.collectInfo.length === 0) {
          this.hasSub = false
        } else {
          this.hasSub = true
        }
        setTimeout(() => {
          this.isFirstLoading = false
        }, 300)
      },
      deep: true,
      immediate: true
    },
  },
  components: {
    pagination
  },
  beforeUpdate() {
    setTimeout(() => {
      if(!this.hasSub) return
      this.getImg()
    }, 500)
  },
  methods: {
    getImg() {
      this.collectInfo.forEach((item, index) => {
        this.$utils.getImg('.collect-img img', item.avatarUrl, index)
      })
    }
  }
}
</script>

<style scoped>
.first-loading {
  margin-top: 10px !important;
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
.collect {
  width: 100%;
}
.collect-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.collect-item {
  width: 200px;
  margin: 20px auto 10px;
}
.collect-img {
  width: 100px;
  height: 100px;
  margin: 0 auto;
}
.collect-img img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.collect-name {
  width: 120px;
  margin: 15px auto 0;
  text-align: center;
  font-size: 14px;
  color: #666666;
  overflow:hidden;
  text-overflow:ellipsis; 
  white-space:nowrap; 
}
.none-collect {
  margin-top: 40px;
  width: 100%;
  text-align: center;
}
</style>