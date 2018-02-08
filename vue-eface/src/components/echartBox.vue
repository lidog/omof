<!--
 * @Author lizhenhua
 * @version 2017-08-10
 * @description echart绘图
 -->
<template>
    <div class="e-chart">
        <div class="chart-title">
            <span class="icon" :class="iconClass"></span>
            <span>{{title}}</span>
        </div>
        <div class="chart-box" :id="chartId"></div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {}
        },
        props:['iconClass','title','chartId']
    }
</script>
<style lang="scss">
    @import "../assets/css/standard.scss";
    .e-chart{
        display: inline-block;
        position: relative;
        width: 49%;
        height: p(557);
        .chart-title{
            text-align: left;
            font-size: p(26);
            .icon{
                display: inline-block;
                width: p(40);
                height: p(40);
                vertical-align: middle;
            }
        }
        .chart-box{
            position: absolute;
            top:p(90);
            left: p(20);
            right: p(20);
            bottom: p(20);
        }
    }
</style>
