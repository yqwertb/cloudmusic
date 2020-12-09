<template>
  <div class="pri-con default-content">
    <div class="default-header">
      <div class="header-left">独家放送</div>
      <div class="header-right">
        <router-link to="/home/forU" class="header-right-a">更多</router-link>
      </div>
    </div>
    <div class="pri-content">
      <div class="content-item" v-for="(item, index) in privateContent" :key="index">
        <div class="play-icon">
          <i class="iconfont icon-shexiangji"></i>
        </div>
        <router-link to="">
          <img :src="item.sPicUrl" />
        </router-link>
        <div class="item-text">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'privateCon',
  props: {
    privateContent: {
      type: Array
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.pri-content {
  display: flex;
  justify-content: space-between;
}
.content-item {
  position: relative;
}
.content-item img {
  width: 260px;
  height: 150px;
}
.item-text {
  width: 250px;
  color: #000;
  word-break: break-all;
}
.play-icon {
  position: absolute;
  top: 5px;
  left: 5px;
}
.play-icon i {
  font-size: 30px;
}
</style>