<template>
    
     <el-container>
        <el-header><Header_map/></el-header>
        <el-main>
            <div id="map" class="map"></div>
            	<div id="popup" class="ol-popup" ref="container">
                    <a href="#" id="popup-closer" class="ol-popup-closer" ref="closer"></a>
                    <div id="popup-content"></div>
                </div>
            </el-main>
    </el-container>   
    
</template>
<script>
    import Map from 'ol/Map.js'
    import View from 'ol/View.js'
    import TileLayer from 'ol/layer/Tile.js'
    import OSM from 'ol/source/OSM.js'
    import Vector from 'ol/source/Vector';
    import VectorLayer from 'ol/layer/Vector';
    import Header_map from '@/components/Header_map.vue'
    import 'ol/ol.css'
    import GeoJSON from 'ol/format/GeoJSON'
    import {Style,Icon} from 'ol/style'
    import Overlay from 'ol/Overlay'
    export default {
        data() {
            return {
                map:null,
                overlay:null
            }
        },
        components:{Header_map},
        methods: {
            initMap(){
            let view =new View({
                // center: [0, 0],
                extent: [80, 20, 130, 40],
                zoom: 5,
                minZoom: 5,
                MaxZoom: 14,
                // 设置成都为地图中心
                center: [103.39, 35.56],
                // 指定投影使用EPSG:4326
                projection: 'EPSG:4326',
            });

            var qingdao={
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
            var vectorSource = new Vector({
                features: (new GeoJSON()).readFeatures(qingdao)
            });
            
            // vectorSource.addFeature(new ol.Feature(new ol.geom.Circle([5e6, 7e6], 1e6)));
            const image=new Icon(({
                anchor: [0.5, 0.9],
                src: 'http://support.supermap.com.cn:8090/iserver/iClient/forJavaScript/examples/img/markerbig_select.png'
            }))
            var vectorLayer = new VectorLayer({
                source: vectorSource,
                style: new Style({
                    image: image
                }),
            });


            var layer = new TileLayer({
                source: new OSM()
            });

            var overlay = new Overlay({
                element: this.$refs.container,
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
		    });

            /**
             * 为弹窗添加一个响应关闭的函数
             */
            // this.$refs.closer.onclick = function () {
            //     overlay.setPosition(undefined);
            //     this.$refs.closer.blur();
            //     return false;
            // };

            this.map =new Map({
                layers: [
                    // new ol.layer.Tile({ source: new ol.source.OSM()}),
                    layer,
                    vectorLayer
                ],
                overlays: [overlay],
                view,
                target: 'map'
            })

            this.map.on('singleclick',(e)=>{
                console.dir(this);
                this.map.forEachFeatureAtPixel(e.pixel,  (feature) => {
                if (feature.getProperties().name) {
                    console.dir(this);
                    // this.map.getTargetElement().style.cursor = 'pointer';
                    var contentHTML = feature.getProperties().name;
                    this.$refs.container.innerHTML = contentHTML;
                    overlay.setPosition(feature.getGeometry().getCoordinates());
                    // this.map.addOverlay(overlay);
                }
                })
            })
            },
            clickfn(e){
                this.map.forEachFeatureAtPixel(e.pixel, function (feature) {
                if (feature.getProperties().name) {
                    this.map.getTargetElement().style.cursor = 'pointer';
                    var contentHTML = feature.getProperties().name;
                     this.$refs.container.innerHTML = contentHTML;
                    overlay.setPosition(feature.getGeometry().getCoordinates());
                    // this.map.addOverlay(overlay);
                }
                })
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
        min-width: 280px;
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
        // content: "✖";
        content: "关闭";
    }
    .el-header{
        padding: 0;
    }
</style>