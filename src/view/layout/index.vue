<template>
    <div>
        <el-container>
            <el-aside>
                <Asider></Asider>
            </el-aside>
            <el-container>
                <el-header>
                    <Header1/>
                </el-header>
                <Tag/>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script> 
    import Asider from '@/components/Asider.vue'
    import Header1 from '@/components/Header1.vue'
    import Tag from '@/components/Tag'
    // import Asider from '../components/Asider'
    export default {
        // name: "Main",
        components: {Asider,Header1,Tag},
    }
</script>
<style scoped>
.el-header{
    padding: 0;
}
  .el-aside {
    width: auto !important
  }
    /* .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  } */
</style>
