<template >
    <ul>
        <li v-for="msg in msgList" :key="msg.id">
            <!-- 跳转路由并携带params参数 to的字符串写法 -->
            <!-- <router-link :to="`/home/msg/detail/id=6666/title=nihao`">{{msg.title}}</router-link> -->
            <!-- <router-link :to="`/home/msg/detail/${msg.id}/${msg.title}`">{{msg.title}}</router-link> -->

            <!-- 跳转路由并携带params参数 to的对象写法  --> 
            <router-link :to="{
                // path:'/home/msg/detail', 注意用params传递参数时 不允许用path传递路径 必须要用name传路径!!!!!!!!
                name:'xiangqing',
                params:{
                    id:msg.id,
                    title:msg.title
                }
            }">
                {{msg.title}}
            </router-link>

            <!-- 編程式路由 -->
            <button @click="pushShow(msg)">push查看</button>
            <button @click="replaceShow(msg)">replace查看</button>


        </li>
        <router-view></router-view>
    </ul>
</template>
<script>
    export default {
        name:'Msg',
        data() {
            return {
                msgList:[
                    {id:'001',title:'消息001'},
                    {id:'002',title:'消息002'},
                    {id:'003',title:'消息003'},
                ]
            }
        },
        destroyed() {
            // console.dir('Msg组件即将被销毁了');
        },
        methods: {
            pushShow(msg){
                // console.dir(this.$router);
                this.$router.push({
                    // path:'/home/msg/detail', 注意用params传递参数时 不允许用path传递路径 必须要用name传路径!!!!!!!!
                    name: 'xiangqing',
                    params: {
                        id: msg.id,
                        title: msg.title
                    }
                })
            },
            replaceShow(msg){
                this.$router.replace({
                    // path:'/home/msg/detail', 注意用params传递参数时 不允许用path传递路径 必须要用name传路径!!!!!!!!
                    name: 'xiangqing',
                    params: {
                        id: msg.id,
                        title: msg.title
                    }
                })

            }
        },
    }
</script>
<style>
    
</style>