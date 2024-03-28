<template >
    <div class="context">
       About
    </div>
</template>
<script>
    export default {
        name:'About',
        // beforeDestroy(){
        //     console.dir('About组件即将被销毁')
        // },
        // mounted() {
        //     console.dir('About组件挂载完毕')
        //     console.dir(this);
        // },

        //进入守卫 通过路由规则,进入该组件时被调用
        beforeRouteEnter (to, from, next) {
            // ...
            console.dir('beforeRouteEnter被调用')
            next()
        },

        //离开守卫 通过路由规则,离开该组件时被调用
        beforeRouteLeave (to, from, next) {
            // ...
            console.dir('beforeRouteLeave被调用')
            next()
        }
    }
</script>
<style>
    
</style>