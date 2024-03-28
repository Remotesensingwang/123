export default {
    namespaced:true,
    state:{
        isCollapse:false, //控制菜单是展开还是收起
        tabsList:[        //面包屑数据 默认数据
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'s-home',
                url:'Home/Home'
            },
        ]
        
    },
    mutations:{
        // 控制菜单是展开还是收起
        COLLAPSEMENU(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑
        SELECTMENU(state,val){       
            // 判断添加的数据是否为首页 还要判断里面是否有内容
            if(val.path !== '/home') {
                const index =state.tabsList.findIndex((item)=> item.path===val.path)
                // const index =state.tabsList.indexOf(val) //不能使用indexof方法               
                if (index === -1) {
                    state.tabsList.push(val)
                }
            }
        },
        // 数据移除
        REMOVEMENU(state,val){
            const index =state.tabsList.findIndex((item)=> item.path===val.path)
            state.tabsList.splice(index,1)
        }
    }
}