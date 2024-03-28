import Vue from 'vue'
import App from './App'
import vuex from 'vuex';
import store from './store'

Vue.config.productionTip = false
Vue.use(vuex)
new Vue({
  el: '#app',
  //完成了将APP组件放容器中
  render: h => h(App),
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
})
