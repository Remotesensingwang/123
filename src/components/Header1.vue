<template>
    <div class="header-container">
        <div class="l-content">
              <el-button icon="el-icon-menu" size="small" @click="collapse"></el-button>
              <!-- 面包屑 -->
              <!-- <span class="text">首页</span> -->
              <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :to="topath(item)" :key="item.path" >{{item.label}}</el-breadcrumb-item>
              </el-breadcrumb>
        </div>
        <div class="r-content">
               <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        <img class="user" src="../assets/logo.png" alt="">
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-plus" command='logout'>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
        </div>
    </div>
</template>
<script>
    import Cookie from 'js-cookie'
    import {mapState,mapMutations} from 'vuex'
    export default {
        name:'Header1',
        data() {
            return {
                isCollapse: false
            }
        },
        computed: {
            ...mapState('tab',{tags:'tabsList'}) //namespaced存在 ...mapState('tab',['tabsList']})
        },
        methods: {
            ...mapMutations('tab',{collapsemenu:'COLLAPSEMENU'}),
            collapse(){
                this.isCollapse=!this.isCollapse
                // this.$store.commit('tab/COLLAPSEMENU') 
                this.collapsemenu()
                // this.$nextTick( () =>{
                //     console.dir(this);
                //     console.dir('nexttick');
                // })
                // this.$bus.$emit('isCollapseevent', this.isCollapse)

            },
            topath(item){
                if (this.$route.path !== item.path && !(this.$route.path ==='/home' && item.path ==='/')){
                    return {path:item.path}
                }
            },
            handleCommand(command){
                console.log(command);
                if (command === 'logout') {
                    Cookie.remove('token')
                    this.$router.push({name:'login'})
                }
            }
        },
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
            /deep/.el-breadcrumb{
                margin-left: 20px;
                .el-breadcrumb__item{
                    .el-breadcrumb__inner{
                        &.is-link{
                            color: #666;
                            font-weight: 400;
                            // cursor: pointer;
                        } 
                    }
                    &:last-child{
                        .el-breadcrumb__inner{
                            color: #fff;
                            
                        }
                } 
                }

            }
            
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