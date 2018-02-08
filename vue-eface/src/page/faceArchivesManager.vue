<!--
 * @Author wenyujian
 * @version 2018-01-31
 * @description 一人一档
 -->

<template>
<div class="archives-manager">

    <search-page :searchState="searchState" @Close="closeSearch"
                 :tools="['keyword','age','sex','personTitle','family','live','idInfo','pic']"
    ></search-page>

    <div class="info-metro">
        <operation-bar
            :isChecked="isChecked"
            :operationBtns="operationBtns"
            @handleTopBar="handleTopBar"
            @handleAllChecked="handleAllChecked">
        </operation-bar>
    </div>

        <div class="page-con page-absolute">
            <div class="clearfix">
                <card-checkbox class="fl"
                    v-for="(item,index) in cardList.listData" :key="index"
                    :operationList="cardList.operationList"
                    :cardData="item"
                    :isHasChecked="isHasChecked"
                    @handleOperate="handleOperate"
                    @cardItemChange="cardItemChange">
                </card-checkbox>
            </div>
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
    <div class="bg-mg"></div>
</div>
</template>

<script>

import cardCheckbox from 'components/cardCheckbox/cardCheckbox';
import cardImg from 'assets/images/person.jpg';
import operationBar from 'components/operationBar';
import paginationSimple from 'components/paginationSimple';
import searchPage from '../page/search/search.vue';
export default{
    components: {
        cardCheckbox,
        operationBar,
        paginationSimple,
        searchPage
    },
    data: function(){
        return {
            count: 1000,
            curPage: 1,
            pageSize: 10,
            isChecked: true,
            isHasChecked: true,
            searchState:false,
            selectedIds:[], //选择的卡片IDS
            operationBtns:{
                left: [
                    {
                        icon: 'bar-top-icon del-bar-icon',
                        text: '删除',
                        key: 'delete'
                    },
                     {
                        icon: 'bar-top-icon import-bar-icon',
                        text: '批量导入',
                        key: 'importPart'
                    },
                     {
                        icon: 'bar-top-icon download-bar-icon',
                        text: '导入到布控库',
                        key: 'importLibrary'
                    }
                ],
                right: [{
                    icon: 'bar-top-icon filter-bar-icon',
                    text: '条件筛选',
                    key: 'search'
                }]
            },
            cardList:{
                operationList:[{
                    id: 1,
                    class: 'search-icon',
                    title: '查询',
                    key: 'search'
                },{
                    id: 1,
                    class: 'edit-icon',
                    title: '编辑',
                    key: 'edit'
                },{
                    id: 1,
                    class: 'search-more',
                    title: '详情',
                    key: 'detail'
                },{
                    id: 1,
                    class: 'edit-delete',
                    title: '删除',
                    key: 'delete'
                }],
                listData:[{
                    id: 1,
                    imgList: [
                        {
                            url: cardImg
                        }
                    ],
                    list: [{
                        label: '姓名',
                        value: '张三',
                        class: 'white'
                    },{
                        label: '证件',
                        value: '445381199406598965',
                        class: ''
                    },{
                        label: '人脸ID',
                        value: '1222333322555',
                        class: ''
                    }]
                },{
                    id: 2,
                    imgList: [
                        {
                            url: cardImg
                        }
                    ],
                    list: [{
                        label: '姓名',
                        value: '张三',
                        class: 'white'
                    },{
                        label: '证件',
                        value: '445381199406598965',
                        class: ''
                    },{
                        label: '人脸ID',
                        value: '1222333322555',
                        class: ''
                    }]
                }]
            }
        }
    },
    methods: {
        closeSearch(){
            this.searchState = false;
        },
        handleAllChecked: function(){   //是否全选

        },
         handleTopBar: function(key){
            switch(key){
                case 'delete':
                    if(this.selectedIds.length ==0 ){
                        this.$message({
                            message: '至少选择一条记录',
                            type: 'warning'
                        });
                    }else{

                        for(let i=0; i<this.selectedIds.length; i++){
                             const delIndex = this.cardList.listData.findIndex(item => item.id === this.selectedIds[i]);
                             this.cardList.listData.splice(delIndex,1);
                        }
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                    break;
                case 'importPart':  //批量导入
                    break;
                case 'importLibrary': // 导入到布控库
                    break;
                case 'search':  //条件筛选
                    this.searchState = true;
                    break;
            }
        },
        handleOperate: function(key, id){
            switch(key){
                case 'search': //搜索
                //    const loading = this.$loading({
                //         lock: true,
                //         text: 'Loading',
                //         spinner: 'el-icon-loading',
                //         background: 'rgba(0, 0, 0, 0.7)',
                //         target: document.querySelector('body')
                //     });
                    // setTimeout(() => {
                    // loading.close();
                    // }, 2000);
                    break;
                case 'edit':  // 弹出编辑页面
                     
                    break;
                case 'detail':  //跳到详情页面
                    this.$router.push('faceArchivesManagerDetai');
                    break;
                case 'delete':
                    let flag = false;
                    this.cardList.listData.splice(this.cardList.listData.findIndex(item =>{
                        flag = item.id === id;
                        return  flag;
                    }), 1);
                    if(flag){
                         this.$message({
                            showClose: true,
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                    break;
            }
        },
        handlePrevPage: function (curPage){ // 向上翻页
            this.curPage --;
        },
         handleNextPage: function (curPage){ // 向下翻页
            this.curPage ++;
        },
        cardItemChange: function(id,  checked){ //监听卡片选择事件
            if(checked){
                this.selectedIds.push(id);
            }else{
               this.selectedIds.splice(this.selectedIds.findIndex(item => item === id), 1);
            }
            // 控制是否全选
            const allChecked = this.selectedIds.length == this.cardList.listData.length;
        }
    }
}
</script>


<style lang="scss" scoped>
.page-absolute{
    position: absolute;
    bottom: 72px;
    top: 122px;
    right: 0;
    left: 0;
}
 .pagination-box {
    text-align: right;
    position: absolute;
    width: 100%;
    margin-top: 16px;
    right: 20px;
    bottom: 34px;
    z-index: 2;
}
.card-checkbox{
    width: 232px;
}
</style>
