// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'
import store from '@/store/index'
import * as types from './store/mutation-types'
import App from './views/app/App'
import ECharts from 'vue-echarts/components/ECharts'

import 'font-awesome/css/font-awesome.min.css'

import '@/services/'
import '@/utils/index'
import '@/css/index'

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/lines'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/title'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/markArea'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/graphic'

import {DatePicker} from 'element-ui'
import {Message} from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(DatePicker)
Vue.component('chart', ECharts)

Vue.prototype.$message = Message;
Vue.mixin({
  methods: {
    loadingProgressOnError () {
      this.$root.eventHub.$emit('progressOnError')
    },
    progressToByKey (key, dict) {
      if (key) {
        let k = typeof key === 'string' ? key : key.toString()
        let progress = dict[k]
        this.loadingProgressTo(progress)
      }
    },
    loadingProgressTo (val) {
      this.$root.eventHub.$emit('progressTo', val)
    }
  }
})

Vue.config.productionTip = false

/**路由验证**/
router.beforeEach((to, from, next) => {
  if(to.meta.auth) { //是否验证
    if (store.state.token) { //是否登陆
      router.app.$options.store.commit(types.SET_CURRENT_ROUTE_NAME, to.path);
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    router.app.$options.store.commit(types.SET_CURRENT_ROUTE_NAME, to.path);
    next();
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    eventHub: new Vue()
  },
  store,
  router,
  components: { App },
  template: '<App/>'
})
