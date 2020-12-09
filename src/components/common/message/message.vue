<template>
  <div class="message" @mouseenter="clearTimer" @mouseleave="startTimer">
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  name: 'message',
  data() {
    return {
      text: undefined,
      duration: 3000,
      closed: false,
      timer: null,
    }
  },
  watch: {
    closed: {
      handler: function () {
      }
    }
  },
  methods: {
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.closeMessage();
          }
        }, this.duration);
      }
    },
    closeMessage() {
      messages[0].setAttribute('class', 'message message-fade-enter message-fade-leave-active')
      messages.forEach((item, index) => {
        item.style.top = index === 0 ? 20 + 'px' : 20 + 64 * (index - 1) + 'px'
      })
      setTimeout(()=> {
        document.body.removeChild(messages[0])
        messages.shift()
      }, 300)
    }
  }
}
</script>

<style scoped>
.message {
  min-width: 380px;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: #EBEEF5;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  background-color: #edf2fc;
  transition: opacity .3s, transform .4s, top .4s;
  padding: 15px 15px 15px 20px;
  display: flex;
  align-items: center;
}

.message p {
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 1;
  color: #909399;
}

.message-fade-enter,
.message-fade-leave-active {
  opacity: 0;
  -webkit-transform: translate(-50%, -100%);
  transform: translate(-50%, -100%)
}

</style>