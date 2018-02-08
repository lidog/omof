// 信息列表
<template>
  <div class="msg-list clearfix">
              <p class="w50" v-for="item in msgData.text" :key="item.key" :class="item.class ? item.class : ''">
                  <span class="label">{{item.text}}</span>
                  <span v-if="!item.dataType">{{msgData.data[item.key]}}</span>
                  <span v-if="item.dataType && item.dataType == 'Array'" 
                        v-for="(subItem,index) in msgData.data[item.key]" :key="index"
                        class="subiutem text">
                      <span>{{subItem}}</span>
                  </span>
              </p>
          </div>
</template>

<script>
export default {
  props: {
      msgData: {
          type: Object,
          required: true
      }
  }
}
</script>

<style lang="scss">
@import '../assets/css/standard.scss';
.msg-list{
    color: $fontColor;
    border: 1px solid $borderColor;
    p{
        float: left;
        line-height: 30px;
        font-size: 13px;
        box-sizing: border-box;
        padding-left: 10px;
        &:not(:last-child){
            border-bottom: 1px solid $borderColor;
        
        }
        .label{
            margin-right: 16px;
        }
        .text{
            color: #fff;
        }
    }
    .subiutem{
        padding: 2px 6px;
        margin-right: 10px;
        font-size: 12px;
    }
}
</style>


