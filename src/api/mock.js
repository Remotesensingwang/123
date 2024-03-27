import Mock from 'mockjs'
import homeAPI from './mockServeData/home'
import userAPI from './mockServeData/user'

// 定义首页获取数据
Mock.mock('/api/home/getData',homeAPI.getStatissticalData)

// 定于用户页获取数据
Mock.mock('/api/user/add','post',userAPI.createUser)
Mock.mock('/api/user/edit','post',userAPI.updatedUser)
Mock.mock('/api/user/del','post',userAPI.deleteUser)
Mock.mock(/api\/user\/getUser/,userAPI.getUserList)  //以/api/user/getUser开头 /{正则表达式}/