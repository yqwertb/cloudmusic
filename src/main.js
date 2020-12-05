import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let isLogin = window.sessionStorage.getItem('isLogin')
  let pathObj = {}
  if(!isLogin) {
    isLogin = false
  } else {
    isLogin = isLogin.toString() === 'true' ? true : false
  }
  if(window.sessionStorage.getItem('token')) {
    let o = {
      isLogin: window.sessionStorage.getItem('isLogin'),
      uid: window.sessionStorage.getItem('user_uid'),
      name: window.sessionStorage.getItem('user_name'),
      img: window.sessionStorage.getItem('user_img'),
      token: window.sessionStorage.getItem('token'),
    }
    store.commit('set_user', o)
  }
  if((to.matched[0].path === '/fm' || to.matched[0].path === '/friend' || 
      to.matched[0].path === '/cloud' || to.matched[0].path === '/dj' || 
      to.matched[0].path === '/sub') && isLogin === false ) {
    return
  }
  next(pathObj)
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
