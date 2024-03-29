<template>
    <div>
        <!-- <Category title="游戏">
			<template scope="atguigu">
				<ul>
					<li v-for="(g,index) in atguigu.games" :key="index">{{atguigu.msg}}</li>
				</ul>
            </template>
        </Category> -->
        <router-view></router-view>

    </div>
</template>
<script>
    import Category from './components/Category.vue';
    export default {
        name: "App",
        components: { Category },
        created() {
            console.dir(this);
        },

    }
</script>
<style>
    h1,h2,h3,h4,body,p{
        margin: 0;
        padding: 0;
    }
</style>
