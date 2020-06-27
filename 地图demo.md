key:588a610738a03c8ff991379cb2b9fcfe

## vue amap
### 地图主体
```
<el-amap vid="" :amap-manager="amapManager" :zoom="zoom" :center="center" :events="events" ></el-amap>
```
### 标签属性 动态+静态(vue amap): https://elemefe.github.io/vue-amap/#/zh-cn/base/amap
```
amap-manager： 地图实例
vid： 地图容器节点的ID
zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范[3-19]
center： 地图中心点坐标值
plugin：地图使用的插件
events： 事件
```

### ref 可用方法
```
$$getInstance()	AMap.Map	获取地图实例
$$getCenter()	[lng: Number, lat: Number]	获取地图中心
```

### AmapManager 用于获取地图实例，以及获得地图内组件的实例。
```
getMap		AMap.Map	返回地图实例，注入该管理实例的组件的地图实例
getChildInstance	vid	instance	返回 vid 对应的组件实例
```

### events 事件集合
事件类(vue amap): https://elemefe.github.io/vue-amap/#/zh-cn/base/amap
```
events: {
  // 初始化 钩子
  init(o) {
    // console.log(o,'地图实例')
  },
  click() {}
}
```

### 点
标签参数(vue amap): https://elemefe.github.io/vue-amap/#/zh-cn/coverings/marker
```
<el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="index"></el-amap-marker>
```
- 给标点添加自定义属性
```
设置  :extData="i"            // “i”可以是任意js数据类型
获取  e.target.getExtData()
```
- 是否可点击
```
clickable 默认true
```
- 是否可拖拽
```
draggable 默认false
注意： 绑定拖拽事件获取点的经纬度
```
- 是否显示
```
visible 默认true
```

- 图标点击事件
```
给图标标签添加events属性
```

- 自定义点图片
```
给图标标签添加icon、content、contentRender	属性
icon      没试
content   值为html代码片段
contentRender 值为render函数
```


## 高德 sdk
### AMap.Geocoder 构造函数
参数: https://lbs.amap.com/api/javascript-api/reference/lnglat-to-address#m_AMap.Geocoder
创建geocoder 实例
```
let a = new AMap.Geocoder({
          radius: 1000,  // 周边范围
          extensions: 'all', // 返回信息完整度
          city: '南京' // 查询城市
      })
```

- getAddress ( 根据传入的经纬度获取周边单位信息 逆向 )
a.getAddress([lng, lat],callback)

- getLocation ( 根据传入文字获取经纬度 正向 )
geocoder.getLocation('银杏山庄',callback)

```
callback:function(status:String,result:info/ReGeocodeResult)
status === complete 成功 result === ReGeocodeResult // 数据
status === error 失败   result === info // 错误信息
```

html标签传的简单数据类型就是静态属性 大概吧