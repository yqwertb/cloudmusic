<template>
  <div class="nav-item" @click="itemClick">
    <slot name="nav-text"></slot>
  </div>
</template>

<script>
export default {
  name: 'navItem',
  props: {

  },
  mounted() {
  },
  methods: {
    itemClick(e) {
      let allItems = document.querySelectorAll('.nav-item')
      let active = document.querySelector(".nav-bar .active")
      let path = e.path || e.composedPath()
      if(active === path[1]) return
      allItems.forEach( (item, index) => {
        item.classList.remove('active')
        if(item.contains(path[0])) {
          item.classList.add('active')
        }
        this.$emit('item-click', e)
      })

      
    }
  }
}
</script>

<style scoped>
.nav-item {
  /* width: 80px; */
  padding: 0 8px;
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