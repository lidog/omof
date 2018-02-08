<!--
 * @Author wenyujian
 * @version 2018-02-01
 * @description 历史告警
 -->
<template>
    <div class="histry-alarm">

        <search-page :searchState="searchState" @Close="closeSearch"
                     :tools="['keyword','threshold','alarmTime']"
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

            <div class="clearfix scroll-box">
                <card-checkbox class="fl"
                               v-for="(item,index) in cardList.listData" :key="index"
                               :operationList="cardList.operationList"
                               :cardData="item"
                               :isChecked="isChecked"
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
        <!-- 告警详情 -->
        <el-dialog title="告警详情" :visible.sync="dialogTableVisible" width="580px">
            <alarm-detail :cardList="cardListDetail" :bigImg="bigImg"></alarm-detail>
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
    import searchPage from '../page/search/search.vue';
    import bigImg from 'assets/images/big-img.jpg';

    export default{
        components: {
            cardCheckbox,
            operationBar,
            paginationSimple,
            alarmDetail,
            searchPage
        },
        data: function(){
            return {
                searchState:false,
                count: 1000,
                curPage: 1,
                pageSize: 10,
                isChecked: true,
                selectedIds:[],
                isAllChecked: false,
                dialogTableVisible: false,
                bigImg: bigImg,
                operationBtns:{
                    left: [
                        {
                            icon: 'bar-top-icon import-bar-icon',
                            text: '导出',
                            key: 'import'
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
                        class: 'search-icon',
                        title: '查询',
                        key: 'search'
                    },{
                        id: 1,
                        class: 'search-more',
                        title: '详情',
                        key: 'detail'
                    }],
                    listData: [
                        {
                            id: 1,
                            score: 30,
                            imgList: [
                                {
                                    url: cardImg,
                                    text: '抓拍图片'
                                },{
                                    url: cardImg,
                                    text: '布控图片'
                                }
                            ],
                            list: [{
                                label: '姓名:',
                                value: '张三',
                                class: 'white'
                            },{
                                label: '证件:',
                                value: '44583999965362895',
                                class: ''
                            },{
                                label: '告警地点:',
                                value: '测试部潘店',
                                class: ''
                            },{
                                label: '布控库:',
                                value: '员工布控',
                                class: ''
                            },{
                                label: '时间:',
                                value: '2018-01-30 17:14:06',
                                class: ''
                            }]
                        },
                        {
                            id: 2,
                            score: 50,
                            imgList: [
                                {
                                    url: cardImg,
                                    text: '抓拍图片'
                                },{
                                    url: cardImg,
                                    text: '布控图片'
                                }
                            ],
                            list: [{
                                label: '姓名:',
                                value: '张三',
                                class: 'white'
                            },{
                                label: '证件:',
                                value: '44583999965362895',
                                class: ''
                            },{
                                label: '告警地点:',
                                value: '测试部潘店',
                                class: ''
                            },{
                                label: '布控库:',
                                value: '员工布控',
                                class: ''
                            },{
                                label: '时间:',
                                value: '2018-01-30 17:14:06',
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
                    case 'import': // 导出

                        break;
                    case 'create':  // 刷新
                        break;
                    case 'search':  // 刷新
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
                    case 'detail': // 跳转专题库详情
                        this.dialogTableVisible = true;
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
        }
    }
</script>


<style lang="scss">
    @import "../assets/css/standard.scss";

    .histry-alarm{
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
    }
</style>
