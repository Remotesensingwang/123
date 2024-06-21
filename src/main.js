import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import Vuex from 'vuex'
import store from './store' // 引入store
import router from './router'    // 引入router
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './api/mock' // 引入自己创建的mockjs文件
// import  'normalize.css'
import '../public/base.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
// Vue.use(Vuex)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  //完成了将APP组件放容器中
  render: h => h(App),
  store,
  beforeCreate() {
    Vue.prototype.$bus=this
  },

})
