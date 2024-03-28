<template >
    <ul>
        <li :style="{opacity}">欢迎学习</li>
        <li>
            001<!-- 缓存路由组件 -->
            <input type="text">
        </li>
        <li>
            002<!-- 缓存路由组件 -->
            <input type="text">
        </li>
        <li>
            003<!-- 缓存路由组件 -->
            <input type="text">
        </li>
        <li>
            004<!-- 缓存路由组件 -->
            <input type="text">
        </li>
    </ul>
</template>
<script>
    export default {
        name:'News',
        data() {
            return {
                opacity:1
            }
        },
        // mounted() {
        //     this.timer = setInterval(()=>{
        //         console.dir('@');
        //         this.opacity-=0.01
        //         if(this.opacity <=0) this.opacity =1
        //     },20)
        // },
        // beforeDestroy() {
        //     console.dir('News组件即将被销毁了');
        //     clearInterval(this.timer)
        // },

        activated() {
            // console.dir('News组件被激活了');
            this.timer = setInterval(()=>{
                // console.dir('@');
                this.opacity-=0.01
                if(this.opacity <=0) this.opacity =1
            },20)
        },
        deactivated() {
            // console.dir('News组件即将失活');
            clearInterval(this.timer)
        },
    }
</script>
<style>
    
</style>