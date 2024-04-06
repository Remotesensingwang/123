<template>
    
     <el-container>
        <el-header><Header_map/></el-header>
        <el-main>
            <div id="map" class="map"></div>
            <div id="popup" class="ol-popup" ref="container">
                <a href="#" id="popup-closer" class="ol-popup-closer" ref="closer" @click="handleClose"></a>
                <div id="popup-content" ref="content"></div>
            </div>
            <div class="layers-list">
                <ul>
                    <li v-for="(layer,index) in layers" :key="index">
                        <input type="checkbox" :checked='layer.visible' @change="handleChange(layer.name,index)">{{layer.name}}</li>
                </ul>
            </div>
            </el-main>
    </el-container>   
    
</template>
<script>
    import Header_map from '@/components/Header_map'
    import 'ol/ol.css'
    import Map from 'ol/Map'
    import View from 'ol/View'
    import TileLayer from 'ol/layer/Tile'
    import {OSM,Vector,XYZ,BingMaps} from 'ol/source'
    import VectorLayer from 'ol/layer/Vector';
    import GeoJSON from 'ol/format/GeoJSON'
    import {Style,Icon,Stroke,Fill,Circle} from 'ol/style'
    import Overlay from 'ol/Overlay'
    import {getCenter,boundingExtent} from 'ol/extent';
    // import moduleName from '../../../src/';
    export default {
        data() {
            return {
                map:null,
                overlay:null,
                layers:[
                    // {
                    //     name:'layer',visible:true
                    // }
                ]
            }
        },
        components:{Header_map},
        methods: {
            initMap(){
                const view =new View({
                    // center: [0, 0],
                    extent: [80, 20, 130, 40],
                    zoom: 5,
                    minZoom: 5,
                    MaxZoom: 14,
                    // 设置成都为地图中心
                    center: [103.39, 35.56],
                    // 指定投影使用EPSG:4326
                    projection: 'EPSG:4326',
                })

                const OSMLayer = new TileLayer({
                    source: new OSM(),
                    name:'OSM',
                    opacity:0.5
                })

                const googleLayer = new TileLayer({
                    source: new XYZ({url:'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',wrapX:false}),
                    name:'谷歌地形'
                })

                const googleLayer1 = new TileLayer({
                    source: new XYZ({url:'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0',wrapX:false}),
                    name:'谷歌街道'
                })
                const gaodeLayer = new TileLayer({
                    source: new XYZ({
                        url:'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}', wrapX:false}),
                        name:'高德'})
                const bingLayer =new TileLayer({
                    source: new BingMaps({
                        key: 'AmMEWaIe7beWhvJ6ZRBqm-8bQBx3fjaZcUhq-37IFmbpA6jWaqOsld0vxEYMFdIf',
                        imagerySet: 'Aerial'
                    }),
                    name:'BingMaps'
                })

                const geojsonChinaLayer = new VectorLayer({
                    source: new Vector({
                        format: new GeoJSON(),
                        url: 'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full',
                    }),
                    name:'中国'
                    })

                this.map =new Map({
                    layers: [
                        // new ol.layer.Tile({ source: new ol.source.OSM()}),
                        gaodeLayer,
                        googleLayer1,
                        bingLayer,
                        OSMLayer,
                        geojsonChinaLayer
                    ],
                    view,
                    target: 'map'
                })

                console.log('initmap',this.map.getLayers());               
                this.setMarker()
                this.addOverlay()
                this.map.on('singleclick',this.singleClick)
                this.map.on('pointermove',this.pointerMove)
                const layers =this.map.getLayers()
                layers.forEach(layer => {
                    this.layers.push({name:layer.get('name'),visible:layer.getVisible()}) 
                })

                // const a=ol.proj.fromLonLat([-72.980624870461128, 48.161307640513321])
            },

            //设置图层列表的显示与隐藏
            handleChange(name,index){
                this.layers.forEach((layer)=>{
					if(layer.name === name){
                        layer.visible = !layer.visible
                        this.map.getLayers().item(index).setVisible(layer.visible)
                    }
				})      
            },
            //添加矢量图层
            setMarker(){
                const image=new Icon(({
                    anchor: [0.5, 0.9],
                    src: 'http://support.supermap.com.cn:8090/iserver/iClient/forJavaScript/examples/img/markerbig_select.png'
                }))
                const styles = {
                    'Point': new Style({
                    image: image
                    }),
                    'LineString': new Style({
                    stroke: new Stroke({
                        color: 'green',
                        width: 1
                    })
                    }),
                    'MultiLineString': new Style({
                    stroke: new Stroke({
                        color: 'green',
                        width: 1
                    })
                    }),
                    'MultiPoint': new Style({
                    image: image
                    }),
                    'MultiPolygon': new Style({
                    stroke: new Stroke({
                        color: 'yellow',
                        width: 1
                    }),
                    fill: new Fill({
                        color: 'rgba(255, 255, 0, 0.1)'
                    })
                    }),
                    'Polygon': new Style({
                    stroke: new Stroke({
                        color: 'blue',
                        lineDash: [4],
                        width: 3
                    }),
                    fill: new Fill({
                        color: 'rgba(0, 0, 255, 0.1)'
                    })
                    }),
                    'GeometryCollection': new Style({
                    stroke: new Stroke({
                        color: 'magenta',
                        width: 2
                    }),
                    fill: new Fill({
                        color: 'magenta'
                    }),
                    image: new Circle({
                        radius: 10,
                        fill: null,
                        stroke: new Stroke({
                        color: 'magenta'
                        })
                    })
                    }),
                    'Circle': new Style({
                    stroke: new Stroke({
                        color: 'red',
                        width: 2
                    }),
                    fill: new Fill({
                        color: 'rgba(255,0,0,0.2)'
                    })
                    })
                }
                
                const styleFunction = function(feature) {
                    return styles[feature.getGeometry().getType()]
                }

                const qingdao={
                    "type": "FeatureCollection",
                    "features": [
                        {
                        "type": "Feature",
                        "properties": {"name":"青岛"},
                        "geometry": {
                            "coordinates": [
                            120.31657262885437,
                            36.06780613007011
                            ],
                            "type": "Point",
                        }               
                        },
                        {
                        "type": "Feature",
                        "properties": {"name":"青岛1"},
                        "geometry": {
                            "coordinates": [
                            118.66155415111234,
                            36.465471251092524
                            ],
                            "type": "Point",
                        }
                        },
                        {
                        "type": "Feature",
                        "properties": {"name":"青岛2"},
                        "geometry": {
                            "coordinates": [
                            117.13806287027961,
                            35.872655633382124
                            ],
                            "type": "Point",
                        }
                        }
                    ]
                } 

                const vectorSource = new Vector({
                    features: (new GeoJSON()).readFeatures(qingdao)
                })
              
                const vectorLayer = new VectorLayer({
                    source: vectorSource,
                    style: styleFunction,
                    name:'shandong'
                })

                this.map.addLayer(vectorLayer)
            },
            //添加overlay图层
            addOverlay(){
                const container = this.$refs.container
                this.overlay= new Overlay({
                    element: container,
                    autoPan: true,
                    autoPanAnimation: {
                        duration: 250
                    }
                })
                this.map.addOverlay(this.overlay)
            },
            //鼠标单击地图显示overlays
            singleClick(e){
                let select = false
                const content = this.$refs.content
                this.map.forEachFeatureAtPixel(e.pixel,  (feature) => {
                if (feature.getProperties().adcode) {
                    // var contentHTML = feature.getProperties().name;
                    const contentHTML=this.mark(feature.getProperties())
                    content.innerHTML = contentHTML;
                    // console.log(feature.getProperties());
                    // this.overlay.setPosition(feature.getGeometry().getCoordinates());
                    this.overlay.setPosition(feature.getProperties().center)
                    var extent = boundingExtent(feature.getGeometry().getCoordinates()[0][0]); //获取一个坐标数组的边界，格式为[minx,miny,maxx,maxy]
                    var center = getCenter(extent);   //获取边界区域的中心位置
                    // map.getView().setCenter(center);  //设置当前地图的显示中心位置
                    console.log(feature.getGeometry().getCoordinates(),center,extent);
                    console.log(feature.getProperties().center);


                    select=true
                }
                })
                if(!select){
                    this.overlay.setPosition(undefined)
                }

            },
            //鼠标移动事件 显示小手
            pointerMove(e){
                let select = false
                this.map.forEachFeatureAtPixel(e.pixel,  (feature) => {
                if (feature.getProperties().name) {
                    this.map.getTargetElement().style.cursor = 'pointer';
                    select=true
                }
                })
                if(!select){
                    this.map.getTargetElement().style.cursor = '';
                    // overlay.setPosition(undefined)
                }
            },
            //为弹窗添加一个响应关闭的函数
            handleClose(){
                const closer =this.$refs.closer
                this.overlay.setPosition(undefined);
                closer.blur();
                return false;
            },
            //设置overlay图层显示的数据
            mark(project){
                return `
                  <table border="1" class="project-popup" style="border-collapse: collapse;">
                    <thead>
                        <tr>
                        <th>属性</th>
                        <th>内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>非遗项目名称</td>
                            <td>${project.name}</td>
                        </tr>
                        <tr>
                    </tbody>
                </table>
                `
            }

        },
        mounted() {
            this.initMap()
        },
    }
</script>
<style lang="less" scoped>
    .map{
        height: calc(100vh - 100px);
        width: 100%;
    }
    .ol-popup {
        position: absolute;
        background-color: white;
        -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
        filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #cccccc;
        bottom: 12px;
        left: -50px;
        min-width: 180px;
	}
    .ol-popup:after,
    .ol-popup:before {
        top: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }

    .ol-popup:after {
        border-top-color: white;
        border-width: 10px;
        left: 48px;
        margin-left: -10px;
    }

    .ol-popup:before {
        border-top-color: #cccccc;
        border-width: 11px;
        left: 48px;
        margin-left: -11px;
    }

    .ol-popup-closer {
        text-decoration: none;
        position: absolute;
        top: 2px;
        right: 8px;
    }

    .ol-popup-closer:after {
        content: "✖";
        // content: "关闭";
    }
    .el-header{
        padding: 0;
    }
    .el-main{
        position: relative;
        .layers-list{
            position: absolute;
            top:70px;
            right: 50px;
            background-color: #333333;
            color: #cccccc;
            border-radius: 5px;
            width: 100px;
            li{
                height: 30px;
                line-height: 30px;
                padding-left: 5px;
                // padding: 10px;
            }
        }
    }
</style>