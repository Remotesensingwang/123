<template>
     <el-container>
        <el-header><Header_map/></el-header>
        <el-main>
            <div id="map" class="map"></div>
            <div id="popup" class="ol-popup" ref="container">
                <a href="#" id="popup-closer" class="ol-popup-closer" ref="closer" @click="handleClose"></a>
                <div id="popup-content" ref="content"></div>
            </div>
            <!-- 图层列表 -->
            <div class="layers-list">
                <ul>
                    <li v-for="(layer,index) in layers" :key="index">
                        <input type="checkbox" :checked='layer.visible' @change="handleChange(layer.name,index)">{{layer.name}}
                    </li>
                </ul>
            </div>
            
            <!-- 绘制列表 -->
            <div class="draw-list">
                <el-button  type="primary" @click="drawGmo('point')">点</el-button>
                <el-button  type="primary" @click="drawGmo('lineString')">线</el-button>
                <el-button  type="primary" @click="drawGmo('polygon')">面</el-button>
                <el-button  type="primary" @click="stopDraw">停止绘图</el-button>
                <el-button  type="primary" @click="removeDraw">移除绘图</el-button>
            </div>
            <!-- 坐标显示 -->
            <div class="coor" v-show="Lon">
                经度:{{Lon}} 维度:{{Lat}} 层级:{{layer}}
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
    import {OSM,Vector,XYZ,BingMaps,TileDebug,Cluster} from 'ol/source'
    import VectorLayer from 'ol/layer/Vector';
    import GeoJSON from 'ol/format/GeoJSON'
    import {Style,Icon,Stroke,Fill,Circle,Text} from 'ol/style'
    import Overlay from 'ol/Overlay'
    import {getCenter,boundingExtent, closestSquaredDistanceXY} from 'ol/extent'
    import {fromLonLat,transform} from 'ol/proj'
    import {Draw,Select} from 'ol/interaction'
    import axios from 'axios'
    import Feature from 'ol/Feature'
    import Point from 'ol/geom/Point'
    import {getPoint} from '@/api'
    export default {
        data() {
            return {
                map:null,
                overlay:null,
                layers:[
                    // {
                    //     name:'layer',visible:true
                    // }
                ],
                draw:null,
                VectorDraw:null,
                lineLayer:null,
                Lon:0,
                Lat:0,
                layer:5,
            }
        },
        components:{Header_map},
        methods: {
            initMap(){
                const center =  fromLonLat([103.39, 35.56])
                // alert(transform(map.getEventCoordinate(event), 'EPSG:3857', 'EPSG:4326'))
                // var projection = new ol.proj.get("EPSG:3857")

                this.map

                const view =new View({
                    // center: [0, 0],
                    // extent: [80, 20, 130, 40],
                    extent: [center[0]-5000000, center[1]-5000000, center[0]+5000000, center[1]+5000000],
                    zoom: 5,
                    minZoom: 5,
                    MaxZoom: 14,
                    // 设置成都为地图中心
                    center: center,
                    // 指定投影使用EPSG:4326
                    // projection: 'EPSG:4326',
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
                    name:'高德'
                })
                
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
                        // geojsonChinaLayer,
                        // 添加一个显示Open Street Map地图瓦片网格的图层
                        new TileLayer({
                            name:'OSM瓦片',
                            source: new TileDebug({
                            projection: 'EPSG:3857',
                            // tileGrid: baiduMapLayer.getSource().getTileGrid(),
                            tileGrid: OSMLayer.getSource().getTileGrid(),
                            wrapX:false
                            })
                        })
                    ],
                    view,
                    target: 'map'
                })
                console.log(OSMLayer.getSource().getTileGrid().getOrigin()); //topleft
                // 添加一个用于选择Feature的交互方式
                const clickSelect = new Select({
                    multi: true,//可以选择多个features
                    style: new Style({
                        // image: new Circle({
                        //     radius: 10,
                        //     fill: new Fill({
                        //         color: 'blue'
                        //     })
                        // }),
                        fill: new Fill({
                            color: 'rgba(255, 255, 255, 0.4)'
                        }),
                        stroke: new Stroke({
                            color: 'red',
                            width: 1
                        })
                    })
                });
                // this.map.addInteraction(clickSelect)

                // // 添加一个绘制使用的layer
                // this.VectorDraw = new Vector()
                // this.lineLayer =  new VectorLayer({
                //     name: 'c1',
                //     source: this.VectorDraw,
                //     style: new Style({
                //         stroke: new Stroke({
                //             color: 'red',
                //             size: 1
                //         }),
                //         fill: new Fill({
                //             color: 'magenta'
                //         }),
                //         image: new Circle({
                //             radius: 10,
                //             fill: null,
                //             stroke: new Stroke({
                //                 color: 'magenta'
                //             })
                //         })
                //     })
                // })
            
                // // 绘图的矢量图层添加
                // this.map.addLayer(this.lineLayer)

                // console.log('initmap',this.map.getLayers());               
                
                this.setMarker()
                this.addOverlay()
                this.map.on('singleclick',this.singleClick)
                this.map.on('pointermove',this.pointerMove)
                const layers =this.map.getLayers()
                layers.forEach(layer => {
                    this.layers.push({name:layer.get('name'),visible:layer.getVisible()}) 
                })

                //***********************通过监视视图的分辨率变化来获取当前视图的缩放等级*******
                this.map.getView().on('change:resolution',  () =>{
                    this.layer = parseInt(this.map.getView().getZoom())
                    console.log(this.layer,'layer');
                    // console.log(parseInt(this.getZoom()))
                })
            },
            
            //设置图层列表的显示与隐藏
            handleChange(name,index){
                this.layers.forEach((layer)=>{
					if(layer.name === name){
                        layer.visible = !layer.visible
                        // this.map.getLayers().item(index).setVisible(layer.visible)
                        this.map.getLayers().getArray().filter(layer =>{
                            return layer.get('name') === name
                        })[0].setVisible(layer.visible)
                    }
				})      
            },

            //添加矢量图层
            setMarker(){
                const image=new Icon(({
                    anchor: [0.5, 0.9],
                    src: 'http://support.supermap.com.cn:8090/iserver/iClient/forJavaScript/examples/img/markerbig_select.png',
                    // scale: this.map.getView().getZoom() / 10
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
                
                const styleFunction = function(feature,resolution) {
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
                    features: (new GeoJSON()).readFeatures(qingdao,{
                        featureProjection:'EPSG:3857'
                    })
                })
                //聚类图层源
                const clusterSource = new Cluster({
                    source:vectorSource
                })
                const vectorLayerCluster = new VectorLayer({
                    name:'features聚类',
                    source: clusterSource,
                    style: function (feature){
                        // console.log('@@@@@',feature.get('features')[0].get('name'));
                        let size= feature.get('features').length
                        let style=[]
                        style.push(styles[feature.getGeometry().getType()])
                        let style1 =new Style({
                            text: new Text({
                                font: '12px Calibri,sans-serif',
                                text: size.toString(),
                                fill: new Fill({
                                    color: '#eee',
                                    border: 5,
                                    width: 3
                                }),
                                offsetX:0,
                                offsetY:-17,
                            })
                        })
                        style.push(style1)
                        return style
                    }
                })
        
                const vectorLayer = new VectorLayer({
                    source: vectorSource,
                    style: styleFunction,
                    name:'shandong'
                })

                this.map.addLayer(vectorLayerCluster)
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
                // e.stopPropagation()
                let select = false
                // console.log(e);
                const content = this.$refs.content
                this.map.forEachFeatureAtPixel(e.pixel,  (feature) => {
                console.log('feature',feature.get('attr1'))
                // if (feature.get('features')) { //聚类图
                // if (feature.getProperties().name) { //青岛三个
                if (feature.get('attr')) { //武汉
                    
                    const contentHTML=this.mark(feature.getProperties().attr)
                    // const contentHTML=this.mark(feature.get('features')[0].getProperties())
                    console.log('@@@@',feature.getProperties());
                    content.innerHTML = contentHTML
                    this.overlay.setPosition(feature.getGeometry().getCoordinates()) //点坐标
                    // this.overlay.setPosition(fromLonLat(feature.get('center'))) //各个省会城市坐标（fromLonLat(feature.getProperties().center)）
                    select=true
                    
                    //#region 
                        // var extent = boundingExtent(feature.getGeometry().getCoordinates()[0][0]); //获取一个坐标数组的边界，格式为[minx,miny,maxx,maxy]
                        // var center = getCenter(extent);   //获取边界区域的中心位置
                        // map.getView().setCenter(center);  //设置当前地图的显示中心位置
                        // console.log(feature.getGeometry().getCoordinates(),center,extent);
                        // console.log(feature.getProperties().center);
                    //#endregion
                    
                }
                })
                if(!select){
                    this.overlay.setPosition(undefined)
                }

            },
            //鼠标移动事件 显示小手
            pointerMove(e){
                let select = false
                let coordinate = transform( e.coordinate, 'EPSG:3857', 'EPSG:4326')
                // console.log(coordinate);
                this.Lon=coordinate[0].toFixed(3)
                this.Lat=coordinate[1].toFixed(3)
                this.map.forEachFeatureAtPixel(e.pixel,  (feature) => {
                if (feature) { //feature.getProperties().name
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
            },
            // 绘图函数
            drawGmo(type){
                
                // 添加一个绘制使用的layer
                this.VectorDraw = this.VectorDraw ? this.VectorDraw :  new Vector()
                this.lineLayer =  this.lineLayer ? this.lineLayer : new VectorLayer({
                    name: 'c1',
                    source: this.VectorDraw,
                    style: new Style({
                        stroke: new Stroke({
                            color: 'red',
                            size: 1
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
                    })
                })
            
                // 绘图的矢量图层添加
                if (this.map.getLayers().getArray().findIndex(item => {
                    return item.get('name') === this.lineLayer.get('name')
                }) === -1) {
                    this.map.addLayer(this.lineLayer)
                }
                console.log(this.map.getLayers(),'base')
                //设置绘图函数
                const typeList = { point: 'Point', polygon: 'Polygon', lineString: 'LineString' }
                if (this.draw) this.map.removeInteraction(this.draw)
                this.draw = new Draw({
                    type: typeList[type],
                    stopClick: true, //点击鼠标不会触发其他的事件
                    source: this.VectorDraw    // 注意设置source，这样绘制好的线，就会添加到这个source里
                })
                if (this.draw) {
                    this.map.addInteraction(this.draw)
                }
            },
            //停止绘图
            stopDraw(){
                this.map.removeInteraction(this.draw)   
                // region
                    // this.map.on('dblclick', function () {
                    //     this.map.removeInteraction(this.draw)
                    //     console.log(this);
                    // })
                // endregion
            
            },
            //清除绘图
            removeDraw(){
                this.stopDraw()
                this.VectorDraw.clear()
                this.lineLayer.setSource(this.VectorDraw)
                this.map.removeLayer(this.lineLayer)
                console.log(this.map.getLayers())
                // VectorDraw=new ol.source.Vector()
            },
            addfeature(){
                const image=new Icon(({
                    anchor: [0.5, 0.9],
                    src: 'http://support.supermap.com.cn:8090/iserver/iClient/forJavaScript/examples/img/markerbig_select.png',
                    // scale: this.map.getView().getZoom() / 10
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
                const styleFunction = function(feature,resolution) {
                    return styles[feature.getGeometry().getType()]
                }
                // getPoint().then(
                //     response => {
                //         let points = response.data.results
                //         let features =[]
                //         console.log('123123123',response.data.results)
                //     }
                // )
                axios.get('http://localhost:8080/api/students').then(  
                    response => {
                        let points = response.data.results
                        let features =[]
                        points.forEach(point => {
                            const feature = new Feature({
                                geometry: new Point(fromLonLat([point.location.lng,point.location.lat])),
                                attr:point
                            })
                            features.push(feature)
                        })
                        console.log(features);
                        const vectorSource = new Vector({
                            features: features
                        })
                        const vectorLayer = new VectorLayer({
                            source: vectorSource,
                            style: styleFunction,
                            name:'wuhan'
                        })

                        this.map.addLayer(vectorLayer)
                    },
                    error => {
                        console.log('请求失败了',error.message)
                    }
			    )
            },
        },
        mounted() {
            this.initMap(),
            this.addfeature()
            const ipAddress = 'http://api.map.baidu.com/place/v2/search?query=4A%E6%99%AF%E5%8C%BA&tag=%E6%97%85%E6%B8%B8%E6%99%AF%E7%82%B9&region=%E6%AD%A6%E6%B1%89&output=json&ak=M0BSRvYgSAsRMdO6AUxG9FDkDfChgAoG'
            const urlObject = new URL(ipAddress)
            const baseUrl = urlObject.origin + urlObject.port
            console.log(urlObject,baseUrl)
			// axios.get('http://localhost:8080/place/v2/search?query=4A%E6%99%AF%E5%8C%BA&tag=%E6%97%85%E6%B8%B8%E6%99%AF%E7%82%B9&region=%E6%AD%A6%E6%B1%89&output=json&ak=M0BSRvYgSAsRMdO6AUxG9FDkDfChgAoG').then(
            axios.get('http://localhost:8080/api/students').then(  
                response => {
                    // console.log('请求成功了',response.data.results)
                },
                error => {
                    console.log('请求失败了',error.message)
                }
			)
        }
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
        .draw-list{
            position: absolute;
            top:70px;
            right: 170px;
            // background-color: #333333;
        }
    }
</style>