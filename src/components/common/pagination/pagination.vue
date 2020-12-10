<template>
  <div class="pagination-wrapper">
    <div class="pagination-item" v-for="(item, index) in pageArr" :key="index">
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  data() {
    return {
      // 当前页码
      pageNum: null,
      // 分页的总数 
      allPage: null,
      // 分页的总数 数组
      pageArr: []
    }
  },
  props: {
    allCount: {
      type: Number
    },
    showCount: {
      type: Number
    }
  },
  watch: {
    showCount: {
      handler: function(old, last) {
        // this.allPage = last % this.showCount !== 0 
        //     ? last / this.showCount + 1 : last / this.showCount
        // this.allPage = last / this.showCount
        console.log(this.allCount, old);
        this.allPage = this.allCount / old
        for(let n = 0; n < this.allPage; n++) {
          this.pageArr.push(n+1)
        }
        this.pageNum = 0
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>