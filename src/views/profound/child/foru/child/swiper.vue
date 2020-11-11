<template>
  <swiper-wrapper class="page-swiper" ref="swiper"
    :slideCount="banners.length" :slideItems="swiperItems">
    <swiper-item v-for="(item, index) in banners"
      :key="index" :index="index" @itemLoad="itemLoad"
      :bannersLen="banners.length" >
      <img :src="item.imageUrl" slot="item-img">
      <span slot="item-span" class="item-title">{{item.typeTitle}}</span>
    </swiper-item>
  </swiper-wrapper>
</template>

<script>
import {swiperWrapper, swiperItem} from '@/components/common/swiper/index.js'

export default {
  name: 'swiper',
  components: {
    swiperWrapper,
    swiperItem
  },
  props: {
    banners: {
      type: Array
    }
  },
  data() {
    return {
      swiperItems: [], //dom数组
      num: 0 //图片加载的个数
    }
  },
  methods: {
    itemLoad() {
      this.num ++
      if(this.num === this.banners.length) {
        this.banners.forEach((item, index) =>{
          this.$set(this.swiperItems, index, document.querySelectorAll(".swiper-item")[index])
        })
        this.itemClass()
      }
    },
    itemClass() {
      for(let n = 0; n < this.num; n++) {
        if(n > 1 && n < this.num - 1) {
          this.swiperItems[n].style.display = "none"
        }
      }
    }
  }
}
</script>

<style scoped>
.default {
  display: none;
}
.page-swiper {
  height: 200px;
}
.item-current {
  left: 20%;
  z-index: 99;
}
.item-left {
  opacity: 0.4;
  transform: perspective(1000px) translate3d(0%, 0, -20px);
}
.item-right {
  right: 0;
  opacity: 0.4;
  transform: perspective(1000px) translate3d(0%, 0, -20px);
}
.item-title {
  position: absolute;
  right: 10px;
  bottom: 18px;
  height: 20px;
  line-height: 20px;
  padding: 0px 8px;
  background-color: #cc4a4a;
  font-size: 12px;
  color: #fff;
  border-radius: 6px;
}
</style>