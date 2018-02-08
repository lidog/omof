<!--
 * @Author lizhenhua
 * @version 2017-08-10
 * @description $Title$
 -->

/****  筛选组件 ****/
1、调用：
    <filter-bar-time v-if="tool.alarmTime" :name="'告警时间'" :tagData="alarmTime"  @clickEv="getAlarmTime" :single="false"></filter-bar-time>
    或者
    <filter-bar v-if="tool.live" :name="'现居住地'">
        <address-tree @addressSelect="liveSelect" :data="addressData"></address-tree>
    </filter-bar>

2、通信：
（1） 父 》 子：
name：条件名称
tagData：生成tag的数据
single：是否单选；默认 单选，传false 表示多选
getAlarmTime：父组件响应函数；

(2) 子 》 父：
@clickEv(item): 操作选项的事件

3、slot: 留个小门
/****  组件说明   ****/



<template>
    <div class="filter-bar clearfix">
        <div class="filter-name">{{name}}</div>
        <div class="filter-content">
            <transition>
                <div class="filter-tab" :class="{'open':isOpen,'over':more}">
                    <span class="tag-item" v-for="(item,index) in tagData" :value="item.value" :key="item.value"
                          :class="{'active':checkClass(item.value)}" @click="tagClick(item.value)">{{item.name}}<i v-if="item.icon" class="bar-top-icon" :class="item.icon"></i></span>
                    <slot></slot>
                </div>
            </transition>
            <div v-if="more" class="more" :class="{'on':isOpen}" @click="toggleOpen"></div>
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                isOpen:false,
                val:[]
            }
        },
        props:{
            name:'',
            more:'',
            tagData:'',
            single:{    //默认单选
                type:Boolean,
                default:true
            }
        },
        created(){
            //处理默认值
            if(this.tagData){
                for (let i = 0; i < this.tagData.length; i++) {
                    let obj = this.tagData[i];
                    if(obj.active){
                        this.val.push(obj.value);
                    }
                }
            }
        },
        methods:{
            toggleOpen(){
                this.isOpen = !this.isOpen;
            },
            //点击事件
            tagClick(value){
                if(this.single){
                    this.val = [value];
                }else {
                    if(this.val.indexOf(value)=== -1){
                        this.val.push(value);
                    }else {
                        Util.removeInArr(this.val,value);
                    }
                }
                this.$emit("clickEv",this.val);
            },
            checkClass(value){
                return this.val.indexOf(value) !== -1
            }
        }
    }
</script>
<style lang="scss">
    @import '../assets/css/standard.scss';
    .filter-bar{
        margin:p(40) 0;
        text-align: left;
        .filter-name{
            float: left;
            font-size: p(28);
            color: $fontColor;
            width:p(222);
            line-height: p(44);
        }
        .filter-content{
            max-width: p(940);
            float: left;
            .filter-tab{
                transition: all .5s;
                max-width: p(880);
                display: inline-block;
                vertical-align: top;
            }
            .filter-tab.over{
                height: p(60);
                overflow: hidden;
            }
            .filter-tab.open{
                height: auto;
            }
            .more{
                display: inline-block;
                width: p(40);
                height: p(40);
                cursor: pointer;
                background: url("../assets/images/page-icon.png") no-repeat p(-160) p(-490) ;
                background-size:p(835) p(679);
                vertical-align: top;
            }
            .more.on{
                background-position: p(-160) p(-600);
            }
            .el-input__prefix, .el-input__suffix{
                color: $activeColor;
            }
            .el-input__inner{
                background-color: transparent;
                border-color: $cardfontColor;
                border-radius:0;
                color:#fff;
                height:p(52);
                .el-input__icon{
                    line-height: p(52);
                }
            }
            .el-input__suffix{
                cursor: pointer;
                .el-input__icon{
                    line-height: p(52);
                }
            }
            .tag-item{
                display: inline-block;
                height: p(44);
                line-height: p(44);
                font-size: p(26);
                color:#fff;
                background-color: transparent;
                padding:0 p(15);
                border-radius: 0;
                border: none;
                cursor: pointer;
                margin-right: p(10);
                margin-bottom: p(15);
                .model-cnt{
                    background-position: p(-162) p(-227);
                }
                .created-time{
                    background-position: p(-162) p(-227);
                }
            }
            .tag-item.active{
                background-color: $activeColor;

                .model-cnt{
                    background-position: p(-706) p(-6);
                }
                .created-time{
                    background-position: p(-706) p(-6);
                }

            }
        }
    }
</style>
