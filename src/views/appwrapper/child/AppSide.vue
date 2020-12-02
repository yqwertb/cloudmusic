<template>
  <div id="app_content_sidebar">
    <div class="sidebar-item">
      <div class="sidebar-item__head">推荐</div>
      <side-bar>
        <side-item v-for="(item, index) in sidebar['推荐']" :key="index" :path="paths[0][index]" @item-click="itemClick">
          <div class="sidebar-item__content__item" slot="content-item" v-if="item.isTrue">
            <div class="item-icon">
              <i class="iconfont" :class="item.icon"></i>
            </div>
            <div class="item-text">{{ item.text }}</div>
          </div>
        </side-item>
      </side-bar>
    </div>
    
    <div class="sidebar-item">
      <div class="sidebar-item__head">我的音乐</div>
      <side-bar>
        <side-item v-for="(item, index) in sidebar['我的音乐']" :key="index" :path="paths[1][index]" @item-click="itemClick">
          <div class="sidebar-item__content__item" slot="content-item" v-if="item.isTrue">
            <div class="item-icon">
              <i class="iconfont" :class="item.icon"></i>
            </div>
            <div class="item-text">{{ item.text }}</div>
          </div>           
        </side-item>
      </side-bar>
    </div>

    <div class="sidebar-item">
      <div class="sidebar-item__head my-play-list" @click="hide($event)">创建的歌单</div>
      <side-bar class="play-list">
        <side-item v-for="(item, index) in myPlayList" :key="index" :path="'/listdetail/'+item.id" @item-click="itemClick">
          <div class="sidebar-item__content__item" slot="content-item">
            <div class="item-icon">
              <i class="iconfont" :class="{'icon-wodexihuan': index === 0, 'icon-gedan': index !== 0}"></i>
            </div>
            <div class="item-text">{{ item.name }}</div>
          </div>           
        </side-item>
      </side-bar>
    </div>

    <div class="sidebar-item">
      <div class="sidebar-item__head my-star-list" @click="hide($event)">收藏的歌单</div>
      <side-bar class="star-list">
        <side-item v-for="(item, index) in myStarList" :key="index" :path="'/albumdetail/'+item.id" @item-click="itemClick">
          <div class="sidebar-item__content__item" slot="content-item">
            <div class="item-icon">
              <i class="iconfont" :class="{'icon-wodexihuan': index === 0, 'icon-gedan': index !== 0}"></i>
            </div>
            <div class="item-text">{{item.name}}</div>
          </div>           
        </side-item>
      </side-bar>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/common/sidebar/sideBar.vue";
import SideItem from "@/components/common/sidebar/sideItem.vue";

export default {
  name: "AppSide",
  components: {
    SideBar,
    SideItem,
  },
  props: {
    myPlayList: {
      type: Array
    },
    myStarList: {
      type: Array
    }
  },
  watch: {
    myPlayList: {
      handler: function() {
        this.$nextTick(() => {
          this.getList()
          this.init()
        })
        // this.init()
        // this.isInit = true
      },
      deep: true
    }
  },

  data() {
    return {
      sidebar: {
        推荐: [
          {
            icon: "icon-yinle",
            text: "发现音乐",
            isTrue: true,
          },
          {
            icon: "icon-guangbo",
            text: "私人FM",
            isTrue: true,
          },
          {
            icon: "icon-shipin",
            text: "视频",
            isTrue: true,
          },
          {
            icon: "icon-pengyou",
            text: "朋友",
            isTrue: true,
          },
        ],
        我的音乐: [
          {
            icon: "icon-yunpan",
            text: "我的音乐云盘",
            isTrue: true,
          },
          {
            icon: "icon-diantai",
            text: "我的电台",
            isTrue: true,
          },
          {
            icon: "icon-wodeshoucang",
            text: "我的收藏",
            isTrue: true,
          },
        ],
        创建的歌单: [
          {
            icon: "icon-wodexihuan",
            text: "我喜欢的音乐",
            isTrue: true,
          },
          {
            icon: "icon-gedan",
            text: 4,
            isTrue: false,
            isPrivate: false,
          },
          {
            icon: "icon-gedan",
            privateIcon: "icon-simi",
            text: 4,
            isTrue: true,
            isPrivate: true,
          },
        ],
      },
      paths: [
        ["/home/forU", "/fm", "/video", "/friend"],
        ["/cloud", "/dj", "/sub"],[]
      ],
      allItems: [],
      currentItem: 0,
      isInit: false
    };
  },
  created() {
    if(!this.myPlayList.length) {
      this.$nextTick(() => {
        this.init()
      })
    }
    
  },
  mounted() {

  },
  methods: {
    getList() {
      this.allItems.splice(0, this.allItems.length)
      document.querySelectorAll(".sidebar-item__content").forEach(item => {
        this.allItems.push(item)
      })
    },
    init() {
      this.$nextTick(() => {
        if(!this.myPlayList.length) {
          this.allItems.splice(0, this.allItems.length)
          document.querySelectorAll(".sidebar-item__content").forEach(item => {
            this.allItems.push(item)
          })
        }
        let path = this.$route.path
        let index = window.sessionStorage.getItem('sideItem')
        let currentIndex = index === null ? this.currentItem : index
        if(currentIndex === 0 || path === '/home') {
          this.allItems[0].classList.add('active')
        } else {
          if(currentIndex > this.allItems.length && window.sessionStorage.getItem('isLogin').toString() === 'false') {
            this.allItems[0].classList.add('active')
            this.$router.push('/home/forU')
          } else {
            this.allItems[currentIndex].classList.add('active')
          }
      
        } 
      })
    },
    itemClick(e) {
      let isLogin = window.sessionStorage.getItem('isLogin')
      if(!isLogin) {
        isLogin = false
      } else {
        isLogin = isLogin.toString() === 'true' ? true : false
      }
      if(!isLogin) return   
      // let currentpath = this.$route.path
      // if( currentpath !== e[1]) return
      this.allItems.forEach( item => {
        item.classList.remove('active')
      });
      this.allItems.forEach( (item, index) => {
        if(item.contains(e[0].target)) {
          item.classList.add('active')
          window.sessionStorage.setItem('sideItem', index)
          console.log(index);
        }
      });
    },
    hide(e) {
      let target = e.target.classList[1]
      let classname = ''
      if(target === 'my-play-list') {
        classname = 'play-list'
      } else if(target === 'my-star-list'){
        classname = 'star-list'
      }
      let list = document.querySelector(`.${classname}`)
      console.log(list.className);
      if (list.className === classname) {
        list.classList.add('mylist-hide')
      } else {
        list.classList.remove('mylist-hide')
      }
      
    }
  },
  computed: {},
};
</script>

<style scoped>
#app_content_sidebar {
  width: 240px;
  padding-bottom: 20px;
  overflow-y: auto;
  color: #666;
}
.sidebar-item {
  margin-top: 15px;
    overflow: hidden;
}
.sidebar-item__head {
  color: #7d7d7d;
  padding-left: 8px;
  margin-bottom: 8px;
  font-size: 14px;
}
.sidebar-item__content {
  padding-left: 10px;
}
.sidebar-item__content__item {
  display: flex;
  line-height: 25px;
  margin-bottom: 5px;
  font-size: 14px;
  padding: 5px;
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
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.iconfont {
  font-size: 20px;
}
.mylist-hide {
  height: 0;
}
.play-list, .star-list {
  transition: 0.5s;
}
</style>