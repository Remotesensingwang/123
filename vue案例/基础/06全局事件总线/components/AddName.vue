<template >
    <div class="box">
        <input class="inputHobby" type="text" placeholder="请输入一个爱好" @keyup.enter="addHobby">
        
        <div class="hobby">
            <ul>
                <li v-for="item in todos" :key="item.id">
                    <input type="checkbox"  :checked="item.done" @change="hobbyChange(item.id)"> {{item.title}} 
                    <button @click="delhobby(item.id)" class="delteItem">删除</button>
                </li>
            </ul>
        </div>
        <div class="footer" v-show="total">
            <!-- v-model 在单个复选框时 只有两个结果布尔值 为真是checked=true 此时你设置checked没有用 -->
             <!-- v-model 在单选框时 如果不设置value 则单选都可以选 v-moder=“s” 此时s的值为value的值 -->
            <input type="checkbox" v-model="isAll"> 已完成{{finfish}}/全部{{total}}
        <!-- <input type="checkbox" :checked="isAll" @change="Allfinfish"> 已完成{{finfish}}/全部{{total}} -->
            <button class="remover" @click="removeTodo">清空所有已完成的事项</button>
        </div>
    </div>
</template>
<script>
    export default {
        name:'AddName',
        data(){
            return{
                todos:[{ id:'001',title:'起床',done:true},
                       { id:'002',title:'睡觉',done:false},
                       { id:'003',title:'学习',done:true}               
            ],
            }
        },
        methods:{
            addHobby(e){
                if(!e.target.value.trim()) return
            //this.todos.unshift({id:'00'+(this.todos.length+1),title:this.msg,done:'false'})
             this.todos.unshift({id:'00'+(this.todos.length+1),title:e.target.value,done:false})
             e.target.value=''
            },
            delhobby(id){
                if(confirm('确定删除?')){   
                    this.todos =this.todos.filter(to=>to.id !== id)
                    console.dir(id)
                }
            },
            hobbyChange(id){
                console.log(id);
                this.todos.forEach(element => {  
                    if(element.id === id) element.done =!element.done
                })
            },
            
            removeTodo(){
                window.console.log('this')
                this.todos =this.todos.filter(todo=>{
                    // return todo.done === false
                    return !todo.done
                })
            },
            // Allfinfish(e){
            //     if(e.target.checked) this.todos.forEach(element => element.done = true)
            //     else  this.todos.forEach(element => element.done = false)
            // }
        },
        computed:{
        finfish(){
            // let i = 0
            // this.todos.forEach(element => { if (element.done === true) i++ })
            // return i
            return this.todos.reduce((pre,curr) =>{
                return pre +(curr.done ? 1:0)
            },0)
        },
        total() {
            return this.todos.length
        },
        isAll:{
            get(){
                return this.finfish===this.total && this.total>0
            },
            set(val){ 
                // console.dir(val);
                if(val) this.todos.forEach(element => element.done = true)
                else  this.todos.forEach(element => element.done = false)
                // this.todos=this.todos.map(element => element.done = true)
            }
        }


    },
        watch:{
            
        },
        props:{
        },
    }
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
    .box{
        width: 560px;
        height: 400px;
        margin: 20px auto;
        border: 2px solid pink;
        /* background-color: pink; */
        border-radius: 5px;
        box-sizing: border-box;
        padding: 20px;
    }
    .inputHobby{
        width: 100%;
        height: 30px;
        /* padding-left: 5px; */
        padding: 4px 7px;
        outline: none;
        border: 1px solid #ccc;
		border-radius: 4px;
        font-size: 14px;

    }
    .hobby{
        margin: 20px 0;
        width: 100%;
        /* height: 300px; */
        /* background-color: pink; */
    }

    ul{
       list-style: none;
       padding: 0;
    }
    ul li{
        width: 100%;
        height: 30px;
        line-height: 30px;
        border: 1px solid pink;
        border-radius: 4px;
        border-bottom: 0;
        padding-left: 5px;
    }
    ul li:hover{
        background-color: #ddd;
    }
    ul li:hover button  {
        display: block;
        
    }
    ul li:nth-last-child(1){
        border-bottom: 1px solid pink;
    }
    .delteItem{
        float: right;
        /* display: none; */
        height: 20px;
        width: 80px;
        border: none;
        border-radius: 4px;
        margin: 5px;
        vertical-align: middle;
        background-color: #999;
        cursor: pointer;
        
    }
    .footer{
        margin-top:20px;
        padding-left: 5px;
        padding-right: 10px;
    }
    .remover{
        width: 150px;
        height: 30px;
        border: 0;
        border-radius: 4px;
        background-color: #999;
        float: right;
        cursor: pointer;
       
    }
</style>