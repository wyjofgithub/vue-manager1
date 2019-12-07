<template>
    <div class="login-wrap" style="background-image:url()">
        <div class="ms-login" >
            <div class="ms-title">后台管理系统</div>
            <el-form :model="ruleForm"   ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.userName" placeholder="请输入登陆名">
                        <el-button slot="prepend" icon="iconfont icon-yonghuming"></el-button>
                    </el-input>
                </el-form-item>
                <br>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.userPassword" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="iconfont icon-lunkuodasan-"></el-button>
                    </el-input>
                </el-form-item>
                <br>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')" :loading="flg">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    userName: '',
                    userPassword: ''
                },
                flg:false
                
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.flg=true;
                         this.$axios.post("/userLogin",this.ruleForm).then(result=>{
                             if(result.data.code==200){
                                 console.log(result.data.data)
                                 localStorage.setItem('OPPO_MY_TOKEN',result.data.data)
                                 this.$router.push({ path: '/page_index'})
                             }
                             this.flg=false;
                         })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>