<template >
    <div>   
        <el-row>
            <el-col :span="8" style="padding-rigrt:10px">
                    <el-card>
                        <div  class="user">
                            <img src="../../assets/logo.png" alt="">
                            <div class="userinfo">
                                <p class="name">Admin</p>
                                <p class="access">超级管理员</p>
                            </div>
                        </div>
                        <div class="login-info">
                            <p>上次登录的时间：<span>2021-7-19</span></p>
                            <p>上次登录的地点：<span>武汉</span></p>
                        </div>
                    </el-card>

                    <el-card class="box-card">
                            <el-table
                            :data="tableData"
                            style="width: 100%">
                                <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val"></el-table-column>
                            </el-table>
                    </el-card>

            </el-col>

            <el-col :span="16" style="padding-left:10px">
                <div class="num">
                    <el-card v-for="item in countData" :key="item.name" 
                    :body-style="{display:'flex',padding:'0'}">
                        <i class="icon" :class="`el-icon-${item.icon}`"></i>
                        <div class="detail">
                            <p class="price">{{item.val}}</p>
                            <p class="desc">{{item.name}}</p>
                        </div>
                    </el-card>
                </div>

                <el-card class="lineChart">
                    <div ref="echarts1" style="height:260px"></div>
                </el-card>
                <div class="charts">
                    <el-card>
                        <div ref="echartsBar" style="height:260px"></div>
                    </el-card>

                    <el-card>
                        <div ref="echartsPie" style="height:260px"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {getData} from '@/api'
    import * as echarts from 'echarts'
    export default {
        name:'Home',
        data() {
            return {
                tableData:[],
                tableLabel:{
                    name:'手机',
                    todayBuy:'今日购买',
                    monthBuy:'本月购买',
                    totalBuy:'总购买'
                },
                orderData:[],
                countData:[
                    {
                        name:'今日支付订单',
                        val:1234,
                        icon:"success",
                        color:"#2ec7c9"
                    },
                    {                                        
                        name:'今日收藏订单',
                        val:12,
                        icon:"success",
                        color:"#2ec7c0"
                    },
                    {                                        
                        name:'今日未支付订单',
                        val:12,
                        icon:"success",
                        color:"#2ec7c0"
                    },
                    {                                        
                        name:'本月支付订单',
                        val:12,
                        icon:"success",
                        color:"#2ec7c0"
                    }, 
                    {                                        
                        name:'本月未支付订单',
                        val:12,
                        icon:"success",
                        color:"#2ec7c0"
                    }, 
                    {                                        
                        name:'本月收藏订单',
                        val:12,
                        icon:"success",
                        color:"#2ec7c0"
                    },                      
                ]
            }
        },
        mounted() {
            getData().then(({data}) => {
                // console.log(data.data);
                const {tableData,orderData,userData,videoData}=data.data
                this.tableData=tableData
                // this.orderData=orderData
                // console.log(orderData);
                
                const echarts1 = echarts.init(this.$refs.echarts1)
                var echarts1option={}
                const echarts1xAxis = Object.keys(orderData.data[0])
                const xAixsData={
                    data:echarts1xAxis
                }

                echarts1option.xAxis=xAixsData
                echarts1option.yAxis={}
                echarts1option.legend=xAixsData
                echarts1option.tooltip={},
                echarts1option.series=[]
                echarts1xAxis.forEach(key => {
                     echarts1option.series.push({
                        name:key,
                        type:'line',
                        data:orderData.data.map(item =>
                        item[key]
                    )})           
                });
                // console.log(orderData.data);
                      // 使用刚指定的配置项和数据显示图表。
                echarts1.setOption(echarts1option);


                // 柱状图
                const echartsBar = echarts.init(this.$refs.echartsBar)
                // var echartsBarOption={}
                // console.log(Object.keys(userData[0]).slice(1))
                // echartsBarOption.tooltip={trigger:"axis"}
                // echartsBarOption.legend={
                //     data:Object.keys(userData[0]).slice(1)
                // }
                // const echartsBarOptionxAxis = userData.map(item =>item.data)
                // console.log(echartsBarOptionxAxis);
                // const barxAixsData={
                //     data:echartsBarOptionxAxis
                // }
                // echartsBarOption.xAxis=barxAixsData
                // echartsBarOption.yAxis={}
                // echartsBarOption.series=[]
                // Object.keys(userData[0]).slice(1).forEach(key => {
                //     echartsBarOption.series.push({
                //     name:key,
                //     type:'bar',
                //     data:userData.map(item => item[key])
                // })  
                // });
                // console.log(echartsBarOption.series);
                // echartsBar.setOption(echartsBarOption)
                const echartsBarOption={
                    legend:{
                        // 图例文字颜色
                        textStyle:{
                            color:'#333',
                        },
                    },
                    grid:{
                        left:'20%',
                    },
                    // 提示框
                    tooltip:{
                        trigger:"axis",
                    },
                    xAxis:{
                        type:'category', //类目轴
                        data:userData.map(item =>item.data),
                        axisLine:{
                            lineStyle:{
                                color:"#17b3a3",
                            },
                        },
                        axisLabel:{
                            interval:0,
                            color:"#333",
                        },
                    },
                    yAxis:[
                        {
                            type:'value',
                            axisLine:{
                                lineStyle:{
                                    color:"#17b3a3",
                                },
                            },
                        },
                    ],
                    color: ["#2ec7c9","#b6a2de"],
                    series:[
                        {
                            name:'News',
                            type:'bar',
                            data:userData.map(item => item.new)
                        },
                        {
                            name:'Active',
                            type:'bar',
                            data:userData.map(item => item.active)
                        }
                    ]
                }
                echartsBar.setOption(echartsBarOption)

                const echartsPie = echarts.init(this.$refs.echartsPie)
                const echartsPieOption={
                    tooltip:{
                        trigger:'item',
                    },
                    color:[
                        "#0f78f4",
                        "#dd536b",
                        "#9462e5",
                        "#a6a6a6",
                        "#e1bb22",
                        "#39c362",
                        "#3ed1cf",
                    ],
                    series:[
                        {
                            data:videoData,
                            type:'pie'
                        }
                    ]

                }

                echartsPie.setOption(echartsPieOption)

            }).catch((err) => {
                console.log(err);
            });

            getData().then((data) => {
                console.log('@@@@',data);
            }).catch((err) => {
                console.log(err);
            });
        },

    }
</script>
<style lang="less" scoped>
    .user{
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #999999;
        img{
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }
        .userinfo {
            .name{
                font-size: 32px;
                margin-bottom: 10px;
            }
            .access{
                color: #999999
            } 
        }
        

    }
    .login-info{
        margin-top: 20px;
        // padding-left: ;
        p{
            font-size: 14px;
            color: #999999;
            line-height: 28px;
            span{
                margin-left: 60px;
                color:#666666
            }
        }
    }
    .box-card{
        margin-top: 20px;
        height: 460px;
    }
    .num{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        // margin-left: 10px;
        .el-card{
            width: 32%;
            // height: 80px;
            margin-bottom: 20px;
        }

        .icon{
            width: 80px;
            height: 80px;
            text-align: center;
            font-size: 30px;
            line-height: 80px;
            color: #fff;
            background-color: #999999;
        }
        .detail{
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 15px;
            .price{
                font-size: 30px;
                margin-bottom: 10px;
                line-height: 30px;
            }
            .desc{
                font-size: 14px;
                color: #999999;
                // text-align: center;
            }
        }
    }
    .lineChart{
        height: 280px;
    }
    .charts{
        display: flex;
        justify-content: space-between;
        height: 280px;
        margin-top: 20px;
        .el-card{
            width: 48%;
        }
    }
</style>