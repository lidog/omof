<!--
 * @Author wenyujian
 * @version 2018-02-01
 * @description 告警详情
 -->

<template>
  <div class="alarm-list clearfix">
       <card-checkbox class="fl"
            v-for="(item,index) in cardList.listData" :key="index"
            :operationList="cardList.operationList"
            :cardData="item">
            <span class="score">{{item.score}}%</span>
        </card-checkbox>
        <img :src="bigImg" class="right-img fl"/>
  </div>
</template>

<script>
import cardCheckbox from 'components/cardCheckbox/cardCheckbox';
import cardImg from 'assets/images/person.jpg';

export default {
  props:{
      cardList: {
          type: Object
      },
      bigImg: {
          type:String
      }
  },
  components: {
      cardCheckbox
  },
  data: function(){
      return{
          isChecked: false
      }
  },
  methods: {
      isAllChecked: function(){

      }
  }
}
</script>

<style lang="scss">
@import '../assets/css/standard.scss';

.alarm-list{
    line-height: 20px;
    .card-checkbox:before{
        display: none;
    }
    .card-checkbox .left-con{
        padding-top: 0;
        .card-img-title{
            margin-top: 0;
        }
        .card-img-title{
            img{
                width: 66px;
            }
        }
    }
    .score{
       top: 93px;
        left: 70px;
    }
    .card-img-title{
        margin-left: 0;
    }
    .icon-time{
        font-size: 14px;
    }
    .card-checkbox {
        width: auto;
        margin: 0;
        background: transparent;
        padding-right: 10px;
        .left-con .card-list{
            margin-top: 18px;
            li{
                margin-bottom: 0;
                line-height: 22px;
                &:nth-child(1), &:nth-child(2){
                    // background: $cardBgColor;
                    font-size: 14px;
                    color: $activeColor;
                }
            }
        }
    }
    .right-img{
        width: 380px;
        margin-top: 12px;
    }
}
</style>

