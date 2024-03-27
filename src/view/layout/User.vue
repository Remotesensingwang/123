<template >
    <div class="manage">
        <el-dialog
            title="新增用户"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            width="50%">
            <!-- 表单信息 -->
            <el-form 
                :inline="true" 
                :model="form" 
                label-width="80px" 
                :rules="rules"
                stripe
                ref="form">
                <el-form-item label="姓名" prop="name">
                    <el-input  placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input  placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>  
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker
                        v-model="form.birth"
                        type="date"
                        placeholder="请选择日期"
                        value-format="yyyy-MM-DD">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input  placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="handleAdd">
                +增加
            </el-button>
            <!-- form搜索区 -->
            <!-- <el-form :model="userForm" >
                <el-form-item>
                    <el-input v-model="userForm.name" placeholder="请输入名称"></el-input>
                    <el-button @click="handleSearch" >搜索</el-button>
                </el-form-item>
            </el-form>          -->
            <div>
                    <el-input v-model="userForm.name" placeholder="请输入名称"></el-input>
                    <el-button @click="handleSearch" >搜索</el-button>
            </div>

        </div>
        <!-- 表格展示区 -->
        <div class="common-table">
            <el-table
                :data="tableData"
                style="width: 100%"
                height="90%">
                <!-- <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val"></el-table-column> -->
                <el-table-column
                    fixed
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别">
                    <template slot-scope="scope">
                        <span>{{scope.row.sex == 1 ? '男':'女'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄">
                </el-table-column>
                <el-table-column
                    prop="birth"
                    label="出生日期">
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="地址">
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="操作">
                    <template slot-scope="scoped">
                        <el-button size="mini" @click="handleEdit(scoped.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDel(scoped.row)">删除</el-button>     
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页展示区 -->
            <div class="page">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    @current-change='handlePage'>
                </el-pagination>
            </div>

        </div>

    </div>
</template>
<script>
    import {getUser,addUser,editUser,delUser} from '@/api'
    export default {
        name:'User',
        data() {
            return {
                dialogVisible: false,
                form:{
                    name:'',
                    age:'',
                    sex:'',
                    birth:'',
                    addr:''
                },
                rules:{
                    name:[
                        {required: true,message: '请输入姓名'}
                    ],
                    age:[
                        {required: true,message: '请输入年龄'}
                    ],
                    sex:[
                        {required: true,message: '请选择性别'}
                    ],
                    birth:[
                        {required: true,message: '请选择日期'}
                    ],
                    addr:[
                        {required: true,message: '请输入地址'}
                    ]
                },
                tableData:[],
                tableLabel:{
                    name:'姓名',
                    age:'年龄',
                    sex:'性别',
                    birth:'出生日期',
                    addr:"地址"
                },
                modelType:0, //0表示的是新增用户 1表示更新用户
                total:0,//当前的总条数 默认为0
                pageData:{
                    page:1,
                    limit:10
                },
                userForm:{
                    name:''
                }
            }
        },
        computed: {
            // td(){
            //     return this.tableData.filter(item => item.name.indexOf(this.names) !== -1)
            // }
        },
        methods: {
            // 新增按钮
            handleAdd(){
                this.modelType=0
                this.dialogVisible=true
            },

            // 搜索按钮
            handleSearch(){
                this.getList()
            },

            // 弹窗关闭的时候
            handleClose() {
                this.$refs.form.resetFields()
                this.dialogVisible=false
            },
            
            // 点击取消的时候
            cancel(){
                this.handleClose()
            },

            // 编辑表格
            handleEdit(row){
                this.modelType=1
                this.dialogVisible=true
                // 注意不能直接赋值，否则是引用关系
                this.form =JSON.parse(JSON.stringify(row))
                // console.dir(this.form);
            },

            // 删除操作
            handleDel(row){
                console.log(row)
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        delUser({id:row.id}).then(()=>{
                            //重新获取列表接口
                            this.getList()
                        })
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
            },

            // 提交用户表单输入
            submit(){
                this.$refs.form.validate((valid) =>{
                    if (valid) {
                        // console.log(this.form)
                        
                        // 新增用户（判断是否重复添加）
                        if (this.modelType === 0) {
                            console.dir(this.form.name);
                            const index =this.tableData.findIndex(item => item.name === this.form.name)
                            if (index === -1) {
                                addUser(this.form).then(()=>{
                                // 重新获取列表接口
                                this.getList()
                                // 清空表单信息
                                this.$refs.form.resetFields()
                                // 关闭弹窗
                                this.dialogVisible=false        
                            })
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: '不能重复添加用户!'
                                });
                            }

                        } else { //编辑用户
                            editUser(this.form).then(()=>{
                                // 重新获取列表接口
                                this.getList()
                            })
                            // 清空表单信息
                            this.$refs.form.resetFields()
                            // 关闭弹窗
                            this.dialogVisible=false   
                        }        
                    }
                })
            },

            getList(){
                // 获取列表数据
                // console.dir({...{name:this.userForm},...{params:this.pageData}});
                // console.dir({p:{...this.userForm,...this.pageData}})
                getUser({...this.userForm,...this.pageData}).then(({data})=>{
                    this.tableData=data.List
                    this.total=data.count || 0
                    // this.total =data.List ? data.List.length || 0
                })
            },

            // 分页设置
            handlePage(val){
                this.pageData.page=val
                this.getList()
            }
        },
        mounted() {
            this.getList()
            console.dir(this);
        },
    }
</script>
<style lang="less" scoped>
    .manage{
        height: 90%;
        .manage-header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .el-input{
                width: 200px;
                margin-right: 10px;
            }
        }
        .common-table{
            margin-top: 15px;
            position: relative;
            height: calc(100% - 40px);
            .page{
                position: absolute;
                bottom: 0px;
                right: 20px;
            }

        }
    }
    
</style>