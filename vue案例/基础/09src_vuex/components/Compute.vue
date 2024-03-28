<template >
    <div>
        <h3>当前求和为：{{sum}}</h3>
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="add">+</button>
        <button @click="decrese">-</button>
        <button @click="addodd">奇数再加一</button>
        <button @click="addwait">等一等再加一</button>
    </div>
</template>
<script>
    export default {
        name:'Compute',
        data() {
            return {
                sum:0,
                n:1
            }
        },
        methods: {
            add(){
                this.sum=this.sum+this.n
            },
            decrese(){
                this.sum=this.sum-this.n
            },
            addodd(){
                if(this.sum %2){
                    this.sum=this.sum+this.n
                }
            },
            addwait(){
                setTimeout(() => {
                    this.sum=this.sum+this.n
                }, 500);
            }

        },
    }
</script>
<style scoped>
    button{
        margin-left: 10px;
    }
</style>