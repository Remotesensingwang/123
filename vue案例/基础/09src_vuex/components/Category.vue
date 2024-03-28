<template >
    <div class="category">
        <h3>{{title}}</h3>
        <slot :games='games'></slot>
        <!-- <slot name="center"></slot>
        <slot name="footer"></slot> -->
    </div>
</template>
<script>
    export default {
        name:'Category', 
        props:['title'],
        data() {
            return {
                games:['红色警戒','穿越火线','劲舞团','超级玛丽']
            }
        },   
    }
</script>
<style scoped>
    .category{
        background-color: pink;
        width: 200px;
        height: 300px;
        float: left;
        margin-left: 50px;
    }
    h3{
        text-align: center;
        background-color: skyblue;
    }
    img,video{
        width: 100%;
    }
    /* a{
        display: block;
        text-align: center;
    } */
</style>