<!--
 * @Author lizhenhua
 * @version 2017-08-10
 * @description $Title$
 -->
<template>
    <div class="filter-bar-time clearfix">
        <div class="filter-name">{{name}}</div>
        <div class="filter-content">
            <transition>
                <div class="filter-tab" :class="{'open':isOpen}">
                    <span class="tag-item" v-for="(item,index) in tagData" :value="item.value" :key="item.value"
                          :class="{'active':checkClass(item.value)}" @click="tagClick(item.value)">{{item.name}}</span>
                    <el-date-picker
                            v-model="time"
                            @change="selectTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                    <slot></slot>
                </div>
            </transition>
            <!--<div class="more" :class="{'on':isOpen}" @click="toggleOpen"></div>-->
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                isOpen:false,
                val:[],
                time:''
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
            this.$emit("clickEv",this.val);
        },
        methods:{
            toggleOpen(){
                this.isOpen = !this.isOpen;
            },
            selectTime(time){
                if(time){
                    let obj = {
                        beginTime : this.format(time[0]),
                        endTime : this.format(time[1])
                    }
                    this.$emit("clickEv",obj);
                }
            },
            //点击事件
            tagClick(value){
                let timeName = this.tagData[this.tagData.length-1].value //如果有时间控件，获取时间控件的value
                if(value==timeName){    //选择时间tag 的处理
                    this.val = [value];
                    this.isOpen =true;
                    let obj = {
                        beginTime : this.time.beginTime?this.format(this.time.beginTime):'',
                        endTime : this.time.endTime?this.format(this.time.endTime):''
                    }
                    this.$emit("clickEv",obj);
                    return
                }else {
                    Util.removeInArr(this.val,timeName);
                    this.isOpen = false;
                }
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
            checkClass(value){  //处理选中与取消
                return this.val.indexOf(value) !== -1
            },
            format(timeString){
                console.log(timeString)
                var date = new Date(timeString);
                var date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                return date_value;
            }
        }
    }
</script>
<style lang="scss">
    @import '../assets/css/standard.scss';
    .filter-bar-time{
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
            .el-range-editor{
                .el-range-separator{
                    line-height: 0;
                }
                .el-range-input{
                    background-color: transparent;
                }
                .el-input__icon{
                    line-height: p(38);
                }
            };
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
            }
            .tag-item.active{
                background-color: $activeColor;
            }
        }
    }
</style>
