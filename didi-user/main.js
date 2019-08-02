import Vue from 'vue'
import App from './App'

import util from './common/util.js'
import json from './config/json.js'
import config from './config/index.js'

Vue.config.productionTip = false


Vue.prototype.$util = util;
Vue.prototype.$config = config;
Vue.prototype.$json = json;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
