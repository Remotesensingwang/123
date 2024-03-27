<template >
    <div>
       <el-menu
            default-active="/home"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            :collapse=isCollapse
            @select="handleMenu" 
            >
            <h3 class="title" >{{isCollapse ?'后台' :'通用后台管理界面'}}</h3>
            <!-- <el-menu-item index="/">
                <span slot="title" class="title">通用后台管理界面</span>
            </el-menu-item> -->
            <el-menu-item index="/home">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/product">
                <i class="el-icon-menu"></i>
                <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/user">
                <i class="el-icon-menu"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
            <el-submenu index="/qita">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>其他</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/qita/pageone">选项1</el-menu-item>
                    <el-menu-item index="/qita/pagetwo">选项2</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
    </el-menu>
    </div>
</template>
<script>
import home from '@/api/mockServeData/home'
    import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    export default {
        name:'Asider',
        data() {
            return {
                // isCollapse: false,
                menu:[]
            }
        },
        computed: {

            // isCollapse(){
            //     return this.$store.state.tab.isCollapse
            // },
            // ...mapState({isCollapse:state => state.tab.isCollapse})
            ...mapState('tab',['isCollapse'])
        },
        methods: {
            ...mapMutations('tab',{selectMenu:'SELECTMENU'}),
            handleMenu(key){           
                const route= {path:key,label:this.menu.filter((item) => '/'+item.path === key || '/qita/'+item.path === key)[0].meta.title}
                this.selectMenu(route) 
                // this.$store.commit('tab/SELECTMENU',route)
                
                // this.menu.forEach((item) =>{
                //     if ('/'+item.path === key) {
                //         const ss= {path:key,label:item.meta.title}
                //         console.dir(item.meta.title);
                //     }
                // })

            }
        },
        created() {
            const menuData = this.$router.options.routes[0].children //获取layout的配置路由
            const hasChildren = menuData.filter(item => item.children)[0].children //获取二级路由
            const noChildren = menuData.filter(item => !item.children) //获取一级路由
            this.menu =[...hasChildren,...noChildren] //合并

            // console.dir(this);
            // this.$bus.$on('isCollapseevent', (data) =>{
            //     this.isCollapse=data
            // })
        },
    }
</script>
<style lang="less" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-menu{
        height: 100vh;
        border-right: 0;
    .title{   
        padding: 20px;
        color:#fff;
        font-size: 12px;
        cursor: pointer;

    }
    }
    .el-submenu .el-menu-item{
        min-width: 0;
    }
</style>