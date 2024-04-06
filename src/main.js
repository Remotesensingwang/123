import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './api/mock'
// import  'normalize.css'
import '../public/base.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)
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
