<template>
  <div id="app">
    <app-wrapper></app-wrapper>
  </div>
</template>

<script>
//  context

// common

// views
import AppWrapper from '@/views/appwrapper/AppWrapper.vue' 

export default {
  name: 'App',
  components: {
    // context

    // common

    //views
    AppWrapper
  },
  data() {
    return {
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>
@import url('assets/css/base.css');

#app {
  position: relative;
}
/* loading加载样式 */
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

</style>