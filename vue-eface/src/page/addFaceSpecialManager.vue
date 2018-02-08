<template>
  <div class="addFSManage">
        <div class="mask"></div>
        <div class="main-con">
            <div class="title-con">
                <span class="add-icon" @click="addStore"></span>
                <p class="title">人员专题库</p>
            </div>
            <div class="border-bottom-1px search">
                <el-input
                    class="border-bottom-1px"
                    placeholder="请输入库名称"
                    suffix-icon="el-icon-search"
                    v-model="searchValue">
                </el-input>
            </div>
            <!--  具体列表 -->
            <div class="list">
                 <list :listData="listData"
                    @handleOperate="handleOperate"></list>
            </div>

            <div class="pagination-box">
                <pagination-simple class="page"
                    :count="count" 
                    :curPage="curPage"
                    :pageSize="pageSize"
                    @prevPage="handlePrevPage"
                    @nextPage="handleNextPage">
                </pagination-simple>
            </div>
        </div>
  </div>
</template>

<script>
import list from 'components/list';
import paginationSimple from 'components/paginationSimple';

export default {
  components: {
      list,
      paginationSimple
  },
  data: function(){
      return {
          count: 100,
          curPage: 1,
          pageSize: 20,
          searchValue: '',
          listData: {
            data:[{
                id: 1,
                title: '标题1',
                list: [{
                    label: '人员数量',
                    value: 20
                },{
                    label: '人脸数量',
                    value: 20
                }]
            },
            {
                id: 2,
                title: '标题2',
                list: [{
                    label: '人员数量',
                    value: 20
                },{
                    label: '人脸数量',
                    value: 20
                }]
            }],
            operations: [{
                iconClass: 'edit-icon icon',
                key: 'edit'
            },{
                iconClass: 'del-icon icon',
                key: 'delete'
            }]
          }
      }
  },
  methods: {
        addStore: function(){
        //   alert(0)
        },
        handleOperate: function(key, id){    //监听相关列表操作   
            switch(key){
                case 'edit':  // 编辑
                    break;
                case 'delete':  //删除
                    break;
            }
        },
        handlePrevPage: function (curPage){ // 向上翻页
            this.curPage --;
        },
            handleNextPage: function (curPage){ // 向下翻页
            this.curPage ++;
        }
  }
}
</script>

<style lang="scss">

@import "../assets/css/standard.scss"; 
$pageHeight: 69px;  // 页码高度
$pageWidth: 250px;
.addFSManage{
    .mask{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.7);
        z-index: -1;
    }
    .main-con{
         width: $pageWidth;
         background: $sidleAlertBgColor;
         position: absolute;
         right: 0;
         top: 0;
         bottom: 0;
         border-top-left-radius: 40px;
         .title-con{
             position: relative;
             margin-top:36px;
             .add-icon{
                background: url('../assets/images/page-icon.png');
                background-size: p(835) p(679);
                background-position: -130px -206px;
                display: inline-block;
                width: 40px;
                height: 40px;
                position: absolute;
                left: -20px;
                top: -20px;
            }
            .title{
                color: $activeColor;
                font-size: 16px;
                position: relative;
                top: -6px;
                text-align: left;
                text-indent: 34px;
            }
         }
         .search{
             margin-right: 14px;
             margin-top: 24px;
         }
         .list{
             color: $sidleAlertFontColor;
             position: absolute;
             bottom: $pageHeight;
             top: 116px;
             left: 0;
             width: 100%;
             overflow-y: auto;
         }
         .pagination-box{
             position: fixed;
             bottom: 0;
             right:0;
             width: $pageWidth;
             height: $pageHeight;
             box-sizing: border-box;
             border-top: 1px solid $borderColor;
             text-align: center;
             font-size: 13px;
             .page-simple{
                 background: transparent;
                 margin-top: 20px;
                 .prev-btn,.next-btn{
                     margin: 0 6px;
                     color: $activeColor;
                 }
                 .page-num{
                     margin-left: 4px;
                 }
                 .cur-page{
                     color: $orangeColor;
                 }
             }
         }
    }
}
</style>
