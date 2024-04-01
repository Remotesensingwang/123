import VueRouter from 'vue-router'
import Login from '@/view/login/index'
import Layout from '@/view/layout/index'
import Home from '@/view/layout/Home'
import Product from '@/view/layout/Product'
import User from '@/view/layout/User'
import QiTa from '@/view/layout/QiTa'
import Cookie from 'js-cookie'
import Login1 from '@/view/login/login'
import Map from '@/view/map/index'
const router = new VueRouter({
    // mode:'hash',
    // mode:'history',
    // base:process.env.BASE_URL,
    routes: [
        {
            path:'/',
            component:Layout,
            redirect:'/home',
            children:[
                {
                    name: 'home',
                    path: 'home',
                    component:Home,
                    meta:{title:'首页'}
                },
                {
                    name: 'product',
                    path: 'product',
                    component:Product,
                    meta:{title:'商品管理'},
                },
                {
                    name: 'user',
                    path: 'user',
                    component:User,
                    meta:{title:'用户管理'},
                },
                {
                    name: 'qita',
                    path: 'qita',
                    component:QiTa,
                    redirect:'/qita/pageone',
                    children:[
                        {
                            name: 'pageone',
                            path: 'pageone',
                            component:() => import('@/view/layout/PageOne'),
                            meta:{title:'页面1'},
                        },
                        {
                            name: 'pagetwo',
                            path: 'pagetwo',
                            component:() => import('@/view/layout/PageTwo'),
                            meta:{title:'页面2'},
                        },
                    ]
                }
            ]
        },
        {
            path:'/login',
            name:'login',
            component:Login,
            meta:{title:'登录'}
        },
        {
            path:'/login1',
            name:'login1',
            component:Login1,
            meta:{title:'登录1'}
        },
        {
            path:'/map',
            name:'map',
            component:Map,
            meta:{title:'地图'}
        }

    ]
})

// 全局前置路由守卫-初始化的时候被调用,每一次路由切换之前
// router.beforeEach((to,from,next)=>{
//     console.dir('@前置路由守卫被切换了')
//     console.dir(to);
    
//     // if(to.name === 'xinwen' || to.name === 'xiaoxi'){
//     if(to.meta.isAuth){   //判断是否需要鉴权  给每个route配置一些属性 如页面的标题了 可以通过meta配置项meta{title:'主页',isAuth:true}
//         if(localStorage.getItem('name') === 'root'){
//             // document.title = to.meta.title || 'vue_test'
//             next() 
//             } else{
//                 alert('请先登录')
//         }
//     }
//     else{
//         // document.title = to.meta.title || 'vue_test'
//         next()
//     } 
// })

// 
router.beforeEach((to,from,next)=>{
    // 判断token存不存在
    const token = Cookie.get('token')
    // token不存在 说明没有登录 此时需要跳转到登录页面 如果在登录页面不需要跳转（否则死循环）
    if (!token && to.name !== 'login') {
        next({name:'login'})
    } else if (token && to.name === 'login') { //token存在，说明用户登录，此时如果要跳转的页面是login界面 则直接跳转至首页 
        next({name:'home'})
    } else {
        next()
    }
})


// 后置路由守卫-初始化的时候被调用,每一次路由切换之后,设置页面标题!!! 前置需要写两遍!!! 后置只需写一遍即可!!!!
router.afterEach((to,from)=>{
    // console.dir('@后置路由守卫被切换了')
    document.title = to.meta.title || 'vue_test'
})

export default router