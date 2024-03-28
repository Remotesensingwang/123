<template>
    <div class="row">
        <div v-show="info.users.length" class="card" v-for="(item, index) in info.users" :key="index">
            <a :href="item.html_url" target="_blank">
            <img :src="item.avatar_url" style='width: 100px'/>
            </a>
            <p class="card-text">{{item.login}}</p>
        </div>

        <h1 v-show="info.isFirst">欢迎使用</h1>
        <h1 v-show="info.isLoding">加载中</h1> 
        <h1 v-show="info.errmsg">{{info.errmsg}}</h1> 
    </div>
</template>
<script>
    export default {
        name:'List',
        data() {
            return {
                info:{
                    isFirst:true,
                    isLoding:false,
                    errmsg:'',
                    users:[]
                }
               
            }
        },
        mounted() {
            this.$bus.$on('getData', (dataObj) =>{
                // 可以进行替换，这样dataobj里面的数据可以少写 
                this.info ={...this.info,...dataObj} 
            })
        },
    }
</script>
<style scoped>
    .album {
    min-height: 50rem; /* Can be removed; just added for demo purposes */
    padding-top: 3rem;
    padding-bottom: 3rem;
    background-color: #f7f7f7;
    }

    .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
    }

    .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
    }

    .card-text {
    font-size: 85%;
    }
</style>