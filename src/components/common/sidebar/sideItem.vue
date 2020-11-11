<template>
    <div class="sidebar-item__content" @click="itemClick">
      <slot name="content-item"></slot>
    </div>
</template>

<script>
export default {
  name: 'sideItem',
  props: {
    path: {
      type: String
    }
  },
  data() {
    return {
    }
  },
  methods: {
    itemClick($e) {
      if(this.$route.path !== this.path) {
        this.$router.push(this.path);
      }
      this.$emit('item-click', [$e, this.path])
    }
  }
}
</script>

<style scoped>
.active {
  border-left: 3px solid #c62f2f;
  padding-left: 7px !important;
  background-color: #e6e7ea;
  color: #000;
}
</style>