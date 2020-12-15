import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const vuetify = process.env.NODE_ENV === "production"
  ? require('./plugins/vuetify').default
  : require('./plugins/vuetify-dev').default;

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

