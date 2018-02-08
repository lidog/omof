<!--
 * @Author lizhenhua
 * @version 2017-08-10
 * @description ：icon在左边，右边标题和数值 组件
 -->
<template>
        <div class="icon-box">
            <div class="model-icon"><span class="icon" :class="iconClass"></span></div>
            <div class="title">
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
        props: ['name', 'val', 'iconClass']
    }
</script>
<style lang="scss">
    @import "../assets/css/standard.scss";
    .icon-box{
        .model-icon{
            display: inline-block;
            width: p(64);
            vertical-align: text-bottom;
            span{
                display: inline-block;
                width: p(44);
                height: p(48);
                vertical-align: middle;
                background-repeat: no-repeat;
            }
        }
        .title{
            display: inline-block;
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
