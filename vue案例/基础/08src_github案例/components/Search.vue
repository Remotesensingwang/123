<template >
    <div class="jumbotron">
        <h3 class="jumbotron-heading">Search Github Users</h3>
        <div>
            <input type="text" placeholder="enter the name you search" v-model="name" />&nbsp;<button @click="searchName">Search</button>
            <button @click="www">wwww</button>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name:'Search',
        data() {
            return {
                name:'',
            }
        },

        methods: {
            searchName(){
                console.log(this.name)
                //请求更新List数据
                this.$bus.$emit('getData',{isFirst:false,isLoding:true,errmsg:'',users:[]})   
                axios.get(`https://api.github.com/search/users?q=${this.name}`).then(
                    respones => {
                        console.log('请求成功了',respones.data)
                        // this.$bus.$emit('getData',respones.data.items)
                        // 请求成功后更新list数据
                        this.$bus.$emit('getData',{isLoding:false,errmsg:'',users:respones.data.items})  
                    },
                    err => {
                        // 请求失败后更新list数据
                        this.$bus.$emit('getData',{isLoding:false,errmsg:err.message,users:[]})  
                        alert(err.message)

                    });
            },

            www(){
                axios.get('http://api.map.baidu.com/place/v2/search?query=5A%E6%99%AF%E5%8C%BA&tag=%E6%97%85%E6%B8%B8%E6%99%AF%E7%82%B9&region=%E6%AD%A6%E6%B1%89&output=json&ak=M0BSRvYgSAsRMdO6AUxG9FDkDfChgAoG').then(
                    (result) => {
                    console.log(result.data);
                }).catch((err) => {
                    console.log(err.message);
                });
            }
        },
    }
</script>
<style>
    
</style>