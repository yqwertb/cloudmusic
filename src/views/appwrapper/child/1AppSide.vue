<template>
  <div id="app_content_sidebar" >
    <div class="sidebar-item" v-for="(item, index) in sidebar">
      <div class="sidebar-item__head">{{index}}</div>
      <div class="sidebar-item__content"  v-for="m in paths"  >
        <!-- v-for="m in paths" :path=m -->
        
        <div class="sidebar-item__content__item" v-for="(n) in item" path="/home"  @click="itemClick">
          <div class="item-icon">
            <i class="iconfont" :class="n.icon"></i>
          </div>
          <div class="item-text">{{n.text}}</div>         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSide',
  data() {
    return {
      sidebar: {
        '推荐': [
          {
            'icon': 'icon-yinle',
            'text': '发现音乐',
            'isTrue': true
          },
          {
            'icon': 'icon-guangbo',
            'text': '私人FM',
            'isTrue': true
          },
          {
            'icon': 'icon-shipin',
            'text': '视频',
            'isTrue': true
          },
          {
            'icon': 'icon-pengyou',
            'text': '朋友',
            'isTrue': true
          },
        ],
        '我的音乐': [
          {
            'icon': 'icon-yunpan',
            'text': '我的音乐云盘',
            'isTrue': true
          },
          {
            'icon': 'icon-diantai',
            'text': '我的电台',
            'isTrue': true
          },
          {
            'icon': 'icon-wodeshoucang',
            'text': '我的收藏',
            'isTrue': true
          },
        ],
        '创建的歌单': [
          {
            'icon': 'icon-wodexihuan',
            'text': '我喜欢的音乐',
            'isTrue': true
          },
          {
            'icon': 'icon-gedan',
            'text': 4,
            'isTrue': true,
            'isPrivate': false
          },
          {
            'icon': 'icon-gedan',
            'privateIcon': 'icon-simi',
            'text': 4,
            'isTrue': true,
            'isPrivate': true
          },
        ],
      }, 
      paths: [
        '/home',
        '/fm',
        '/video',
        '/friend'
      ]
    }
  },  
  methods: {
    itemClick() {console.log(this);
      this.$router.push('/home')
    }
  },
  computed: {
   
  }
}
</script>

<style scoped>
#app_content_sidebar {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 240px;
  /* height: calc(100% - 50px); */
  /* background-color: black; */
  overflow-y: auto;
}
.sidebar-item {
  margin-top: 15px;
}
.sidebar-item__head {
  color: #7d7d7d;
  padding-left: 6px;
  margin-bottom: 8px;
}
.sidebar-item__content__item {
  display: flex;
  padding-left: 8px;
  line-height: 25px;
  margin-bottom: 5px;
  font-size: 14px;
}
.acitve {
  border-left: 3px solid #c62f2f;
}
.sidebar-item__content__item:hover {
  cursor: pointer;
  color: #000000;
}
.item-icon {
  height: 25px;
}
.item-text {
  padding-left: 10px;
}
.iconfont {
  font-size: 20px;
}
</style>