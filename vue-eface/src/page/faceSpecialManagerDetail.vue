<template>
<div class="face-specialManager-detail">

    <search-page :searchState="searchState" @Close="closeSearch"
                 :tools="['keyword','age','sex','personTitle','family','live','idInfo','pic']"
    ></search-page>


    <div class="info-metro">
        <operation-bar :isChecked="isChecked" :operationBtns="operationBtns" @handleTopBar="handleTopBar"></operation-bar>
    </div>

    <div class="page-con page-absolute">
        <div class="clearfix">
             <card-checkbox class="fl"
                v-for="(item,index) in cardList.listData" :key="index"
                :operationList="cardList.operationList"
                :cardData="item"
                :isChecked="isChecked"
                @handleOperate="handleOperate">
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
import operationBar from 'components/operationBar';
import paginationSimple from 'components/paginationSimple';
import cardImg from 'assets/images/person.jpg';
import addFaceSpecialManager from './addFaceSpecialManager'
import searchPage from '../page/search/search.vue';
export default {
     components: {
        operationBar,
        paginationSimple,
        cardCheckbox,
        addFaceSpecialManager,
         searchPage,
    },
    data: function(){
        return {
            count: 1000,
            curPage: 1,
            pageSize: 10,
            isChecked: true,
            isChecked: true,
            searchState:false,
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
                    class: 'search-icon',
                    title: '查询',
                    key: 'search'
                },{
                    class: 'edit-icon',
                    title: '编辑',
                    key: 'edit'
                },{
                    class: 'search-more',
                    title: '详情',
                    key: 'detail'
                },{
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
        handleTopBar: function(key){
            console.log(key)
            switch(key){
                case 'search':  //条件筛选
                    this.searchState = true;
                    break;
            }
        },
         handlePrevPage: function (curPage){ // 向上翻页
            this.curPage --;
        },
         handleNextPage: function (curPage){ // 向下翻页
            this.curPage ++;
        },
        handleOperate: function(key, id){
            switch(key){
                case 'search': //搜索
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        loading.close();
                    }, 1000);
                    break;
                case 'edit':
                     // 未做
                    break;
                case 'detail':
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
        }
    }
}
</script>

<style lang="scss">
@import "../assets/css/standard.scss";
.face-specialManager-detail{
    .card-checkbox .left-con .card-img img{
        width: 82px;
    }
    .white{
        color: #fff;
    }
    .card-checkbox{
        width: 232px;
    }
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
}
</style>
