const state = () => ({
  'user-info': {
    isLogin: false,
    uid: null,
    name: null,
    img: null,
    token: null,
  },
  cookies: null,
  'user-detail': {
    eventCount: null,
    followeds: null,
    follows: null,
    level: null,
    sign: false
  }
})

const mutations = {
  set_cookies(state, n) {
    state.cookies = n
  },
  set_user(state, n) {
    for(let o in n) {
      state["user-info"][o] = n[o]
    }
  },
  set_detail(state, n) {
    for(let o in n) {
      state["user-detail"][o] = n[o]
    }
  },
  set_storge(state, n) {
    window.sessionStorage.setItem('token', n.token)
    window.sessionStorage.setItem('user_uid', n.uid)
    window.sessionStorage.setItem('user_name', n.name)
    window.sessionStorage.setItem('user_img', n.img)
    window.sessionStorage.setItem('isLogin', n.isLogin)
  },
  change_login(state, n) {
    state["user-info"].isLogin = n
    if(!n) {
      for(let o in state["user-info"]) {
        if(o !== 'isLogin')
        state["user-info"][o] = null
      }
    }
  }
}
const actions = {

}

const user = {
  state,
  mutations,
  actions
}
export default user