import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 地图
import VueAMap from 'vue-amap'

Vue.use(VueAMap)
// initAMapApiLoader 初始化方法
VueAMap.initAMapApiLoader({
  key: 'f0d9486cfbe171616960a24d5ed90dde',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder']
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
