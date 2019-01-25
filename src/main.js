import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
Vue.config.productionTip = false
// import '../public/css/reset.css'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
