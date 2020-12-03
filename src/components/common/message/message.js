import Vue from 'vue'
import Main from './message.vue'
let MessageConstructor = Vue.extend(Main)

let instance;
let instances = [];

const Message = function(options) {
  instance = new MessageConstructor({
    data: options
  })
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.dom = instance.vm.$el;
  instances.push(instance);
  return instance.vm;
}

Message({
  text: 'sdfgsdgf',
  duration: 3000
})
export default Message;