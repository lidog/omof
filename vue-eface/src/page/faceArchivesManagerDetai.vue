<!--
 * @Author wenyujian
 * @version 2018-02-02
 * @description 人员档案库管理
 -->
<template>
  <div class="archives-manager-detail warp-box">
      <div class="main-msg">
          <img :src="personImg" class="person-img" />
          <list-massage :msgData="msgData"></list-massage>
      </div>
      <div class="card-box">
       <el-tabs v-model="activeName" @tab-click="handleTagClick" type="border-card" class="tags-list">
            <el-tab-pane label="所有" name="all">
                    <span> 所有</span>
            </el-tab-pane>
            <el-tab-pane label="火车" name="train">
                <span slot="label"><i class="icon-train"></i>火车</span>
                <span>火车</span>
            </el-tab-pane>
            <el-tab-pane label="民航" name="civilAviation">
                 <span slot="label"><i class="icon-plane"></i>民航</span>
                 <span>民航</span>
            </el-tab-pane>
            <el-tab-pane label="汽车" name="car">
                <span slot="label"><i class="icon-car"></i>汽车</span>
                <span>汽车</span>
            </el-tab-pane>
            <el-tab-pane label="住宿" name="accommodation">
                <span slot="label"><i class="icon-room"></i>住宿</span>
                <span>住宿</span>
            </el-tab-pane>
            <el-tab-pane label="网吧" name="internetBar">
                <span slot="label"><i class="icon-keyborad"></i>网吧</span>
                <span>网吧</span>
            </el-tab-pane>
            <el-tab-pane label="出入境" name="enteringAleaving ">
                <span slot="label"><i class="icon-toexit"></i>出入境</span>
                <span>出入境</span>
            </el-tab-pane>
            <el-tab-pane label="涉境" name="toExit">
                <span slot="label"><i class="icon-user4"></i>涉境</span>
                <span>涉境</span>
            </el-tab-pane>
            <el-tab-pane label="其他" name="other">
                <span>其他</span>
            </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>

<script>
import  personImg from 'assets/images/person.jpg'
import listMassage from 'components/listMassage';
export default {
    components: {
        listMassage
    },
    data: function(){
        return {
            personImg,
            activeName: 'all',
            msgData: {
                data: {
                    'name': '张三',
                    'sex': '女',
                    'cardType': '身份证',
                    'birthday': '2017-10-10 10:10:10',
                    'cardNum': '445381199563269896',
                    'address': '广州市天河区和尚庙',
                    'curAddress': '广州市天河区和尚庙',
                    'tags': ['抢劫','走私']
                },
                text: [{
                    key: 'name',
                    text: '姓名',
                    class: 'w100'
                },{
                    key: 'sex',
                    text: '性别'
                },{
                    key: 'cardType',
                    text: '证件类型'
                },{
                    key: 'birthday',
                    text: '出生日期'
                },{
                    key: 'cardNum',
                    text: '证件号码'
                },{
                    key: 'address',
                    text: '户籍居住地'
                },{
                    key: 'curAddress',
                    text: '户籍居住地'
                },{
                    key: 'tags',
                    text: '标签',
                    class: 'w100',
                    dataType: 'Array'
                }]
            }
        }
    },
    methods: {
        handleTagClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>

<style lang="scss">
@import '../assets/css/standard.scss';
.archives-manager-detail{
    text-align: left;
    .main-msg{
        position: relative;
         background: $cardBgColor;
         padding: 20px 14px 28px 14px;
        .person-img{
            width: 100px;
        }
        .msg-list{
            position: absolute;
            top: 21px;
            left: 128px;
            right: 16px;

            .subiutem{
                background: $activeColor;
                border-radius: 2px;
                color: #fff;
            }
        }
    }
    .card-box{
        padding: 20px;
        background: $cardBgColor;
        margin-top: 30px;
    }
    .w100{
        width: 100% !important;
    }
    .tags-list{
        color: $fontColor;
        .el-tabs__item.is-active,
        .el-tabs__item:hover{
            color: $activeColor;
        }
        .el-tabs__item{
            color: #fff;
            font-size: 14px;
        }
        i{
            margin-right: 6px;
            font-size: 15px;
        }
       
    }
    .el-tabs--border-card,
    .el-tabs--border-card>.el-tabs__header,
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
        background: transparent;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
        border-right-color: $borderColor;
        border-left-color: $borderColor;
    }
    .el-tabs--border-card>.el-tabs__content{
        min-height: 200px;
    }
    .el-tabs--border-card>.el-tabs__header{
        border-bottom: 1px solid $borderColor;
    }
    .el-tabs--border-card{
        border: 1px solid $borderColor;
    }
}
</style>
