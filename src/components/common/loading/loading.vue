<template>
<div class="loading"></div>
</template>
 
<script>
export default {
  name: 'Loading' // 定义的组件名称 使用时写法：loading
}
</script>
 
<style scoped>
.loading {
  position: relative;
  left: 0;
  top: 0;
  background: url('~@/assets/img/common/Spinner-0.8s-200px.svg') center center no-repeat #fff;
  opacity: 0.4;
  z-index: 1000;
}
</style>
