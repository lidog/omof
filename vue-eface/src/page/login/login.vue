<!--
 * @Author lizhenhua
 * @version 2017-08-10
 * @description 登录页
 -->
<template>
    <div>
        <div class="page-warp">
            <div class="content-warp">
                <h1 class="login-logo"></h1>
                <h3>人员档案库</h3>
                <div class="form-warp">
                    <div class="form-group mb10">
                        <input class="form-control" v-model="USER_NAME" type="text"  placeholder="登录名"/>
                        <transition name="tips">
                            <span class="err" v-if="userNameState.state">{{userNameState.text}}</span>
                        </transition>
                    </div>
                    <div class="form-group">
                        <input class="form-control" v-model="PASSWORD" type="password" @keyup.enter="login"  placeholder="密码"/>
                        <transition name="tips">
                            <span class="err" v-if="passwordState.state">{{passwordState.text}}</span>
                        </transition>
                    </div>
                    <div class="login-btn" @click="login">登录</div>
                    <div class="KPI-login-btn"><span>KPI登录</span></div>
                </div>
            </div>
            <div class="bottom-tips">© 版权所有佳都科技  系统版本1.0.0.1</div>
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                USER_NAME:'',
                userNameState:{
                    state:false,
                    text:''
                },
                PASSWORD:'',
                passwordState:{
                    state:false,
                    text:''
                }
            }
        },
        methods:{
            login(){
                var userName = this.USER_NAME.trim(), password = this.PASSWORD.trim();
                var patrn=/^[A-Za-z0-9_]{1,16}$/;
                if(userName.length==0){
                    this.userNameState.state = true;
                    this.userNameState.text = "用户名不能为空";
                    return
                }else {
                    this.userNameState.state = false
                    this.userNameState.text = "";
                }
                if(!patrn.test(userName)){
                    this.userNameState.state = true;
                    this.userNameState.text = "用户名必须由1-16位字母，数字，下划线_组成";
                    return
                }else{
                    this.userNameState.state = false
                }

                if(password.length==0){
                    this.passwordState.state = true;
                    this.passwordState.text = "密码不能为空";
                    return
                }else {
                    this.passwordState.state = false;
                }

                if(userName!=='admin'){
                    this.userNameState.state = true;
                    this.userNameState.text = "用户不存在";
                    return
                }else{
                    this.userNameState.state = false
                }

                if(password!=='suntek'){
                    this.passwordState.state = true;
                    this.passwordState.text = "密码不正确";
                    return
                }else {
                    this.passwordState.state = false;
                }

                console.log(userName)
                console.log(password)
                this.$router.push({name:'homePage'});
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "../../assets/css/standard.scss";
    .tips-enter-active,.tips-leave-active{
        transition: all .5s;
    }
    .tips-enter{
        transform: translateX(-20px);
        opacity: 0;
    }
    .tips-leave-to{
        transform: translateX(100px);
        opacity: 0;
    }
    .tips-enter-to,.tips-leave{
        opacity: 1;
        transform: translateX(0px);
    }
    .page-warp{
        position: relative;
        color:#fff;
        width: p(2048);
        height: p(1536);
        box-sizing:border-box;
        background:url("./images/bg.jpg") no-repeat 0 0;
        background-size:cover;
        padding:p(339) 0 0 p(405);
        .content-warp{
            .login-logo{
                width: p(634);
                height: p(105);
                background:url("./images/login-logo.png") no-repeat 0 0;
                background-size:cover;
            }
            h3{
                font-size: p(42);
                font-weight: normal;
                height: p(125);
                line-height: p(125);
                text-align: left;
                position: relative;
                &:after{
                    content: "";
                    position: absolute;
                    bottom:0;
                    left: 0;
                    width: p(98);
                    height: p(4);
                    background-color: #fff;
                }
            }
            .form-warp{
                margin-top: p(127);
                text-align: left;
                .mb10{
                    margin-bottom: p(20);
                }
                .form-group{
                    .form-control{
                        width: p(625);
                        height: p(68);
                        background: transparent;
                        color: #fff;
                        padding-left: p(62);
                        border: none;
                        box-sizing:border-box;
                        font-size: p(26);
                        font-weight: normal;
                        border: 1px solid #667c7d;
                    }
                    .err{
                        font-size: p(26);
                        color: $orangeColor;
                        display: inline-block;
                        margin-left: p(20);
                        padding: p(4) p(10);
                        border-radius: p(6);
                        border: 1px solid #667c7d;
                    }
                }
            }
            .login-btn{
                height: p(68);
                line-height: p(68);
                width: p(628);
                text-align: center;
                font-size: p(26);
                color: #56baca;
                background: url("./images/button-bg.png") no-repeat 0 0;
                margin:p(50) 0 p(20) 0;
                cursor: pointer;
            }
            .KPI-login-btn{
                height: p(68);
                line-height: p(68);
                width: p(628);
                text-align: center;
                font-size: p(26);
                background: rgba(86,186,202,.15);
                color: #56baca;
                cursor: pointer;
            }
        }
        .bottom-tips{
            font-size:p(18);
            color: #8a8a8e;
            position: absolute;
            right: p(27);
            bottom: p(34);

        }
    }
</style>
