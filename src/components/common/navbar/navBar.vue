<template>
  <div class="nav-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'navBar'
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  padding: 0 15%;
  height: 40px;
  border-bottom: 1px solid #e1e1e2;
}
</style>