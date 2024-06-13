import request from '@/utils/request'


// 请求首页数据
// export const getData=()=>{
//   // console.log(this); //undefined
//   return request.get('/home/getData')
// }


// 请求首页数据
export function getData (){
  // console.log(this); //undefined
  return request({
    url:'/home/getData',
    method:'get',
  }) 
}

export function getPoint (){
  return request({
    url:'/students',
    method:'get',
  }) 
}



// 请求用户 如果用这个 User.vue中要使用
// getUser({params:{...this.userForm,...this.pageData}}).then()

// export const getUser=(params)=>{
//   // 返回用户列表
//   return request.get('/user/getUser',params)
// }


// 请求用户
export function getUser (params){
  console.dir(params)
  return request({
    url:'/user/getUser',
    method:'get',
    params
  }) 

}

// 新增用户
 export function addUser (data){
  return request({
    url:'/user/add',
    method:'post',
    data
  }) 
}

 // 编辑用户
 export function editUser (data){
  return request({
    url:'/user/edit',
    method:'post',
    data
  }) 
}


 // 删除用户
export function delUser (data){
  return request({
    url:'/user/del',
    method:'post',
    data
  }) 
}