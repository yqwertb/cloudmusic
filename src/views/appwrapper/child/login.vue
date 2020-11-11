<template>
  <div class="login">
    <div id="login__close">
      <i class="iconfont" @click='close'>&#xe604;</i>
    </div>
    <div class="login-content">
      <div class="login-bg"></div>
      <div class="login-main">
        <input id="login__num" type="text" placeholder="手机账户"/>
        <input id="login__psw" type="password" placeholder="请输入密码"/>
        <div class="login-button" @click="login">立即登录</div>
      </div>
      <div class="Terms">
        <input id="terms" type="checkbox" name="123">
        <label for="terms">
          <span>同意</span><a href="">《服务条款》&nbsp;</a><a href="">《隐私政策》&nbsp;</a><a href="">《儿童隐私政策》&nbsp;</a>
        </label>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  props: {
  },
  data() {
    return {
    }
  },
  methods: {
    close() {
      this.$emit('loginClose')
    },
    login() {
      let term = document.querySelector("#terms")
      let phone = document.querySelector("#login__num").value
      let psw = document.querySelector("#login__psw").value
      if(!phone){ 
        alert("请输入手机号")
        return
      } else if(!(/^1[3456789]\d{9}$/.test(phone))) {
        alert("手机号码格式有误")
        return
      }
      if(term.checked && psw) {
        this.$emit('cellLogin', {phone, psw})
      } else if(!psw) {
        alert("请输入密码")
      } else if(!term.checked) {
        alert("请勾选协议")
      }
    }
  }
}
</script>

<style scoped>
.login {
  position: absolute;
  top: 180px;
  left: 435px;
  width: 360px;
  height: 450px;
  background-color: #fafafa;
  border-radius: 18px;
  box-shadow: 0 0 8px #e2e2e2;
  z-index: 999;
}
#login__close {
  cursor: pointer;
  display: inline-block;
  position: absolute;
  right: 10px;
  top: 10px;
}
.login-bg {
  position: relative;
  top: 40px;
  width: 280px;
  height: 140px;
  margin: 0 auto;
  background: url('../../../assets/img/login_bg.png') no-repeat center;
}
.login-main {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  height: 180px;
}
#login__num, #login__psw {
  width: 250px;
  height: 35px;
  line-height: 35px;
  padding-left: 5px;
  background-color: #fff;
  border: 1px solid #d8d8d8;
}
.login-button {
  cursor: pointer;
  width: 250px;
  height: 40px;
  line-height: 40px;
  background-color: #c72e2e;
  border-radius: 3px;
  color: #fff;
  text-align: center;
}
.Terms {
  position: relative;
  bottom: 10px;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
}
.Terms a {
  display: inline-block;
  color: #507daf;
}
#terms {
  position: relative;
  top: 1px;
}
.Terms label {
  padding-left: 5px;
}
</style>