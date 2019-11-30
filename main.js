import Vue from 'vue'
import App from './App'
import moment from 'moment'
Vue.config.productionTip = false
Vue.prototype.$moment = moment
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
