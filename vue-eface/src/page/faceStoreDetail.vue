<template>
<div class="facestore-detail">
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
                :isChecked="isChecked"
                :operationList="cardList.operationList" 
                :cardData="item"
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
import operationBar from 'components/operationBar';
import paginationSimple from 'components/paginationSimple';
import cardImg from 'assets/images/person.jpg';
import addFaceSpecialManager from './addFaceSpecialManager'

export default {
     components: {
        operationBar,
        paginationSimple,
        cardCheckbox,
        addFaceSpecialManager
    },
    data: function(){
        return {
            count: 1000,
            curPage: 1,
            pageSize: 10,
            isChecked: true,
            selectedIds: [],
            operationBtns:{
                left: [
                    {
                        icon: 'bar-top-icon del-bar-icon',
                        text: '删除',
                        key: 'delete'
                    },
                     {
                        icon: 'bar-top-icon import-bar-icon',
                        text: '导出全部',
                        key: 'export'
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
                        value: '张三',
                        class: 'white'
                    },
                    {
                        label: '人脸ID',
                        value: '1222333322555',
                        class: ''
                    },
                    {
                        label: '性别',
                        value: '女',
                        class: ''
                    },
                    {
                        label: '证件',
                        value: '445381199406598965',
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
                        value: '李四',
                        class: 'white'
                    },
                    {
                        label: '人脸ID',
                        value: '1222333322555',
                        class: ''
                    },
                    {
                        label: '性别',
                        value: '男',
                        class: ''
                    },
                    {
                        label: '证件',
                        value: '445381199406598965',
                        class: ''
                    }]
                }]
            }
        }
    },
    methods: {
         handlePrevPage: function (curPage){ // 向上翻页
            this.curPage --;
        },
         handleNextPage: function (curPage){ // 向下翻页
            this.curPage ++;
        },
        handleOperate: function(key, id){
            switch(key){
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
                case 'export':  //导出全部
                    
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
        handleAllChecked: function(){
            
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

<style lang="scss">
@import "../assets/css/standard.scss"; 
.facestore-detail{
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
