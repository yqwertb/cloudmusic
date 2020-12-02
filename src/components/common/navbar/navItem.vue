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
     document.querySelector('.nav-item').classList.add('active')
  },
  methods: {
    itemClick(e) {
      let allItems = document.querySelectorAll('.nav-item')
      allItems.forEach( item => {
        item.classList.remove('active')
      });
      allItems.forEach( (item, index) => {
        if(item.contains(e.path[0])) {
          item.classList.add('active')
        }
      });
    }
  }
}
</script>

<style scoped>
.nav-item {
  width: 70px;
  margin-right: 20px;
  text-align: center;
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