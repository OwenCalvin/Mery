import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid/'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)
fontawesome.library.add(solid)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
