<!--
 * @Author lizhenhua
 * @version 2017-08-10
 * @description ：icon在左边，右边标题和数值 组件
 -->
<template>
        <div class="icon-box clearfix">
            <div class="model-icon fl"><span :class="iconClass"></span></div>
            <div class="title fl">
                <div class="name">{{name}}</div>
                <div class="val">{{val}}</div>
            </div>
        </div>
</template>
<script>
    export default {
        data: function () {
            return {}
        },
//        props:{
//            name:'',
//            val:'',
//            iconClass:''
//        }
        props: ['name', 'val', 'iconClass'],
        created: function(){
            alert(this.iconClass)
        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/standard.scss";
    .icon-box{
        .model-icon{
            width: p(64);
            text-align: left;
            padding-top: p(20);
            span{
                display: inline-block;
                width: p(44);
                height: p(48);
                vertical-align: middle;
                background-position: p(-409) 0;
                background-image: url("../../assets/images/page-icon.png");
                background-repeat: no-repeat;
                background-size:p(835) p(679);
            }
        }
        .title{
            text-align: left;
            .name{
                font-size: p(24);
                font-weight: normal;
                line-height: p(47);
            }
            .val{
                font-size: p(42);
                height: p(78);
                line-height: p(60);
                font-weight: normal;
            }
        }
    }

</style>
