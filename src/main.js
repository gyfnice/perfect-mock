import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import api from '@/api/index.js'

Vue.config.productionTip = false

api.request("get", api.getURL('houseSailWebsite/listRegion'), {
   num: 2
}).then(res => {
	console.log('res ----->', res.data)
})

api.request("get", api.getURL('contentSailWebsite/topList'), {
 num: 3
}).then(res => {
	console.log('res ----->topList', res.data)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
