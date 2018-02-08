<!--
 * @Author wenyujian
 * @version 2018-02-02
 * @description 待确认身份页面
 -->

<template>
<div class="face-identity-manager">

    <search-page :searchState="searchState" @Close="closeSearch"></search-page>

    <div class="info-metro">
        <operation-bar 
            :isChecked="isChecked" 
            :operationBtns="operationBtns"
            @handleTopBar="handleTopBar"
            @handleAllChecked="handleAllChecked">
        </operation-bar>
    </div>

        <div class="page-con page-absolute">

            <div class="clearfix scroll-box">
                <card-checkbox class="fl"
                    v-for="(item,index) in cardList.listData" :key="index"
                    :operationList="cardList.operationList"
                    :cardData="item"
                    :isHasChecked="isHasChecked"
                    :boxChecked="isAllChecked"
                    @handleOperate="handleOperate"
                    @cardItemChange="cardItemChange">
                    <span class="score">{{item.score}}%</span>
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
        <!-- 详情 -->
        <el-dialog title="报警详情信息" :visible.sync="dialogDetailVisible" width="580px">
            <alarm-detail :cardList="cardListDetail" :bigImg="bigImg"></alarm-detail>
        </el-dialog>

        <!-- 收藏夹页面  -->
        <el-dialog title="收藏文件夹" :visible.sync="dialogCollectionVisible" width="570px">
            <collection-folder @collectionConfirm="collectionConfirm" @collectionCancel="collectionCancel"></collection-folder>
        </el-dialog>
    <div class="bg-mg"></div>
</div>
</template>

<script>

import cardCheckbox from 'components/cardCheckbox/cardCheckbox';
import cardImg from 'assets/images/person.jpg';
import operationBar from 'components/operationBar';
import paginationSimple from 'components/paginationSimple';
import alarmDetail from 'page/alarmDetail'
import searchPage from './search/search.vue';
import collectionFolder from 'page/collectionFolder.vue';
import bigImg from 'assets/images/big-img.jpg';

export default{
    components: {
        cardCheckbox,
        operationBar,
        paginationSimple,
        alarmDetail,
        searchPage,
        collectionFolder
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
            dialogDetailVisible: false,
            bigImg: bigImg,
            dialogCollectionVisible: false,
            operationBtns:{
                left: [
                    {
                        icon: 'bar-top-icon del-bar-icon',
                        text: '删除',
                        key: 'delete'
                    },
                     {
                        icon: 'icon-reload',
                        text: '刷新',
                        key: 'reload'
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
                    class: 'icon-confirm',
                    title: '确认',
                    key: 'confirm'
                },{
                    id: 1,
                    class: 'search-more',
                    title: '详情',
                    key: 'detail'
                },
                {
                    id: 1,
                    class: 'edit-delete',
                    title: '删除',
                    key: 'delete'
                },{
                    id: 1,
                    class: 'icon-collection',
                    title: '收藏',
                    key: 'collection'
                }],
                listData: [
                    {
                        id: 1,
                        score: 30,
                        imgList: [
                            {
                                url: cardImg
                           },{
                                url: cardImg
                           }
                        ],
                        list: [{
                            label: '姓名:',
                            value: '张三',
                            class: 'white'
                        },{
                            label: '布控库:',
                            value: '员工库',
                            class: ''
                        },
                        {
                            label: '时间:',
                            value: '2018-01-30 17:14:06',
                            class: ''
                        },{
                            label: '设备名称:',
                            value: '测试部旁摄像机',
                            class: ''
                        }]
                    },
                    {
                        id: 2,
                        score: 50,                        
                        imgList: [
                            {
                                url: cardImg
                           },{
                                url: cardImg
                           }
                        ],
                          list: [{
                            label: '姓名:',
                            value: '张三',
                            class: 'white'
                        },{
                            label: '布控库:',
                            value: '员工库',
                            class: ''
                        },
                        {
                            label: '时间:',
                            value: '2018-01-30 17:14:06',
                            class: ''
                        },{
                            label: '设备名称:',
                            value: '测试部旁摄像机',
                            class: ''
                        }]
                    }

                ]
            },
            cardListDetail:{
                operationList:[],
                listData: [
                    {
                        id: 1,
                        score: 30,
                        imgList: [
                            {
                                url: cardImg
                            },{
                                url: cardImg
                            }
                        ],
                        list: [{
                            iconClass: 'el-icon-location-outline',
                            value: '测试部旁边摄像机',
                            class: ''
                        },{
                            iconClass: 'icon-time',
                            value: '2018-01-30 17:03:45',
                            class: ''
                        },{
                            label: '姓名:',
                            value: '张三',
                            class: ''
                        },{
                            label: '性别:',
                            value: '女',
                            class: ''
                        },{
                            label: '证件:',
                            value: '44583999965362895',
                            class: ''
                        },{
                            label: '布控库:',
                            value: '员工布控',
                            class: ''
                        }]
                    }
            ]}
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
                case 'delete': // 删除
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
                case 'reload':  // 刷新
                    break;
                case 'search':  // 筛选
                    
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
            switch (key){
                case 'confirm': //确认
                    this.$confirm(' ', '是否确认?', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '确认成功'
                        });
                    }).catch(() => {         
                    });
                    break;
                case 'delete': //删除
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
                case 'collection': //收藏
                    this.dialogCollectionVisible = true;
                    break;
                case 'detail': // 跳转详情
                    this.dialogDetailVisible = true;
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
        },
        collectionCancel: function(id){   //取消增加收藏夹
            this.dialogCollectionVisible = false;
        },
        collectionConfirm: function(){   //确定增加收藏夹
            if(id == -1){
                this.$message({
                    message: '请选择收藏夹',
                    type: 'warning'
                });

            }else{
                this.$message({
                    message: '收藏成功',
                    type: 'success'
                });
                this.dialogCollectionVisible = false;
            }
        }
    }
}
</script>


<style lang="scss"> 
@import "../assets/css/standard.scss"; 
@import "../assets/css/standard.scss"; 

.face-identity-manager{
    .card-checkbox .left-con .card-list li .label{
        width: auto;
        margin-right: 6px;
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
    }
    .card-checkbox{
        width: 220px;
    }
    .card-img-title {
        margin-left: 10px;
    }
    .score{
        width: 30px;
        height: 30px;
        background: #ac3a17;
        position: absolute;
        top: 0;
        border-radius: 50%;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        left: 76px;
        top: 114px;
    }
    .card-checkbox .left-con .card-list{
        margin-top: 12px;
    }
    .icon-confirm,.icon-collection{
        background: transparent !important;
        color: $activeColor;
    }
}
</style>

 
 