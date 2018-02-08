/*  横向列表 */
<template>
<div class="tilelist" :class="curId == data.id? 'active':''" @click="selectedItem(data.id)">
	<dl class="list-node  clearfix">
		<dt class="node-img compare-img fl" v-if="listKey.imgs">
			<span class="img-msg" v-for="(imgItem,imgIndex) in listKey.imgs" :key="imgIndex">
				<img :src="data[imgItem.imgName]">
				<em v-if="imgItem.text">{{imgItem.text}}</em>
			</span>
		</dt>
		<dd class="node-text fl">
			<p v-for="(keyItem, keyIndex) in listKey.msg" :key="keyIndex">
        <label v-if="keyItem.label">{{keyItem.label}}：</label>
        <i :class="keyItem.iconClass" class="tilelist-icon" v-if="keyItem.iconClass"></i>
        <span title=" ">{{data[keyItem.key]}}</span>
      </p>
		</dd>
	</dl>
  <slot></slot>
</div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    listKey:{
      type: Object,
      required: true
    },
    curId:{
      type: Number
    }
  },
  data: function(){
    return {
      
    }
  },
  methods: {
    selectedItem: function(id){ // 点击某一列表
      this.$emit('selectedItem',id);
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/standard.scss';
.tilelist{
  width: 350px;
  text-align: left;
  color: #fff;
  padding: 18px 10px;
  border: 1px solid $borderColor;
  position: relative;
  .list-node{
    width: 100%;
  }
  .node-img{
    .img-msg{
      display: inline-block;
      width: 70px;
      &:not(:last-child){
        margin-right: 7px;
      }
      img{
        width: 100%;
        height: 80px;
      }
      em{
          width: 100%;
          display: inline-block;
          font-size: 12px;
          font-style: normal;
      }
    }
     
  }
  .node-text{
    padding-left: 10px;
    font-size: 13px;
    p{
      &:not(:last-child){
        margin: 0 0 5px;
      }
      &.node-text-title{
        margin-bottom: 10px;
        font-size: 15px;
        font-weight: bold;
        color: $activeColor;
      }
    }
  }
  .tilelist-icon{
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  &.active{
    position: relative;
    &:before{
      content: '';
      height: 100%;
      width: 5px;
      background: $orangeColor;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>

