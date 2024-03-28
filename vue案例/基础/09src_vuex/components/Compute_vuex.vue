<template >
    <div>
        <!-- <h3>当前求和为:{{$store.state.sum}}</h3>
        <h3>当前求和放大10倍:{{$store.getters.bigNum}}</h3>
        <p>我在{{$store.state.address}}学习{{$store.state.subject}}</p> -->
        <h3>当前求和为:{{sum}}</h3>
        <h3>当前求和放大10倍:{{bigNum}}</h3>
        <p>我在{{address}}学习{{subject}}</p>
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="add(n)">+</button>
        <button @click="decrese(n)">-</button>
        <button @click="addodd">奇数再加一</button>
        <button @click="addwait">等一等再加一</button>
    </div>
</template>
<script>
    import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    export default {
        name:'Compute',
        data() {
            return {
                // sum:0,
                n:1,
            }
        },

        computed: {
            // 借助mapState生成计算属性，从state中读取数据。（对象写法）
            // ...mapState({he:'sum',xuexiao:'address',xueke:'subject'})

            // 不可以进行简写
            // ...mapState({sum:'sum',address:'address',subject:'subject'})

            // 借助mapState生成计算属性，从state中读取数据。（数组写法） sum两个用途,生成计算属性的名字叫sum，在state中读取sum！
            ...mapState(['sum','address','subject']),

            // ...mapGetters({bigNum:'bigNum'}),
            ...mapGetters(['bigNum']),

            // const a=100
            // let obj ={a:'a'} 不可以简写

        },

        methods: {
            // add(){
            //     console.dir(this.$store)
            //     this.$store.dispatch('jia',this.n)
            //     // this.$store.commit('JIA',this.n)
            // },
            // decrese(){
            //     this.$store.dispatch('jian',this.n)
            // },
            
            // 没有参数this.n 需要在上面定义的时候传参
            ...mapMutations({add:'JIA',decrese:'JIAN'}),





 
            addodd(){

                this.$store.dispatch('addOdd',this.n)
            },
            addwait(){

                this.$store.dispatch('addWait',this.n)
            }

        },

        mounted() {
       
        },
    }
</script>
<style scoped>
    button{
        margin-left: 10px;
    }
</style>