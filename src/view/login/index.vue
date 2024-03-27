<template >
    <div class="login-info">
        <div class="login">
            <el-form ref="form" label-position='right' :rules="rules" :model="form" label-width="70px">
                <h3>系统登录</h3>
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input ref="input" :type="type" placeholder="请输入密码" v-model="form.password"></el-input>
                    <i class="el-icon-view" @click="handleChange"></i>
                </el-form-item>
                <el-form-item class="button">
                    <el-button  type="primary" @click="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <h1>登录</h1>
    </div>
</template>
<script>
    import Mock from 'mockjs'
    import Cookie from 'js-cookie'
    export default {
        name:'Login',
        data() {
            return {
                form:{
                    username:'',
                    password:'',
                },
                rules:{
                    username:[
                        {required: true,message: '请输入用户名',trigger: 'blur'}
                    ],
                    password:[
                        {required: true,message: '请输入密码',trigger: 'blur'}
                    ],
                },

                num:0,
                type:'password'
            }
        },

        methods: {
            // 判断密码显示与否
            handleChange(){
                if (this.num === 0) {
                    this.type = 'input'
                    this.num=1
                } else{
                    this.type ='password'
                    this.num=0
                }
            },
            //提交信息 
            submit(){
                // token信息
                const token = Mock.Random.guid()
                // 将token信息存入cookie 用于不同页面之间的通信
                Cookie.set('token',token)
                this.$router.push({name:'home'})
            }
        },
    }
</script>
<style lang="less" scoped>

    .login-info{
        position: relative;
        width: 100vw;
        height: 100vh;
        .login{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 350px;
            height: 400px;
            box-sizing: border-box;
            padding: 35px 35px 15px 35px;
            margin-left: -200px;
            margin-top: -200px;
            border: 1px solid #eaeaea;
            box-shadow:  0 0 25px #cac6ca;
            border-radius: 15px;
            background-color: #fff;
            h3{
                margin-bottom: 40px;
                text-align: center;
                color: #505458;
                font-weight: 400;
            }
            .el-input{
                width: 198px;
            }
            .el-icon-view{
                position: relative;
                left: 166px;
                bottom: 40px;
                cursor: pointer;
            }
            .button{
                text-align: center;
                margin-top: -30px;
                .el-button{
                    margin-right: 70px;
                }
            }
        }
    }
</style>