import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  //完成了将APP组件放容器中
  render: h => h(App), 
  
  // render是个函数,里面有返回值,第一个参数也是个函数(可以创建一个元素，如果是VUE创建的可以直接写)，把app放进容器
  // render(creatElement) {
  //   return creatElement(App)
    // return creatElement('h1','nihao')
  // },
  // template:`<App><App/>`,
  // components:{App}
})
