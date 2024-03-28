<template >
    <div class="context">
       Home
       <ul>
            <!-- <a href="#">News</a>
            <a href="#">Msg</a> -->
            <router-link to="/home/news">News</router-link>
            <router-link to="/home/msg">Msg</router-link>
       </ul>
       <keep-alive include="News">
            <router-view></router-view>
       </keep-alive>
       
    </div>
</template>
<script>
    export default {
        name:'Home',
        beforeDestroy(){
            // console.dir('Home组件即将被销毁')
        },
        // mounted() {
        //     console.dir('Home组件挂载完毕')
        //     console.dir(this)
        // }
    }
</script>
<style scoped>
    a{
        text-decoration: none;
        padding: 10px;
        font-size: 16px;
        font-weight: 400;
    }
</style>