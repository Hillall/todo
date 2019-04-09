import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'

window.axios = axios

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    red: '#fc680f'
  }
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
