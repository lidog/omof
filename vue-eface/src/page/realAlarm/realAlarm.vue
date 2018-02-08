<!--
 * @Author wenyujian
 * @version 2018-01-31
 * @description 实时告警
 -->
<template>
  <div class="realAlarm">
      <div class="realalarm-left">
        <p class="alarm-title"><i class="alarm-icon"></i>实时布控告警</p>
        <div class="title-box">
            <tilelist v-for="(item,index) in tilelistData.listMsg" :key="index"
                :data="item"
                :listKey = "tilelistData.listKey"
                :curId="curId"
                @selectedItem="selectedItem" >
                    <span class="tilelist-tag">{{item.score}}%</span>
                </tilelist>

        </div>
      </div>
      <div class="map realalarm-right">
      </div>
  </div>
</template>

<script>
import tilelist from '../../components/tilelist';
import cardImg from '../../assets/images/person.jpg';

export default {
  components: {
      tilelist
  },
  data: function(){
      return{
          curId: -1,
          tilelistData: {
              listMsg: [{
                    id:1,
                    imgUrl_1: cardImg,
                    imgUrl_2: cardImg,
                    name: '张三',
                    videoName: '测试部旁摄像机',
                    time: '2017-10-10 10:10:10',
                    address: '测试部旁摄像机',
                    score: 80
                },{
                    id:2,
                    imgUrl_1: cardImg,
                    imgUrl_2: cardImg,
                    name: '张三',
                    videoName: '测试部旁摄像机',
                    time: '2017-10-10 10:10:10',
                    address: '测试部旁摄像机',
                    score: 70
                }],
              listKey: {
                imgs: [{
                        imgName: 'imgUrl_1',
                        text: ''
                    },
                    {
                        imgName: 'imgUrl_2',
                        text: ''
                    }],
                msg: [{
                    label: '',
                    iconClass: "like-icon",
                    key: 'name'
                },{
                    label: '',
                    iconClass: "icon-video",
                    key: 'videoName'
                },{
                    label: '',
                    iconClass: "icon-time",
                    key: 'time'
                },{
                    label: '',
                    iconClass: "icon-address",
                    key: 'address'
                }]
              }
          }
      }
  },
  methods: {
      selectedItem: function(id){
          this.curId = id;
      }
  }
}
</script>

<style lang="scss">
@import '../../assets/css/standard.scss';
.realalarm-left{
     width: 360px;
}
.realalarm-right{
    position: absolute;
    right: 0;
    bottom: 0;
    top: 65px;
    left: 360px;
}
.realAlarm{
    overflow: hidden;
    box-sizing: border-box;
    .alarm-title{
        height: 54px;
        line-height: 54px;
        color: $activeColor;
        text-align: left;
        padding-left: 20px;
        i{
            margin-right: 6px;
        }
    }
    .title-box{
        position: absolute;
        bottom: 0;
        top: 122px;
        width: 350px;
        left: 0;
        overflow-y: auto;
        box-sizing: border-box;
        padding-bottom: 10px;
        padding-left: 10px;
    }
    .alarm-icon{
        background: url('../../assets/images/page-icon.png');
        background-size: p(835) p(679);
        display: inline-block;
        width: 20px;
        height: 20px;
        background-position: -45px 0;
        vertical-align: top;
        margin-top: 14px;
    }
    .tilelist {
        box-sizing: border-box;
        border: 1px solid $tileBorderColor;
        width: 100%;
        &:not(:last-child){
            margin-bottom: 5px;
        }
        &.active{
            background: $tilelistBgColor;
        }
        .like-icon{
            background: url('../../assets/images/page-icon.png');
            background-size: p(835) p(679);
            background-position: -46px -36px;
            vertical-align: top;
            margin-top: -2px;
        }
        .node-img .img-msg{
            width: 56px;
            img{
                height: 84px;
            }
        }
        .icon{
            height: 16px;
        }
        .tilelist-tag{
            display: inline-block;
            width: 46px;
            height: 24px;
            background: $orangeColor;
            line-height:24px;
            text-align: center;
            position: absolute;
            right: 0;
            top: 10px;
        }
    }
    .tilelist .node-text p:not(:first-child){
        font-size: 12px;
        color: $fontColor;
    }
    .icon-video,.icon-time,.icon-address{
        position:relative;
        left: 2px;
    }
    .map{
        background: url(./map.png) center center no-repeat;
    }
}
</style>

