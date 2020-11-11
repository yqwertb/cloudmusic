<template>
  <div class="nav-item" @click="itemClick">
    <slot name="nav-text"></slot>
  </div>
</template>

<script>
export default {
  name: 'navItem',
  props: {
    path: {
      type: String
    }
  }
}
</script>

<style scoped>
.nav-item {
  min-width: 60px;
}
.nav-text {
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #000;
}

</style>