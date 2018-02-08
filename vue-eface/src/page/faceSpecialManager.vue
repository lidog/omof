<!--
 * @Author wenyujian
 * @version 2018-01-30
 * @description 专题库
 -->

<template>
<div class="face-specialManager">

    <search-page :searchState="searchState" @Close="closeSearch"
                 :tools="['keyword','age','sex',,'family','live']"
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
            <div class="clearfix scroll-box"  id="wrapper">
                <card-checkbox class="fl"
                    v-for="(item,index) in cardList.listData" :key="index"
                    :operationList="cardList.operationList"
                    :cardData="item"
                    :isHasChecked="isHasChecked"
                    :boxChecked="isAllChecked"
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
import cardImg from 'components/cardCheckbox/file.png';
import operationBar from 'components/operationBar';
import paginationSimple from 'components/paginationSimple';
import searchPage from '../page/search/search.vue';
// import BScroll from 'better-scroll'

export default{
    components: {
        cardCheckbox,
        operationBar,
        paginationSimple,
        searchPage
    },
    data: function(){
        return {
            searchState:false,
            count: 1000,
            curPage: 1,
            pageSize: 10,
            isChecked: true,
            isHasChecked: true,
            selectedIds:[],
            isAllChecked: false,
            operationBtns:{
                left: [
                    {
                        icon: 'bar-top-icon del-bar-icon',
                        text: '删除',
                        key: 'delete'
                    },
                     {
                        icon: 'icon-add',
                        text: '创建',
                        key: 'create'
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
                listData: [
                    {
                        id: 1,
                        imgList: [
                            {
                                url: cardImg,
                                text:'库1'
                           }
                        ],
                        list: [{
                            label: '人员数量',
                            value: 20,
                            class: ''
                        },{
                            label: '人脸数量',
                            value: 30,
                            class: ''
                        }]
                    },
                    {
                        id: 2,
                        imgList: [
                            {
                                url: cardImg,
                                text:'库188'
                           }
                        ],
                        list: [{
                            label: '人员数量',
                            value: 10,
                            class: ''
                        },{
                            label: '人脸数量',
                            value: 20,
                            class: ''
                        }]
                    }

                ]
            }
        }
    },
    methods: {
        closeSearch(){
            this.searchState = false;
        },
        handleAllChecked: function(checked){ //是否全选
            this.isAllChecked = checked;
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
                case 'create':
                    this.$prompt(' ', '人脸专题库管理', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern:  /\S/,
                        inputErrorMessage: '专题库名称不能为空'
                    }).then(({ value }) => {
                        let item = {
                                    id: this.cardList.length,
                                   imgList: [
                                        {
                                            url: cardImg,
                                            text: value
                                        }
                                    ],
                                    list: [{
                                        label: '人员数量',
                                        value: 0,
                                        class: ''
                                    },{
                                        label: '人脸数量',
                                        value: 0,
                                        class: ''
                                    }]
                                }
                        this.cardList.listData.push(item);

                        this.$message({
                            type: 'success',
                            message: '专题库名称: ' + value
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        });
                    });
                    break;
                case 'search':
                    this.searchState = true;
                    break;
            }
        },
        handleOperate: function(key, id){
            switch (key){
                case 'search': //搜索
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.5)'
                    });
                    setTimeout(() => {
                        loading.close();
                    }, 1000);
                    break;
                case 'edit':
                     const index = this.cardList.listData.findIndex(item => item.id === id);
                     this.$prompt('  ', '我的布控库', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputValue: this.cardList.listData[index].imgTitle,
                        inputPattern:/\S/,
                        inputErrorMessage: '布控库名称不能为空'
                        }).then(({ value }) => {
                            this.$message({
                                type: 'success',
                                message: '你的布控库名称是: ' + value
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消输入'
                            });
                        });
                    break;
                case 'detail': // 跳转专题库详情
                    this.$router.push('fSpecialManagerDetail');
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
    },
    created: function(){
        // let wrapper = document.getElementById('#wrapper');
        // let scroll = new BScroll(wrapper);
    }
}
</script>


<style lang="scss">
.face-specialManager{
    .icon-add{
        font-size: 16px;
        margin-right: 4px;
    }
    .card-checkbox .left-con .card-list li .label{
        width: 60px;
    }
    .card-checkbox .left-con.border-right-1px{
        width: 128px;
    }
    .card-checkbox{
        width: 192px;
    }
    .page-absolute{
        position: absolute;
        bottom: 72px;
        top: 122px;
        right: 0;
        left: 0;
        overflow-y: auto;
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
    .card-img-title{
        position: relative;
        top: 12px;
        left: 50%;
        margin-left: -30px;
    }
}
</style>
