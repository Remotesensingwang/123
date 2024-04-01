<template>
    <div class="header-container">
        <div class="l-content">
              <el-button size="small" @click="toHome">首页</el-button>             
        </div>
        <div class="r-content">

        </div>
    </div>
</template>
<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
        name:'Header_map',
        data() {
            return {
                // isCollapse: false
            }
        },
        computed: {
           
        },
        methods: {
            toHome(){
                this.$router.push({name:'home'})
            }
        }
    }
</script>

<style lang="less" scoped>
    .header-container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        height: 60px;
        // width: calc(100vw - 200px);
        background-color: #333;
        .l-content{
            display: flex;
            align-items: center;        
        }
        .text{
            margin-left: 20px;
            font-size: 14px;
            color: #fff;
        }
        .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
        }
    }
</style>