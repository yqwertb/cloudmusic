<template>
  <div id="prefound" class="page">
    <nav-bar-base></nav-bar-base>
    <transition name="fade" class="info-loading">
      <loading v-if="isLoading"></loading>
    </transition>

    <router-view v-if="!isLoading"></router-view>
  </div>
</template>


<script>
import navBarBase from '@/components/context/navbar/navBarBase'

import Loading from "@/components/common/loading/loading.vue"


export default {
  name: 'Home',
  components: {
    navBarBase,
    Loading
  },
  data() {
    return {
      isLoading: false,
    }
  },
  created() {
  },
  methods: {
    //网络请求
    
    // 事件监听
   
  }
}
</script>

<style scoped>

</style>