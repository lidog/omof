//  全局样式
require('element-ui/lib/theme-chalk/index.css')
require('./assets/font/style.css')
require('./assets/css/index.scss')

// 相关依赖
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'

import router from './router'
import {util} from 'vui/utils/util'

Vue.use(ElementUI)
window.Util = util
 
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})