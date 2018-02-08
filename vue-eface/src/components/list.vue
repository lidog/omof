<template>
  <div class="list-table">
      <div class="list-item" 
            v-for="(item, index) in listData.data" :key="index"
            :class="curId == item.id? 'active': '' "
            @click="handleSelectItem(item.id)">
          <div class="title clearfix">
              <span class="fl">
                  <i class="collection-icon icon"></i>
                  <span>{{item.title}}</span>
              </span>
              <div class="fr operations">
                  <i :class="oItem.iconClass" 
                     v-for="(oItem, index) in listData.operations" :key="index"
                     @click="handleOperate($event,oItem.key, item.id)"></i>
              </div>
          </div>
          <div class="list-row clearfix">
              <p class="rou-item fl w50" v-for="(listItem,itemIndex) in item.list" :key="itemIndex">
                  <span class="label">{{listItem.label}}:</span>
                  <span>{{listItem.value}}</span>
              </p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
      listData: {
            type: Object,
            required: true
        }
  },
    data: function(){
        return {
            curId: -1
        }
    },
    methods: {
        handleSelectItem: function(id){
            this.curId = id;
        },
        handleOperate: function(event,key,id){
            this.$emit('handleOperate', key, id);
            event.cancelBubble = true;
        }
    }
}
</script>

<style lang="scss">
@import '../assets/css/standard.scss';
.list-table{
    .list-item{
        padding: 20px 12px;
        border: 1px solid $borderColor;
        font-size: 12px;
        .title{
            color: #fff;
            margin-bottom: 10px;
        }
        .icon{
            background-image: url('../assets/images/page-icon.png');
            background-size: p(835) p(679);
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: middle;
        }
        .collection-icon{
            background-position: -45px -35px;
             margin-right: 2px;
        }
        .edit-icon{
             background-position: p(-88) p(-422);
        }
        .del-icon{
             background-position: p(-88) p(-570);
        }
        .operations{
            i:not(:last-child){
                margin-right: 6px;
            }
        }
        .list-row{
            text-align: left;
            margin-top: 10px;
            padding-left: 20px;
            .label{
                margin-right: 4px;
            }
        }
    }
    .active{
        position: relative;
        &:before{
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 5px;
            background: $orangeColor;
        }
    }
}
</style>


