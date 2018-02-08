<!--
 * @Author lizhenhua
 * @version 2017-08-10
 * @description 三列展示卡片
 -->
<template>
    <div class="car-list">
        <div class="list-icon"><span class="icon" :class="iconClass"></span></div>
        <div class="num"><span>{{num}}</span></div>
        <div class="text">{{text}}</div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {}
        },
        props:['iconClass','num','text']
    }
</script>
<style lang="scss">
    @import "../assets/css/standard.scss";
    .car-list{
        .list-icon{
            span{
                display: inline-block;
                width: p(40);
                height: p(40);
            }
        }
        .num{
            font-size: p(28);
            color:#26c6da;
            line-height:p(50);
        }
        .text{
            font-size: p(24);
            color:#455a64;
        }
    }
    .border-right{
        position: relative;
        &:after{
            content:"";
            position: absolute;
            width: p(2);
            height: p(68);
            background-color: #354056;
            right:p(-2);
            top:p(32);
        }
    }

</style>
