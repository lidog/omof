<!--
 * @Author wenyujian
 * @version 2018-01-30
 * @description 布控库
 -->

<template>
<div class="controll-library">

    <search-page :searchState="searchState" @Close="closeSearch"
                 :tools="['keyword','area','rank','filter']"
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
                    @handleOperate="handleOperate">
                </card-checkbox>
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
    <div class="bg-mg"></div>
</div>
</template>

<script>

import cardCheckbox from 'components/cardCheckbox/cardCheckbox';
import cardImg from 'components/cardCheckbox/file.png';
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
            searchState:false,
            count: 1000,
            curPage: 1,
            pageSize: 10,
            isChecked: true,
            isHasChecked: true,
            selectedIds: [], //选择的IDs
            operationBtns:{
                left: [
                    {
                        icon: 'bar-top-icon del-bar-icon',
                        text: '删除',
                        key: 'delete'
                    },
                     {
                        icon: 'icon-add',
                        text: '新增',
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
                listData: [{
                    id: 1,
                    imgList: [
                        {
                            url: cardImg,
                            text: 'ddd'
                        }
                    ],
                    list: [{
                        label: '时间',
                        value: '2017-10-20 10:10:10',
                        class: ''
                    },{
                        label: '创建人',
                        value: 'admin',
                        class: ''
                    },{
                        label: '模板数',
                        value: 30,
                        class: 'num'
                    }]
                },
                {
                    id: 2,
                    imgUrl: cardImg,
                    imgList: [
                        {
                            url: cardImg,
                            text: 'ddddss'
                        }
                    ],
                    list: [{
                            label: '时间',
                            value: '2017-10-20 10:10:10',
                            class: ''
                        },{
                            label: '创建人',
                            value: 'admin',
                            class: ''
                        },{
                            label: '模板数',
                            value: 10,
                            class: 'num'
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
                case 'create':  //创建
                    const date = new Date();
                    this.$prompt('名称', '我的布控库', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            inputPlaceholder: '库名称',
                            inputPattern:  /\S/,
                            inputErrorMessage: '专题库名称不能为空'
                        }).then(({ value }) => {
                            let item = {
                                imgList: [
                                    {
                                        url: cardImg,
                                        text: value
                                    }
                                ],
                                list: [{
                                    label: '时间',
                                    value: date.Format("yyyy-MM-dd hh:mm:ss"),
                                    class: ''
                                },{
                                    label: '创建人',
                                    value: 'admin',
                                    class: ''
                                },{
                                    label: '模板数',
                                    value: 0,
                                    class: 'num'
                                }]}
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
                case 'search':  //条件筛选
                    this.searchState = true;
                    break;
            }
        },
        handleOperate: function(key, id){
            switch(key){
                case 'search': //搜索(该功能需求再确定)
                    // const loading = this.$loading({
                    //     lock: true,
                    //     text: 'Loading',
                    //     spinner: 'el-icon-loading',
                    //     background: 'rgba(0, 0, 0, 0.5)'
                    // });
                    // setTimeout(() => {
                    //     loading.close();
                    // }, 1000);
                    break;
                case 'edit':
                     const index = this.cardList.listData.findIndex(item => item.id === id);
                     this.$prompt('  ', '我的布控库', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputValue: this.cardList.listData[index].imgTitle,
                        inputPattern: /\S/,
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
                case 'detail':  
                    this.$router.push('faceStoreDetail');
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
        }
    },
    created: function(){
        Date.prototype.Format = function(format){
            var o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(), //day
            "h+" : this.getHours(), //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter
            "S" : this.getMilliseconds() //millisecond
            }
            if(/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
            }
            for(var k in o) {
            if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            }
            }
            return format;
        }
    }
}
</script>


<style lang="scss">
.controll-library{
    .page-absolute{
        position: absolute;
        bottom: 72px;
        top: 122px;
        right: 0;
        left: 0;
    }
    .page-con .pagination-box {
        text-align: right;
        position: absolute;
        width: 100%;
        top: 100%;
        margin-top: 16px;
        right: 20px;
    }
    .card-img-title{
        position: relative;
        top: 12px;
    }
    .icon-add{
        font-size: 16px;
        margin-right: 4px;
    }
    .card-checkbox{
        width: 224px;
    }
}


</style>
