/****  左边侧卡片 ****/
1、调用： 
	 <card-checkbox class="fl"
        v-for="(item,index) in cardList" :key="index"
        :operationList="item.operationList" 
        :cardData="item.cardData"  
        :isHasChecked="isHasChecked" 
        :checked="checked"  
        @handleOperate="handleOperate">
    </card-checkbox>
2、通信： 
  （1） 父 》 子：
        operationList：操作按钮数据
        cardData: 卡片数据
        isHasChecked: 是否有复选框
        boxChecked 是否选择
   (2) 子 》 父：
        @handleOperate(item): 监听卡片的操作按钮
        @cardItemChange(id,checked): 监听卡片是否被选择

3、slot: 留个小门
/****  组件说明   ****/

<template>

<el-card :body-style="{ padding: '0px'}" class="card-checkbox clearfix">
    <div class="left-con fl">
        <el-checkbox v-model="checked" v-if="isHasChecked" @change="cardItemChange(cardData.id)"></el-checkbox>
        <div class="card-img-title">
            <div class="img-list" v-for="imgItem in cardData.imgList" :key="imgItem.text">
                <div class="card-img" >
                    <img :src="imgItem.url" />
                </div>
                <p class="img-title" v-if="imgItem.text">{{imgItem.text}}</p>
            </div>
        </div>
        <ul class="card-list">
            <li v-for="(item,index) in cardData.list" :key="index">
                <span class="label" v-if="item.label">{{item.label}}</span>
                <i class="card-icons" :class="item.iconClass" v-if="item.iconClass"></i>
                <span class="value" :title="item.value" :class="item.class">{{item.value}}</span>
            </li>
        </ul>
        <slot></slot>
    </div>
    
    <div class="right-con fr">
        <ul class="icon-list">
            <li class="card-icon" 
                :class="item.class" 
                :title="item.title" 
                v-for="item in operationList" 
                :key="item.title"
                @click="handleOperate(item.key, cardData.id)"></li>
        </ul>
    </div>
</el-card>
</template>

<script>
export default{
    props: {
        operationList: {
            type: Array
        },
        cardData: {
            type: Object,
            required: true
        },
        isHasChecked: {
            type: Boolean
        },
        boxChecked: {
            type: Boolean
        }
    },
    data: function(){
        return {
           checked: false
        }
    },
    methods: {
        handleOperate: function(key, id){
            this.$emit('handleOperate',key, id);
        },
        cardItemChange: function(id){
            this.$emit('cardItemChange',id,this.checked)
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/css/standard.scss';
.card-checkbox{
    width: 224px;
    background: $cardBgColor;
    border: none;
    box-shadow: none;
    position: relative;
    width: 100%;
    padding-right: 42px;
    box-sizing: border-box;

    &:before{
        position: absolute;
        bottom: 0;
        top: 0;
        width: 1px;
        background: $borderColor;
        right: 42px;
        content: '';
    }

    .left-con{
        text-align: left;
        padding:15px 6px 15px 12px;
        .card-img-title{
            margin-top: 18px;
            text-align: center;
            .img-list{
                display: inline-block;
                &:not(:first-child){
                    margin-left: 6px;
                }
            }
            .img-title{
                color: $activeColor;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
        .el-card__body{
            text-align: left;
        }
        .card-img{
            text-align: center;
            img{
                width: 60px;
                height: auto;
                margin-bottom: 12px;
            }
        }
        .img-title{
            text-align: center;
            font-size: 13px;
            margin-bottom: 32px;
        }
        .card-list{
            color: $cardfontColor;
            text-align: left;
            li{
                list-style-type:none;
                margin-bottom: 6px;
                font-size: 12px;
                .label{
                    display: inline-block;
                    width: 46px;
                }
                .num{
                    color: $orangeColor;
                }
            }
        }
    }
    .right-con{
         padding: 15px 12px 15px 12px;
         position: absolute;
         top: 0;
         right: 0;
        .icon-list{
            li{
                list-style-type:none;
                background: url('../../assets/images/page-icon.png');
                background-size: p(835) p(679);
                width: 20px;
                height: 20px;
                margin-bottom: 22px;
                cursor:pointer;
                &.search-icon{
                    background-position: p(-95) p(-348);
                }
                &.edit-icon{
                    background-position: p(-88) p(-416);
                }
                &.search-more{
                    background-position: p(-88) p(-490);
                }
                &.edit-delete{
                    background-position: p(-88) p(-564);
                }
            }
        }
    }
    .el-checkbox{
        position: absolute;
        top: 10px;
    }
    .card-icons{
        font-size: 16px;
        width: 20px;
    }
}
</style>