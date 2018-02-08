<!--
 * @Author lizhenhua
 * @version 2017-08-10
 * @description $Title$
 -->
/****  筛选组件 ****/
1、调用：
<search-page :searchState="searchState" @Close="closeSearch"
             :tools="['keyword','age','sex','personTitle','family','live','idInfo','pic','threshold','alarmTime','area','rank','filter']"
></search-page>

2、通信：
（1） 父 》 子：
searchState：false 表示关闭面板

tools：面板显示对应名称子组件
可能的值 tools = ['age','keyword','sex','personTitle','family','live','idInfo','pic','threshold','alarmTime','area','rank','filter']

(2) 子 》 父：
@Close(): 关闭面板操作

/****  组件说明   ****/

<template>
    <transition name="search-page">
        <div class="search-page" v-clickoutside="handleClickOutSide" v-show="searchState">
            <div class="top">
                <el-button class="cancel" @click="close">取消</el-button>
                <el-button class="sure" @click="doSearch">确认检索</el-button>
            </div>
            <div class="content">
                <el-breadcrumb class="bread-navigation" separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>类别</el-breadcrumb-item>
                    <el-breadcrumb-item>全部</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="form-wrap">

                    <up-load-pic v-if="tool.pic" @hasUpload="upload"></up-load-pic>

                    <filter-bar :name="'搜索'" v-if="tool.keyword">
                        <el-input v-model="keyword" @keyup.enter="doSearch"  placeholder="请输入姓名、证件号码、人脸ID">
                            <i class="el-icon-search el-input__icon" slot="suffix" @click="doSearch"></i>
                        </el-input>
                    </filter-bar>

                    <filter-bar :name="'相似度阈值'" v-if="tool.threshold">
                        <el-input v-model="threshold"  placeholder="请输入1-100之间的整数" type="number">
                            <i class="el-input__icon" slot="suffix"></i>
                        </el-input>
                    </filter-bar>

                    <filter-bar v-if="tool.sex" :name="'性别'" :tagData="sex" @clickEv="getSex"></filter-bar>

                    <filter-bar v-if="tool.idInfo" :name="'有无身份信息'" :tagData="idInfo" @clickEv="getIdInfo"></filter-bar>

                    <filter-bar v-if="tool.personTitle" :name="'人员标签'" :tagData="personTitle" @clickEv="getPersonTitle" :more="true" :single="false"></filter-bar>

                    <filter-bar-time v-if="tool.age" :name="'年龄段'" :tagData="age"  @clickEv="getAge"></filter-bar-time>

                    <filter-bar-time v-if="tool.alarmTime" :name="'告警时间'" :tagData="alarmTime"  @clickEv="getAlarmTime"></filter-bar-time>

                    <filter-bar v-if="tool.family" :name="'户口居住地'">
                        <address-tree @addressSelect="addressSelect" :data="addressData"></address-tree>
                    </filter-bar>

                    <filter-bar v-if="tool.live" :name="'现居住地'">
                        <address-tree @addressSelect="liveSelect" :data="addressData"></address-tree>
                    </filter-bar>

                    <filter-bar v-if="tool.area" :name="'区域'">
                        <address-tree @addressSelect="areaSelect" :data="addressData"></address-tree>
                    </filter-bar>

                    <filter-bar v-if="tool.rank" :name="'排序'"  :tagData="rank"  @clickEv="getRank"></filter-bar>

                    <filter-bar v-if="tool.filter" :name="'过滤'"  :tagData="filter"  @clickEv="getFilter" :single="false"></filter-bar>

                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import filterBar from 'components/filter-bar.vue'
    import filterBarTime from 'components/filter-bar-time.vue'
    import addressData  from 'assets/js/address.js';
    import addressTree  from 'components/addressTree';
    import upLoadPic  from 'components/upLoadPic.vue';
    import clickoutside from  '../../assets/js/clickOutside.js'
    export default {
        components:{
            "filter-bar":filterBar,
            "filter-bar-time":filterBarTime,
            "address-tree":addressTree,
            "up-load-pic":upLoadPic,
        },
        props:{
            searchState:{   //开启关闭组件
                type:Boolean,
                default:false
            },
            tools:{ //控制需要显示 的子组件
                type:Array,
                default:function () {
                    return []
                }
            }
        },
        data: function () {
            return {
                state:false,
                addressData: {},
                tool:{
                    keyword:false,
                    sex:false,
                    age:false,
                    personTitle:false,
                    family:false,
                    live:false,
                    idInfo:false,
                    pic:false,
                    threshold:false,
                    alarmTime:false,
                    area:false,
                    rank:false,
                    filter:false,
                },
                picValue:'',
                keyword:'',
                threshold:'',
                sexValue:'',
                personTitleValue:'',
                ageValue:'',
                liveValue:'',
                areaValue:'',
                familyValue:'',
                idInfoValue:'',
                alarmTimeValue:'',
                rankValue:'',
                filterValue:'',
                idInfo:[
                    {value:0,name:"全部",active:true},
                    {value:1,name:"有"},
                    {value:2,name:"无"},
                ],
                sex:[
                    {value:0,name:"全部",active:true},
                    {value:1,name:"男"},
                    {value:2,name:"女"},
                    {value:-1,name:"未知"},
                ],
                rank:[
                    {value:0,name:"创建时间",active:true,icon:'created-time'},
                    {value:1,name:"模板量",icon:'model-cnt'},
                ],
                filter:[
                    {value:1,name:"仅显示有模板更新的下载库"},
                ],
                personTitle:[
                    {value:-1,name:"全部",active:true},
                    {value:0,name:"广州女性【107】"},
                    {value:1,name:"广州男性【295】"},
                    {value:2,name:"双枪【389】"},
                    {value:3,name:"偷盗【389】"},
                    {value:4,name:"强奸【389】"},
                    {value:5,name:"诈骗【201】"},
                ],
                age:[
                    {value:0,name:"全部",active:true},
                    {value:1,name:"少年"},
                    {value:2,name:"青年"},
                    {value:3,name:"中年"},
                    {value:4,name:"老年"},
                    {value:5,name:"自定义"},
                ],
                alarmTime:[
                    {value:0,name:"今天",active:true},
                    {value:1,name:"昨天"},
                    {value:2,name:"本周"},
                    {value:3,name:"本月"},
                    {value:4,name:"自定义"},
                ],
            }
        },
        directives: {
            clickoutside
        },
        created: function(){
            this.addressData = addressData;
            //判断显示哪些子组件
            if(this.tools.length>0){
                for(let key in this.tool){
                    if(this.tools.indexOf(key)!==-1){
                        this.tool[key] = true;
                    }
                }
            }
        },
        watch:{
            threshold(val){
                if(val<1||val>99){
                    this.threshold = ''
                }
            }
        },
        methods:{
            handleClickOutSide(e){
                if(Util.hasClass(e.path[1],'searchBut')){
                    return;
                }else {
                    this.$emit('Close')
                }
            },
            close(){
                this.$emit('Close')
            },
            doSearch(){
                let obj = {
                    keyword:this.keyword,
                    pic:this.picValue,
                    threshold:this.threshold,
                    sex:this.sexValue,
                    personTitle:this.personTitleValue,
                    age:this.ageValue,
                    idInfo:this.idInfoValue,
                    live:this.liveValue,
                    area:this.areaValue,
                    family:this.familyValue,
                    alarmTime:this.alarmTimeValue,
                    rank:this.rankValue,
                    filter:this.filterValue,
                }
                this.$emit('Search')
                console.log(obj)
            },
            getSex(value){
                this.sexValue = value;
            },
            getRank(value){
                this.rankValue = value;
            },
            getFilter(value){
                this.filterValue = value;
            },
            getIdInfo(value){
                this.idInfoValue = value;
            },
            getPersonTitle(value){
                this.personTitleValue = value;
            },
            getAge(value){
                this.ageValue = value;
            },
            getAlarmTime(value){
                this.alarmTimeValue = value;
            },
            addressSelect(msg){
                this.familyValue = msg;
            },
            liveSelect(msg){
                this.liveValue = msg
            },
            areaSelect(msg){
                this.areaValue = msg
            },
            upload (obj) {
                this.picValue = obj
            }
        }
    }
</script>
<style lang="scss">
    @import '../../assets/css/standard.scss';
    .search-page{
        width: p(1320);
        bottom: 0;
        position: fixed;
        right: 0;
        top:p(128);
        background-color: #151624;
        border-top-left-radius: p(100);
        overflow-x: hidden;
        z-index: 200;
        .top{
            width: 100%;
            height: p(110);
            background-color: #3d4756;
            font-size: p(26);
            .cancel{
                color: #eaeaea;
                border: none;
                background-color: transparent;
                float: left;
                margin:p(20) 0 0 p(80)
            }
            .sure{
                border-radius: 0;
                border-color: #eaeaea;
                color: #eaeaea;
                background-color: transparent;
                float: right;
                margin:p(30) p(40) 0 0;
                width:p(190);
                height: p(52);
                line-height: 0;
            }
        }
        .content{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: p(110);
            overflow-y: auto;
            padding:0 p(46);
            .bread-navigation{
                padding-left: p(57);
                line-height: p(100);
                border-bottom: p(2) solid $activeColor;
                .el-breadcrumb__inner, .el-breadcrumb__inner a{
                    color:$activeColor;
                    font-weight: normal;
                }
            }
            .form-wrap{
                padding-left: p(54);
            }
        }

    }
</style>
