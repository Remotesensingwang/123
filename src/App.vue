<template>
    <div>
        <!-- <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main>Main</el-main>
            </el-container>
        </el-container> -->
        <router-view></router-view>

    </div>
</template>
<script>
    export default {
        name: "App",
        // components: { Main },

    }
</script>
<style>
    h1,h2,h3,h4,body,p{
        margin: 0;
        padding: 0;
    }
</style>
