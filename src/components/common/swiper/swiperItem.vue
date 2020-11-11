<template>
  <div class="swiper-item" 
    :class="{
      'item-current': index === 0,
      'item-left': index === 1,
      'item-right': index === bannersLen - 1,
    }">
    <div class="item-img">
      <slot name="item-img"></slot>
    </div>
    <slot name="item-span"></slot>
  </div>
</template>

<script>
export default {
  name: 'swiperItem',
  props: {
    index: {
      type: Number
    },
    bannersLen: {
      type: Number
    }
  },

  mounted() {
    this.$emit('itemLoad')
  },
  methods: {
  }
}
</script>

<style scoped>
.swiper-item {
  position: absolute;
  width: 60%;
}
.item-img img {
  width: 100%;
}
</style>