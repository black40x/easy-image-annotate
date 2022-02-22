import Vue from 'vue'
import App from './App.vue'
import VueLayers from 'vuelayers'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueLayers)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
