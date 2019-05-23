import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment'
import VueAnalytics from 'vue-analytics'
import Vuesax from 'vuesax'
import ECharts from 'vue-echarts'
import VueScrollTo from 'vue-scrollto'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

Vue.use(Vuesax)
Vue.use(VueScrollTo, {
  offset: -60
})
Vue.use(VueAnalytics, {
  id: 'UA-71933693-4',
  router
})
Vue.component('v-chart', ECharts)

Vue.prototype.$axios = axios
Vue.prototype.$moment = moment
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
