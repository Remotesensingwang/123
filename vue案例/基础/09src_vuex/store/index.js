import Vue from 'vue'
import Vuex from 'vuex'

// 在创建store实例之前要引用vuex!!!!!
Vue.use(Vuex)

//准备actions——用于响应组件中的动作
const actions = {
  // context MINI store
    jia(context,value){
        // console.dir(context);
        context.commit('JIA',value)
        
    },

    jian(context,value){
      context.commit('JIAN',value)
    },

    addOdd(context,value){
        // if(context.state.sum %2 !==0){
        if(context.state.sum %2){
            context.commit('JIA',value)
        }
    },


    addWait(context,value){
        setTimeout(() => {
        context.commit('JIA',value)
        }, 500);
    }
        
}

//准备mutations——用于操作数据（state）
const mutations = {
    JIA(state,value){
        state.sum=state.sum+value
        // console.dir(state.sum);
    },
    JIAN(state,value){
      state.sum=state.sum-value
  },
  
}

// 准备stat——用于存储数据
const state ={
    sum:0,
    address:'北京',
    subject:'Vue'
}

//准备getter——用于将stats中的数据进行加工
const getters ={
    bigNum(state){
        return state.sum *10
    }
}

const store = new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})

export default store
