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
    <div class="box">
      <button @click="save">保存</button> | <button @click="markerDialog = true">标点</button>

    <div style="background:pink">
      <!-- 加一个图层，layerId = 当前新建的值，并将图层索引 push到展示数组layerList》？？？ -->
      <button @click="cheArr.push(1)"> + </button>
      <div v-for="(e,i) in cheArr" :key="Math.random()">
        <button @click="showLayerId(i)">{{layerList.some(e=>e === i)?'显示':'隐藏'}}</button>
        <!-- 图层删除的同时删除内容 ps 根据图层id去删 ？？？ -->
        <a href="javascript:;" @click="del(i)"> 删除 </a>
        {{i}}
        <input type="radio" name="radio" v-model="layerId" :value="i">
      </div>
      <!-- 单选框 选图层 显示隐藏按钮 控制图层显示 -->
    </div>

    </div>
    <el-amap
      class="amap-box"
      :amap-manager="amapManager"
      :vid="'f0d9486cfbe171616960a24d5ed90dde'"
      :zoom="zoom"
      :center="center"
      :events="events"
    >
      <!-- 地图点击的点 -->
      <el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="index"></el-amap-marker>
      <!-- 自定义点 -->
      <el-amap-marker
        v-for="(item, i) in DIYmarkers"
        :events="DIYmarkerEvents"
        :position="item.lnglat"
        :key="item.lnglat+''"
        :extData="i"
        :content="markerIcon(item.icon)"
        :visible="item.visible"
      ></el-amap-marker>
    </el-amap>

    <!-- 弹窗 -->
    <div v-show="markerDialog" class="marker_dialog">
      <p>请选择图标</p>
      <div style="text-align: left;">
        <img :src="item" v-for="(item,i) in markerIconList" :key="i" @click="markerImg(i)">
        <button @click="markerDialog = false">关闭</button>
      </div>
    </div>
    
  </div>
</template>

<script>
// AMapManager 生成地图画布
import { AMapManager } from "vue-amap";

let amapManager = new AMapManager(); // 新建生成地图画布

export default {
  data() {
    let self = this;
    return {
      // 单选框数组
      cheArr: [1],
      // 图层id  默认0
      layerId: 0,
      // 当前展示的图层数组  默认0
      layerList:[0],

      amapManager,
      zoom: 17,
      center: [121.329402, 31.228667],

      // 地图中心点
      markers: [],
      // 操作类型
      // 1 点中心点
      // 2 标自定义点
      operatingType: 1,

      // 地图上的事件
      events: {
        // 初始化 钩子
        init(o) {
          // console.log(o,'地图实例')
        },
        click(e) {
          let { lng, lat } = e.lnglat;
          if (self.operatingType === 1){
            self.markers = []
            // 全图点击
            self.center = [lng, lat];
            self.markers.push([lng, lat])
          }else if(self.operatingType === 2){
            // 添加点
            self.DIYmarkers.push({
              icon: self.markerIconType,
              lnglat:[lng, lat],
              layerId:self.layerId,
              visible: true
            });
          }
        },
        rightclick(e){
          // 重置当前操作类型
          self.operatingType = 1
        }
      },

      // ----- 自定义点 state -----
      // 图标
      markerIconList:[
        require('./01.jpg'),
        require('./02.jpg')
      ],
      // 事件
      DIYmarkerEvents: {
        click(e) {
          // 删除
          let index = e.target.getExtData()
          self.delMarkers(index)
        }
      },
      // 数组
      DIYmarkers: [],
      // 选择自定义点图标列表 弹框
      markerDialog: true,
      // 哪个自定义图标
      markerIconType: 1
      // ----- 自定义点 end -----
    };
  },
  mounted() {},
  watch:{
    // 监听 图层展示数组变化
    layerList:{
      handler(newVal,old) {
        // 当前要展示的图层 newVal
        this.DIYmarkers.forEach(e=>{
            e.visible = newVal.some(item=>item === e.layerId)
        })
      },
      deep:true
    }
  },
  methods: {
    save() {
      console.log(this.DIYmarkers);
    },
    // ----- 分图层组件 state -----
    // 添加层
    add() {
    },
    // 删除层
    del(i) {
      this.cheArr.splice(i, 1);
      if (i === this.radioxz ) this.radioxz = i-1
    },
    // 当前显示的图层
    showLayerId(i){
      if (this.layerList.some(e=>e === i)){
        let index = this.layerList.indexOf(i)
        this.layerList.splice(index ,1)
      }else{
        this.layerList.push(i)
      }
    },
    // ----- 分图层组件 end -----

    // ----- 点 state -----
    // 点 删除
    delMarkers(i){
      var r = confirm("亲，您确定删除该点吗？")
      if (r){
        this.DIYmarkers.splice(i,1)
      }
    },
    // 点 设置icon
    markerIcon(val){
      let content = `<img src="${this.markerIconList[val]}" style="width: 30px; height:30px" />`
      return content
    },
    // 点 弹框 选择图标 icon
    markerImg(i){
        this.markerIconType = i
        this.operatingType = 2
        this.markerDialog = false
    }
    // ----- 点 end -----
  }
};
</script>

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
.box {
  position: fixed;
  top: 10px;
  left: 0;
  z-index: 99;
  width: 150px;
}
.marker_dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  border: 1px solid #000;
  background: #fff;
}
.marker_dialog img {
  width: 50px;
  height: 50px;
  margin-left: 10px;
  box-sizing: border-box;
  border: 1px solid #000;
  cursor: pointer;
}
</style>
