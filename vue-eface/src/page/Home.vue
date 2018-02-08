<!--
 * @Author wenyujian
 * @version 2018-01-30
 * @description 首页模板
 -->
<template>
    <div class="home-page">

       <top-bar>
           <div slot="left" class="left_slot" @click="goBack">
               <i class="el-icon-arrow-left" v-if="topBarLeft !='人脸档案库' "></i>{{topBarLeft}}
            </div>
           <div slot="right" class="right_slot">
               <el-dropdown   @command="handleCommand">
                <span class="demonstration">
                       <i class="icon-admin admin-icon-i"></i>admin
                       <i class="el-icon-arrow-down el-icon-right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item  v-for="item in adminData" :key="item" :command="item">{{item}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span class="icon exit-icon" @click="handleExit"></span>
           </div>
           <div slot="center" class="center_slot">
               <span>{{currentPage[0]}}</span>
               <i class="el-icon-arrow-right" v-if="currentPage[1]"></i>
               <span v-if="currentPage[1]">{{currentPage[1]}}</span>
           </div>
       </top-bar>

       <div class="nav" :style="{width: isCollapse? navCloseWidth+'px': navOpenWidth+'px'}">
            <span class="collapse-icon" @click="handleCollapse">
                <i class="nav-icon nav-icon-1"></i>
            </span>

            <el-menu :default-active="defaultPage" class="menus"
                    @open="handleOpen" 
                    @close="handleClose" 
                    :collapse="isCollapse"
                    :router="true"
                    :unique-opened="true">

                 <el-menu-item index="homePage" :route="{name: 'homePage'}">
                    <i class="nav-icon nav-icon-2"></i>
                    <span slot="title">首页</span>
                </el-menu-item>

                <el-submenu index="ArchivesManager"  :show-timeout="0">
                    <template slot="title">
                        <i class="nav-icon nav-icon-3"></i>
                        <span slot="title">档案库</span>
                    </template>
                    <el-menu-item index="faceArchivesManager" :route="{name: 'faceArchivesManager'}">一人一档</el-menu-item>
                    <el-menu-item index="faceIdentityManager">待确认身份</el-menu-item>
                </el-submenu>

                <el-submenu index="controlLibraryList" :show-timeout="0">
                    <template slot="title">
                       <i class="nav-icon nav-icon-4" ></i>
                        <span slot="title">布控库</span>
                    </template>
                    <el-menu-item index="faceSpecialManager"
                        :route="{name: 'controlLibraryList'}">布控库管理</el-menu-item>
                    <el-menu-item index="realAlarm" >实时告警</el-menu-item>
                    <el-menu-item index="historyAlarm" >告警历史</el-menu-item>
                </el-submenu>

                <el-submenu index="statistics" :show-timeout="0">
                    <template slot="title">
                        <i class="nav-icon nav-icon-5"></i>
                        <span slot="title">抓拍库</span>
                    </template>
                    <el-menu-item index="passengersFaceList">旅客人脸库</el-menu-item>
                    <el-menu-item index="faceVerification" >身份核查</el-menu-item>
                </el-submenu>

                <el-menu-item index="technical" :route="{name: 'technical'}">
                    <i class="nav-icon nav-icon-6"></i>
                    <span slot="title">技战法</span>
                </el-menu-item>

                <el-submenu index="specialManager" :show-timeout="0">
                    <template slot="title">
                        <i class="nav-icon nav-icon-7"></i>
                        <span slot="title">专题库</span>
                    </template>
                    <el-menu-item index="faceSpecialManager"
                        :route="{name: 'faceSpecialManager'}">人员专题库</el-menu-item>
                </el-submenu>
            </el-menu>

       </div>

        <div class="right-con" :style="{left: isCollapse? navCloseWidth-1+'px': navOpenWidth-1+'px'}">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import topBar from 'components/topBar';
const titleMap = {
    homePage: ['首页'],
    faceArchivesManager: ['档案库','一人一档'],
    faceIdentityManager: ['档案库','待确认身份人脸库'],
    controlLibraryList: ['布控库','布控库管理'],
    realAlarm: ['布控库','实时告警'],
    historyAlarm: ['布控库','历史告警'],
    passengersFaceList: ['抓拍库','旅客人脸库'],
    faceVerification: ['抓拍库','身份核查'],
    technical: ['技战法'],
    faceSpecialManager: ['专题库','人员专题库'],
    fSpecialManagerDetail: ['专题库','人员专题库详情'],
    faceStoreDetail: ['布控库','布控库管理详情'],
    faceArchivesManagerDetai: ['一人一档','档案库详情']
}

export default{
    components: {
        topBar
    },
    data: function(){
        return {
            adminData: ['admin', '系统管理员'],
            currentPage: ['首页'],
            menusMap: {
                homePage: ['首页'],
                controlLibraryList: ['档案库','档案库管理'],
                faceSpecialManager: ['专题库','人员专题库']
            },
            defaultPage: 'homePage',
            topBarLeft: '人脸档案库',
            isCollapse: false,
            navOpenWidth: 130,
            navCloseWidth: 58
        }
    },
     watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": "changeRoute"
    },
    methods: {
        handleCollapse: function(){  // 控制侧边菜单展开、收起
             this.isCollapse = !this.isCollapse;
        },
        handleIsCollapse: function(){  // 控制左侧菜单展开收缩
            this.isCollapse = !this.isCollapse;
        },
        handleCommand: function(command){

        },
        changeRoute: function(){
            const path = this.$route.path;  // 获取当前路由
            const curPath =  path.split('/')[1];
            let toPath ='';

            if( curPath == 'home' ){    // 默认跳转首页
                toPath = 'homePage';
            }else{
                toPath = curPath;
            }
            this.defaultPage = toPath;
            this.$router.push(toPath);

            // 监听页面title变化
            this.currentPage = titleMap[toPath];
            if( toPath == 'fSpecialManagerDetail' || toPath == 'faceArchivesManagerDetai'){  // 进入详情页面
           
                 this.topBarLeft ='返回';
            }
        },
        handleOpen: function(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose: function(key, keyPath) {
            console.log(key, keyPath);
        },
        goBack: function(){  //返回上一页
            if(this.topBarLeft != '人脸档案库'){
                 this.$router.back(-1);
                 this.topBarLeft = '人脸档案库';
            }
        },
        handleExit: function(){ // 退出  
            this.$confirm('确定要退出登录吗?', '退出', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.push({name:'login'});
            }).catch(() => {
                          
            });
        }
    },
    created: function(){
        
        this.changeRoute();
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/standard.scss';
$height: 800px;
.home-page{
    .nav{
        position: fixed;
        top: $barHeight;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(to top, #251829, #435968);
        text-align: left;
    }
    .nav{
        transition: all 0.2s ease-out;
        -moz-transition: all 0.2s ease-out;
        -webkit-transition: all 0.2s ease-out;
        -o-transition: all 0.2s ease-out;
        -ms-transition: all 0.2s ease-out;
     }
     .menus{
        transition: all 0.1s;
        -moz-transition: all 0.1s;
        -webkit-transition: all 0.1s;
        -o-transition: all 0.1s;
        -ms-transition: all 0.1s;
     }
    .icon{
        background: url('../assets/images/page-icon.png');
        background-size: p(835) p(679);
        display: inline-block;
        vertical-align: middle;
    }
    .admin-icon{
        background-position: -200px -74px;
        width: 18px;
        height: 18px;
        margin-right: 10px;
    }
    .exit-icon{
        background-position: -157px -1px;
        width: 18px;
        height: 18px;
        margin-left: 14px;
    }
    .right-con{
        position: absolute;
        right: 0;
        top:0;
        background: $bgColor;
        min-height: 100%;
        padding-top: $barHeight;
        box-sizing: border-box;
        transition: all 0.2s ease-out;
        -moz-transition: all 0.2s ease-out;
        -webkit-transition: all 0.2s ease-out;
        -o-transition: all 0.2s ease-out;
        -ms-transition: all 0.2s ease-out;
    }
}
.top-bar{
    color: #fff;
    height: $barHeight;
    line-height: $barHeight;
    border: none;
    .left{
        margin-left: 16px;
        .left_slot{
            font-size: $fontSizepageTitle;
            i{
                margin-right: 10px;
                cursor: pointer;
            }
        }
    }
    .right{
        margin-right: 24px;
        .right_slot{
            font-size: 12px;
        }
        .el-dropdown{
            color: #fff;
            cursor: pointer;
        }
    }
    .center{
        .center_slot{
            font-size: $fontSizeSubPageTitle;
            background: $barBgcolor;
            i{
                margin: 0 10px;
            }
        }
    }
    .demonstration{
        margin: 0 10px;
        .admin-icon-i{
            margin-right: 10px;
        }
    }
}
.nav-icon{
    display: inline-block;
    width: 23px;
    height: 20px;
    background: url('../assets/images/nav-icon.png') no-repeat;
    margin-right: 8px;
}
.collapse-icon{
    height: 64px;
    width: 64px;
    display: inline-block;
    i{
        margin-top: 22px;
        margin-left: 20px;
    }
}
.nav-icon-1{
    background-position: 0px 0px;
}
.nav-icon-2{
    background-position: 0px -51px;
}
.nav-icon-3{
    background-position: 0px -101px;
}
.nav-icon-4{
    background-position: 0px -155px;
}
.nav-icon-5{
    background-position: 0px -205px;
}
.nav-icon-6{
    background-position: 0px -258px;
}
.nav-icon-7{
    background-position: 0px -307px;
}
.el-menu{
    background: transparent;
    border: none;
    width: 100%;
    i{
        position: absolute;
        top: 20px;
        left: 15px;
    }
    li{
        // min-height: 64px;
        color: #fff;
    }
    .el-menu-item:focus,
    .el-menu-item:hover,
    .el-menu-item.is-active,
    .el-submenu__title:hover{
            background: #18223a; 
    }
    .el-submenu__title *{
        color: #fff;
    }
}
.el-submenu{
    .el-menu-item{
        height: $subMenuHeight;
        line-height: $subMenuHeight;
        min-height: auto;
    }
    .el-menu{
        background: #18223a; 
    }
}
</style>
