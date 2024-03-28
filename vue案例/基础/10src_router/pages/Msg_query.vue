<template >
    <ul>
        <li v-for="msg in msgList" :key="msg.id">
            <!-- <a href="#">{{msg.title}}</a> -->
            <!-- <router-link to="/home/msg/detail?id=666&title=你好">{{msg.title}}</router-link> -->
            
            <!-- 跳转路由并携带query参数 to的字符串写法 -->
            <!-- <router-link :to="`/home/msg/detail?id=${msg.id}&title=${msg.title}`">{{msg.title}}</router-link> -->

            <!-- 跳转路由并携带query参数 to的对象写法 -->
            <router-link :to="{
                // path:'/home/msg/detail',
                name:'xiangqing',
                query:{
                    id:msg.id,
                    title:msg.title
                }
            }">
                {{msg.title}}
            </router-link>
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
    }
</script>
<style>
    
</style>