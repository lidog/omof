<!--
 * @Author lizhenhua
 * @version 2017-08-10
 * @description 首页
 -->
<template>
    <div>
        <div class="warp-box">
            <div class="top mb clearfix">
                <div class="top-left pd mr border fl">
                    <icon-box :name="iconBox[0].name" :val="iconBox[0].val" :iconClass="iconBox[0].iconClass"></icon-box>
                    <div class="top-left-bot">
                        <div class="import-bar mb">
                            <div class="import-min-bar" style="width: 20%"></div>
                        </div>
                        <div class="catch-import">
                            <div class="cnt">导入:<span>25</span>个模板</div>
                            <div class="cnt no-mr">抓拍:<span>18</span>个模板</div>
                        </div>
                    </div>
                </div>
                <div class="top-mid ml mr">
                    <div class="top-mid-top border pd mb clearfix">
                        <icon-box v-for="(item, index) in iconBox" v-if="index>0?true:false" :name="item.name" :val="item.val"
                                  :iconClass="item.iconClass" :key="item.id"></icon-box>
                    </div>
                    <div class="top-mid-bot border pd clearfix">
                        <car-list v-for="(item, index) in carList" :iconClass="item.iconClass" :num="item.num" :text="item.text"
                                  :class="{'border-right':index==3?false:true}" :key="item.id"></car-list>
                    </div>
                </div>
                <div class="top-right border pd fr">
                    <div class="top-right-top">
                        <div class="top-right-icon"><span></span></div>
                        <p>系统消息</p>
                    </div>
                    <ul class="top-right-bottom">
                        <li><p>模板下载任务失败</p></li>
                        <li><p>布控告警记录提示布控告警下载提示下载提示</p></li>
                        <li><p>下载提示</p></li>
                    </ul>
                </div>
            </div>
            <div class="mid mb clearfix">
                <chart-box class="border pd mr" :chartId="eChart[0].chartId" :title="eChart[0].title" :iconClass="eChart[0].iconClass"></chart-box>
                <chart-box class="border pd" :chartId="eChart[1].chartId" :title="eChart[1].title" :iconClass="eChart[1].iconClass"></chart-box>
            </div>
            <div class="bot clearfix">
                <chart-box class="border pd mr" :chartId="eChart[2].chartId" :title="eChart[2].title" :iconClass="eChart[2].iconClass"></chart-box>
                <chart-box class="border pd" :chartId="eChart[3].chartId" :title="eChart[3].title" :iconClass="eChart[3].iconClass"></chart-box>
            </div>
        </div>
    </div>
</template>
<script>
    import iconBox from 'components/iconBox.vue'
    import carList from 'components/carList.vue'
    import chartBox from 'components/echartBox.vue'
    import echarts from 'echarts'

    export default {
        data () {
            return {
                // myChart实例
                myChart: {},
                area:[''],
                iconBox:[
                    {
                        name:'档案库模板总量',
                        val:'8.319.123',
                        iconClass:'icon1'
                    },
                    {
                        name:'8.372.45',
                        val:'当日告警量',
                        iconClass:'icon2'
                    },
                    {
                        name:'8.372.45',
                        val:'人脸抓拍量',
                        iconClass:'icon3'
                    },
                    {
                        name:'8.372.45',
                        val:'当日下载量',
                        iconClass:'icon4'
                    }
                ],
                carList:[
                    {
                        num:"8.349.123",
                        text:"人证抓拍数量",
                        iconClass:"icon5"
                    },
                    {
                        num:"8.349.123",
                        text:"模板下载总量",
                        iconClass:"icon6"
                    },
                    {
                        num:"8.349.123",
                        text:"布控总量",
                        iconClass:"icon7"
                    },
                    {
                        num:"8.349.123",
                        text:"布控库数量",
                        iconClass:"icon8"
                    },
                ],
                eChart:[
                    {
                        chartId:"downLoad",
                        title:"布控库下载统计",
                        iconClass:"icon9"
                    },
                    {
                        chartId:"contribute",
                        title:"贡献量统计",
                        iconClass:"icon10"
                    },
                    {
                        chartId:"photograph",
                        title:"人证抓拍统计",
                        iconClass:"icon11"
                    },
                    {
                        chartId:"typeStatistics",
                        title:"档案库类型统计",
                        iconClass:"icon12"
                    },
                ]
            }
        },
        mounted () {
            this.downLoad();
            this.contribute();
            this.photograph();
            this.typeStatistics();
        },
        components:{
            "icon-box":iconBox,
            "car-list":carList,
            "chart-box":chartBox
        },
        methods: {
            downLoad(){
                let dom = document.getElementById(this.eChart[0].chartId);
                let data = this.randomArr(10,[20,80])
                this.Bar(dom,data)
            },
            contribute(){
                let dom = document.getElementById(this.eChart[1].chartId);
                let data = this.randomArr(10,[10,80])
                this.Line(dom,data)
            },
            photograph(){
                let dom = document.getElementById(this.eChart[2].chartId);
                let data = this.randomArr(10,[10,80])
                let selfOption = {
                    async:true,
                    series: {
                        type:'line',
                        lineStyle:{
                            color:'#56baca',
                            type:'dotted'
                        },
                        areaStyle:{
                            opacity:0
                        }
                    }
                }
                this.Line(dom,data,selfOption)
            },
            typeStatistics(){
                let dom = document.getElementById(this.eChart[3].chartId);
                let data = [{"name":"人员档案库B","value":288},{"name":"人员档案库A","value":181}]
                this.Pie(dom,data)
            },
            //绘制图表
            drawCharts(dom, option){
                var  drawChart = echarts.getInstanceByDom(dom);
                if(!drawChart) {
                    drawChart = echarts.init(dom);
                }
                drawChart.setOption(option);
                return drawChart;
            },
            //柱状图
            Bar(dom,data,selfOption) {
                var color=["#5384ae","#4faab8"],seriesData = [];
                for (var i = 0; i < data.length; i++) {
                    seriesData.push({
                        value:data[i],
                        itemStyle:{
                            color:i%2>0?color[0]:color[1]
                        }
                    })
                }
                var option = {
                    legend:{
                      show:false
                    },
                    grid:{
                        show:true,
                        left: '7%',
                        top: '5%',
                        right: '2%',
                        bottom: '30%',
                        borderColor:'#3d3e56'
                    },
                    tooltip:{
                        show:true,
                        trigger: 'item',
                        textStyle:{
                            color:"#fff"
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: ['越秀区','海珠区','荔湾区','天河区','白云区','黄埔区','花都区','番禺区','萝岗区','南沙区'],
                        axisTick:{
                            show:false
                        },
                        axisLine:{  //坐标轴线
                            lineStyle:{
                                color:"#2c3851"
                            }
                        },
                        axisLabel:{ //坐标轴文字
                            rotate:-60,
                            color:"#99abb4",
                            fontSize:10
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisTick:{
                            show:false
                        },
                        axisLabel:{
                            color:"#53b2c2"
                        },
                        splitLine:{     //坐标轴在 grid 区域中的分隔线。
                            lineStyle:{
                                color:"#2c3851" //分隔线颜色
                            },
                        },
                    },
                    series: {
                        type:'bar',
                        barWidth:'10',
                        data:seriesData
                    }
                };
                if(selfOption){
                    option = $.extend(true, option, selfOption);
                }
                this.drawCharts(dom, option);
            },
            //曲线图
            Line(dom,data,selfOption) {
                var areaCarAverageLink = {  //平均线
                    symbol:['none','none'],
                    data:[{
                        type:"average",
                        name:"AVG",
                        lineStyle:{normal:{color:'#ac3a17',type:'dashed'},},
                        label:{normal:{formatter:"AVG",position:'start'}}, //{c}万
                    }],
                    precision:0,
                };
                var option = {
                    async:false,    //是否动态更新
                    legend:{
                        show:false
                    },
                    grid:{
                        show:true,
                        left: '8%',
                        top: '5%',
                        right: '5%',
                        bottom: '30%',
                        borderColor:'#3d3e56',
                    },
                    tooltip:{
                        show:true,
                        trigger: 'axis',
                        textStyle:{
                            color:"#fff"
                        },
                        formatter: "{c} "
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['越秀区','海珠区','荔湾区','天河区','白云区','黄埔区','花都区','番禺区','萝岗区','南沙区'],
                        axisTick:{
                            show:false
                        },
                        axisLine:{  //坐标轴线
                            lineStyle:{
                                color:"#2c3851"
                            }
                        },
                        axisLabel:{ //坐标轴文字
                            rotate:-60,
                            color:"#99abb4",
                            fontSize:10
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisTick:{
                            show:false
                        },
                        axisLabel:{
                            show:false,
                        },
                        splitLine:{     //坐标轴在 grid 区域中的分隔线。
                            lineStyle:{
                                color:"#2c3851" //分隔线颜色
                            },
                        },
                    },
                    series: {
                        type:'line',
                        lineStyle:{
                            color:'#56baca',
                            type:'solid'
                        },
                        showSymbol:false,
                        symbolSize:1,
                        areaStyle:{
                            color:{
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#376582' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#293750' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        smooth:true,
                        data:data,
                        markLine:areaCarAverageLink,

                    }
                };
                if(selfOption){
                    option = $.extend(true, option, selfOption);
                }
                let drawChart = this.drawCharts(dom, option);
                if(option.async){
                    setInterval( ()=> {
                        var data1 = option.series.data;
                        data1.shift();
                        data1.push(this.randomArr(1,[20,80]));
                        drawChart.setOption(option);
                    }, this.randomArr(1,[1000,3000]));
                }
            },
            //饼图
            Pie(dom,data) {
                var legendName = [];
                for (var i = 0; i < data.length; i++) {
                    legendName.push(data[i].name)
                }
                var option = option = {
                    legend: {
                        x : 'center',
                        y : 'bottom',
                        data:legendName,
                        itemGap:50, //每个图例的间隔，横排为横间隔
                        textStyle:{
                            color:"#56baca",
                        }
                    },
                    color:["#4faab8", "#5384ae"],
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center',
                                    formatter: '{d}%',
                                    formatter: '{big|{d}%} \n {per|{b}}',
                                    rich: {
                                        big:{
                                            color: '#fff',
                                            fontSize: 20,
                                        },
                                        per: {
                                            color: '#607d8b',
                                            padding: [5, 4],
                                            lineHeight: 33
                                        }
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '14',
                                    }
                                }
                            },
                            data:data
                        }
                    ]
                };
                this.drawCharts(dom, option);
            },
            /**
             * 功能：产生一个指定方位的随机整数 或数组
             * @param {int} arrLength  ,为1时 产生一随机数，>1 时 产生一个次长度的数据
             * @param {arr} range  ,一个有两个元素的数组，第一个元素为最小可能值，第二个为最大可能值；
             * @Author lzh
             */
            randomArr(arrLength,range) {
                var arr = [];
                var choices = range[1] - range[0] + 1;
                for(var i=0;i<arrLength;i++){
                    var k = Math.floor(Math.random()*choices+range[0]);
                    arr.push(k);
                };

                if(arrLength==1){
                    return arr[0];
                }else {
                    return arr
                }
            }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/standard.scss";
    *{
        box-sizing: border-box;
    }
    .mr{  margin-right: p(20);  }
    .mb{  margin-bottom: p(20);  }
    .pd{
        padding: p(20);
    }
    .icon{
        display: inline-block;
        width: p(40);
        height: p(40);
        background: url("../../assets/images/page-icon.png") no-repeat p(-798) 0;
        background-size:p(835) p(679);
        vertical-align: middle;
    }
    .border{  border: 1px solid #403e55; background: #212d45 }
    .warp-box{
        color:#fff;
        font-weight: normal;
        background: $bgColor;
        padding:p(40);
        .top{
            position: relative;
            .top-left{
                background: url("./images/gras.png") no-repeat 0 bottom;
                background-size:cover;
                width: p(414);
                height: p(300);
                .top-left-bot{
                    .import-bar{
                        width: 100%;
                        height: p(2);
                        background-color: #3f535a;
                        position: relative;
                        min-width: p(360);
                        .import-min-bar{
                            height: p(4);
                            background-color: #5d858d;
                            position: absolute;
                            left: 0;
                            top:-1px;
                        }
                    }
                    .catch-import{
                        white-space: nowrap;
                        text-align: left;
                        padding-left: p(10);
                        .cnt{
                            font-size: p(20);
                            color: $activeColor;
                            margin-right: p(30);
                            display: inline-block;
                            margin-top: p(25);
                        }
                        .no-mr{
                            margin-right: 0;
                        }
                    }
                }
            }
            .top-mid{
                position: absolute;
                left: p(434);
                right: p(414);
                .top-mid-top{
                    .icon-box{
                        float: left;
                        width: 33.3%;
                        text-align: center;
                        font-size: p(18);
                        .model-icon{
                            span{
                                background-position: p(-409) 0;
                                background-image: url("../../assets/images/page-icon.png");
                                background-size:p(835) p(679);
                            }
                            .icon2{background-position:p(-510) 0;}
                            .icon3{background-position:p(-608) 0;}
                            .icon4{background-position:p(-707) 0;}
                        }
                        .title{
                            .name{
                                font-size: p(32);
                            }
                            .val{
                                font-size: p(24);
                                height: p(30);
                                line-height: normal;
                            }
                        }
                    }
                };
                .top-mid-bot{
                    height: p(160);
                    .car-list{
                        float: left;
                        width: 25%;
                        text-align: center;
                        .icon5{background-position: p(-413) p(-74);}
                        .icon6{background-position: p(-512) p(-75);}
                        .icon7{ background-position: p(-611) p(-72);}
                        .icon8{background-position: p(-696) p(-60);}
                    }
                }
            }
            .top-right{
                width: p(414);
                height: p(300);
                background: url("./images/earth.png") no-repeat 0  0;
                background-size: cover;
                .top-right-top{
                    text-align: left;
                    .top-right-icon{
                        display: inline-block;
                        width: p(90);
                        height: p(50);
                        span{
                            display: inline-block;
                            width: p(40);
                            height: p(40);
                            background: url("../../assets/images/page-icon.png") no-repeat p(-798) 0;
                            background-size:p(835) p(679);
                            vertical-align: middle;
                        }
                    }
                    p{
                        display: inline-block;
                        font-size: p(27);
                        color:#737989;
                        font-weight: normal;
                    }
                }
                .top-right-bottom{
                    li{
                        height: p(50);
                        line-height: p(50);
                        font-size: p(24);
                        color:#fff;
                        text-align: left;
                        width: 100%;
                        padding-left: p(50);
                        position: relative;
                        p{
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        &:before{
                            content:"";
                            width: p(6);
                            height: p(6);
                            border-radius: 50%;
                            background: #5d858d;
                            border: p(4) solid transparent;
                            position: absolute;
                            left: 0;
                            top:p(16);
                        }
                        &:after{
                            content:"";
                            width: p(2);
                            height: p(26);
                            background: #5d858d;
                            position: absolute;
                            left: p(6);
                            top:p(36);
                        }
                    }
                    :last-child:after{
                        display: none;
                    }
                    :nth-child(2):before{
                        background-color: #56baca;
                    }
                }
            }
        }

        .mid{
            .icon9{
                background-position: p(-408) p(-242);
            }
            .icon10{
                background-position: p(-408) p(-301);
            }
        }
        .bot{
            .e-chart:nth-child(1){
                width: 59%;
                .icon{
                    background-position: p(-406) p(-356);
                }
            }
            .e-chart:nth-child(2){
                width: 39%;
                .icon{
                    background-position: p(-406) p(-419);
                }
                .chart-box{
                    &:before{
                        content:"";
                        position: absolute;
                        width: p(2);
                        height: 125%;
                        background-color: #403e55;
                        left:50%;
                        top: p(-90);
                        transform: translateX(-50%);
                    }
                    &:after{
                        content:"";
                        position: absolute;
                        height: p(2);
                        width: 100%;
                        background-color: #403e55;
                        top:50%;
                        left: 0;
                        transform: translateY(-50%);
                    }
                }
            }
        }
    }

</style>
