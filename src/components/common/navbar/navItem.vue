<template>
  <div class="nav-item" @click="itemClick($event)">
    <slot name="nav-text"></slot>
  </div>
</template>

<script>
export default {
  name: 'navItem',
  props: {
    // path: {
    //   type: String
    // }
  },
  mounted() {
  },
  methods: {
    itemClick(e) {
      let allItems = document.querySelectorAll('.nav-item')
      let path = e.path || e.composedPath()
      allItems.forEach( item => {
        item.classList.remove('active')
      });
      allItems.forEach( (item, index) => {
        if(item.contains(path[0])) {
          item.classList.add('active')
        }
      });
      this.$emit('itemClik', e)
    }
  }
}
</script>

<style scoped>
.nav-item {
  width: 80px;
  margin-right: 20px;
  text-align: center;
  cursor: pointer;
}
.nav-text {
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #000;
}
.active {
  color: #c62f2f;
}
</style>