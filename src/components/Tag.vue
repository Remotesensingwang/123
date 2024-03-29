<template >
    <div class="tag"><!-- type="info" -->
       <el-tag 
            :key="tag.path"
            v-for="(tag,index) in tags"
            :closable="tag.label !=='首页'"
            
            :effect="$route.path === tag.path ? 'dark' : 'plain'"
            :disable-transitions="false"
            @close="handleClose(tag,index)"
            @click="handleChange(tag)">
            {{tag.label}}
        </el-tag>
        <input type="text" name="" id="" v-model="data1">
        <input type="radio" name="1" id="" :value="1" v-model="data2" > 男
        <input type="radio" name="1" id="" :value="2" v-model="data2" > 女         
    </div>
</template>
<script>
    import {mapState,mapMutations} from 'vuex';
    export default {
        name:'Tag',
        data() {
            return {
                data1:'', //永远都是字符串 除非v-model.number="data1"
                data2:'' //可以变成数字(:value="1")
            }
        },
        computed: {
            ...mapState('tab',{tags:'tabsList'})
        },
        methods: {
            ...mapMutations('tab',{removeMenu:'REMOVEMENU'}),
            handleClose(tag,index){
                // 删除数据
                this.removeMenu(tag)
                // this.$store.commit('tab/REMOVEMENU',tag)
                const length= this.tags.length
                // 删除数据之后的逻辑 路由跳转(三种情况) 
                if(tag.path !== this.$route.path) return
                // 如果删除的是最后一个数据 要向前一个数据跳转
                if(index === length){
                    this.$router.push({path:this.tags[index-1].path})
                } else { //要删除的当前页在前面，删除之后向后移动
                     this.$router.push({path:this.tags[index].path})
                }

            },
            handleChange(tag){
                if (this.$route.path !== tag.path && !(this.$route.path ==='/home' && tag.path ==='/')) {
                    this.$router.push({path:tag.path})
                }
                
            },


        },
        
    }
</script>
<style lang="less" scoped>
    .tag{
        padding: 20px;
        .el-tag{
            margin-right: 15px;
            cursor: pointer;
        }
    }
</style>