<template>
    <div class="box">
       <Banner></Banner>

        <div class="center">
            <div class="nav">
                <ul>
                    <li class="home">
                        <!-- <a href="#">home</a> -->
                        <router-link to="/home">home</router-link>
                    </li>

                    <li class="about">
                        <!-- <a href="#">about</a> -->
                        <router-link to="/about">about</router-link>
                    </li>
                </ul>
            </div>
            <!-- <div class="context">123123</div> -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Banner from './components/Banner'
    export default {
        name: 'App',
        components:{Banner}
    }
</script>

<style>
        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        .box{
            width: 800px;
            margin: 10px auto;
        }
        h2{
            font-size: 30px;
            padding: 20px 0;
            border-bottom: 1px solid pink;
        }
       .center{
        width: 100%;
        height: 80px;
        margin-top: 30px;
       }
        .nav{
            float: left;
            width: 200px;
            height: 80px;
            border: 1px solid pink;
            border-radius: 4px;
        }
        .home{
            background-color: #337AB7;
            border-bottom: 1px solid pink;
        }
        .home,
        .about{
            width: 100%;
            height: 50%;
            text-align: center;
            list-style: none;
            line-height: 40px;           
            cursor: pointer;
        }
        .home:hover,
        .about:hover{
            background-color: #337AB7;
        }
        .context{
            float: left;
            height: 100%;
            width: 570px;
            margin-left: 30px;
            line-height: 80px;
            border-bottom: 1px solid pink;
            font-size: 40px;
            font-weight: 700;
        }
        a{
            color: #333;
            text-decoration: none;
        }
</style>