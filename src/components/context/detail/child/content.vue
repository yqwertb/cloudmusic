<template>
  <div class="detail-content">
    <nav-bar>
      <nav-item><div slot="nav-text">歌曲列表</div></nav-item>
      <nav-item><div slot="nav-text">评论</div></nav-item>
      <nav-item><div slot="nav-text">收藏者</div></nav-item>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../../common/navbar/navBar.vue'
import NavItem from '../../../common/navbar/navItem.vue'

export default {
  name: 'detailContent',
  props: {
    contentInfo: {
      type: Object
    }
  },
  components: {
    NavBar,
    NavItem,
  }

}
</script>

<style scoped>

</style>