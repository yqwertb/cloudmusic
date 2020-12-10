import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as utils from './utils/index'

Vue.config.productionTip = false

Vue.prototype.$utils = utils.utils
for (let key in utils.filters){  
  Vue.filter(key, utils.filters[key])  
}  

Vue.prototype.$EventBus = new Vue()
// function IsPC() {
//   var userAgentInfo = navigator.userAgent;
//   var Agents = new Array("Windows", "Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
//   Agents.forEach(item => {
//     if (userAgentInfo.indexOf(item) > 0) {
//       alert(item);
//     }
//   })
// }
// IsPC()
// alert(window.screen.availWidth)
// alert(window.screen.availHeight);

alert(document.body.clientHeight)
alert(document.body.clientWidth)
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
