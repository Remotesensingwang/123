import VueRouter from 'vue-router'
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Msg from '../pages/Msg_params'
import Detail from '../pages/Detail'


const router = new VueRouter({
    mode:'hash',
    routes: [
        {
            name: 'guanyu',
            path: '/about',
            component:About,
            meta:{title:'关于'}
        },
        {
            name: 'zhuye',
            path: '/home',
            component:Home,
            meta:{title:'主页'},
            children:[
                {
                    name: 'xinwen',
                    path:'news',
                    component:News,
                    meta:{isAuth:true,title:'新闻'}
                },
                {
                    name: 'xiaoxi',
                    path:'msg',
                    component:Msg,
                    meta:{isAuth:true,title:'消息'},
                    children:[
                        {
                            name: 'xiangqing',
                            // path:'detail', 
                            path:'detail/:id/:title',  // params传参时要添加占位符
                            component:Detail,
                            meta:{title:'详情'},
                            //props的第一种写法,值为对象,该对象中的所有key-value都会以props的形式传给Detail组件(写在哪个组件就传给谁)    
                            // props:{ a:1,b:'hello'}

                            // props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件(局限性)
                            // props:true

                            // props值为函数,所有key-value都会以props的形式传给Detail组件(推荐) 可以用对象解构 props({query})
                            props($route){
                                return {id:$route.params.id,title:$route.params.title}
                            }
                            
                        }
                    ]
                },
            ]
        }
    ]
})

// 全局前置路由守卫-初始化的时候被调用,每一次路由切换之前
router.beforeEach((to,from,next)=>{
    console.dir('@前置路由守卫被切换了')
    console.dir(to);
    
    // if(to.name === 'xinwen' || to.name === 'xiaoxi'){
    if(to.meta.isAuth){   //判断是否需要鉴权  给每个route配置一些属性 如页面的标题了 可以通过meta配置项meta{title:'主页',isAuth:true}
        if(localStorage.getItem('name') === 'root'){
            // document.title = to.meta.title || 'vue_test'
            next() 
            } else{
                alert('请先登录')
        }
    }
    else{
        // document.title = to.meta.title || 'vue_test'
        next()
    } 
})

// 后置路由守卫-初始化的时候被调用,每一次路由切换之后,设置页面标题!!! 前置需要写两遍!!! 后置只需写一遍即可!!!!
router.afterEach((to,from)=>{
    console.dir('@后置路由守卫被切换了')
    document.title = to.meta.title || 'vue_test'
})

export default router