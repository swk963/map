<template>
  <div class="map">
    <!--
      amap-manager： 地图管理对象
      vid：地图容器节点的ID
      zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
      center： 地图中心点坐标值
      plugin：地图使用的插件
      events： 事件
    -->
    <el-amap
      class="amap-box"
      :amap-manager="amapManager"
      :vid="'f0d9486cfbe171616960a24d5ed90dde'"
      :zoom="zoom"
      :center="center"
      :events="events"
    >
      <el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="index"></el-amap-marker>
    </el-amap>
  </div>
</template>

<style>
.map {
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #999;
}
</style>

<script>
// lazyAMapApiLoaderInstance; 只通过vue-amap 引入高德地图, 实例化基于高德地图的sdk完成。
// AMapManager 生成地图画布
import { lazyAMapApiLoaderInstance, AMapManager } from "vue-amap";

let amapManager = new AMapManager(); // 新建生成地图画布

export default {
  data() {
    let self = this;
    return {
      map: null,
      amapManager,
      zoom: 17,
      center: [121.329402, 31.228667],

      lng: 0,
      lat: 0,
      markers: [],
      // address: null,
      // searchKey: "",
      events: {
        // 初始化 钩子
        init(o) {
          // console.log(o,'地图实例')
        },
        click(e) {
          self.markers = [];
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
          self.center = [lng, lat];
          self.markers.push([lng, lat]);
        }
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>