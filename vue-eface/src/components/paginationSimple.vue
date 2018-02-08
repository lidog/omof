/****  简单的分页组件 ****/
1、调用： 
	<top-bar>
		<div slot="left">左边插槽</div>
		<div slot="right">右边插槽</div>
        <div slot="center">中间插槽</div>
	</top-bar>
2、通信： 
  （1） 父 》 子：
        count： 总页数
        curPage: 当前页
        pageSize: 每页数量
   (2) 子 》 父：
        @prevPage(curPage): 向上翻页
        @nextPage(curPage): 向下翻页
/****  组件说明   ****/

<template>
  <div class="page-simple noselect">
      <span class="el-icon-arrow-left prev-btn" 
            :class="curPage <= 1 ? 'disabled' : 'active' "
            @click="prevPage"></span>
      <span class="page-label">总数</span>
      <span class="page-total">{{count}}</span>
      <span class="page-label">条</span>
      <span class="page-num">
          <span class="cur-page">{{curPage}}</span>/<span class="total-page">{{Math.ceil(count/pageSize)}}</span>
      </span>
      <span class="el-icon-arrow-right next-btn" 
            :class=" curPage >= Math.ceil(count/pageSize) ? 'disabled' : 'active' "
            @click="nextPage"></span>
  </div>
</template>

<script>
export default {
  props:{
      count: {
          type: [String, Number],
          required: true
      },
      curPage: {
          type: [String, Number],
          required: true
      },
      pageSize: {
          type: [String, Number],
          required: true
      }
  },
  data: function(){
      return {

      }
  },
  methods: {
      prevPage: function(){  //上一页
            if(this.curPage > 1){
                this.$emit('prevPage', this.curPage);
            }
      },
      nextPage: function(){  // 下一页
            if(this.curPage <  Math.ceil(this.count/this.pageSize)){
                 this.$emit('nextPage', this.curPage);
            }
      }
  }
}
</script>

<style lang="scss">
@import '../assets/css/standard.scss';
.page-simple{
    color: $fontColor;
    display: inline-block;
    .prev-btn,
    .next-btn{
        display: inline-block;
        width: 32px;
        height: 32px;
        text-align: center;
        line-height: 32px;

        &.active{
            background: $orangeColor;
        }
    }
    .prev-btn{
        // margin: 0 24px;
        margin-right: 24px;
    }
    .next-btn{
        margin-left: 24px;
    }
    .page-label{
        margin:0 4px;
    }
    .page-num{
        margin-left: 16px;
    }
}
</style>


