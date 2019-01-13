<template>
    <div class="base-info">
        <div class="float-l" style="width: 50%;">
            <h5><strong>|&nbsp;企业活跃度</strong></h5>
            <div class="echart">
                <chart :options="chartOption1" ref="chartActive" auto-resize></chart>
                <!--<p class="desc"><strong>文字描述：</strong></p>-->
            </div>
        </div>
        <div class="float-l"style="width: 50%;">
            <h5><strong>|&nbsp;企业风险</strong></h5>
            <!-- <div class="echart" style="display: none;">
                <chart :options="chartOption2" ref="chartRisk" auto-resize></chart>
                &lt;!&ndash;<p class="desc"><strong>文字描述：</strong></p>&ndash;&gt;
            </div>-->
            <div class="echart">
                <chart :options="chartOption3" ref="chartRisk3" auto-resize></chart>
                <!--<p class="desc"><strong>文字描述：</strong></p>-->
            </div>
        </div>
    </div>
</template>
<script>
    import allColors from '@/utils/styleUtil';
    export default {
        data() {
            return {
                chartOption1: {
                    title: {
                        text: '',
                    },
                    grid: {
                        top: 10,
                        left: 0,
                        right: 30,
                        bottom: 15,
                        containLabel: true
                    },
                    tooltip:{
                        show: true,
                        trigger: 'item',
                    },
                    color: ['#297ACC'],
                    xAxis: {
                        name:'年',
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        data: []
                    },
                    yAxis: {
                        name:'分',
                        type: 'value'
                    },
                    series: [{
                        data: [],
                        type: 'line'
                    }]
                },
                chartOption2: {
                    title: {
                        text: '',
                    },
                    grid: {
                        top: 10,
                        left: 0,
                        right: 30,
                        bottom: 15,
                        containLabel: true
                    },
                    tooltip:{
                        show: true,
                        trigger: 'item',
                    },
                    color: ['#EDC12B'],
                    xAxis: {
                        name:'年',
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        data: []
                    },
                    yAxis: {
                        name:'分',
                        type: 'value'
                    },
                    series: [{
                        data: [],
                        type: 'line'
                    }]
                },
                chartOption3:{
                    title: {
                        text: ''
                    },
                    tooltip: {
                        axisPointer: {type: 'shadow'},
                        position: function (pos, params, dom, rect, size) {
                            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                            var obj = {top: 20};
                            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                            return obj;
                        }
                    },
                    radar: {
                        name:{
                            color:'#000'
                        },
                        indicator: [{text: '企业经营真实度', max: 100},
                            {text: '重点监控对象', max: 100},
                            {text: '可用性', max: 100},
                            {text: '社会评价', max: 100},
                            {text: '违法记录', max: 100}],
                        radius: '60%',
                        nameGap:10
                    },
                    series: [{
                        name: '风险度',
                        type: 'radar',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data : [
                            {
                                value : [43, 10, 28, 50, 50]
                            }
                        ]
                    }]
                }
            }
        },
        methods:{
            mergeOptionActive(data) {
                if(data[0].data){
                    if(data[0].data.length>0) {
                        for (var i = 0; i < data[0].data.length; i++) {
                            data[0].data[i].value = data[0].data[i].perent;
                        }
                    }
                }
                this.$refs.chartActive.mergeOptions({
                    xAxis: {
                        data:data[0].xAxisData
                    },
                    series: [{
                        data:data[0].data
                    }]
                })
            },
            mergeOptionRisk(data) {
                if(data[0].data) {
                    if(data[0].data.length>0) {
                        for (var i = 0; i < data[0].data.length; i++) {
                            data[0].data[i].value = data[0].data[i].perent;
                        }
                    }
                }
                this.$refs.chartRisk.mergeOptions({
                    xAxis: {
                        data: data[0].xAxisData
                    },
                    series: [{
                        data:data[0].data
                    }]
                })
            },
            mergeOptionRiskLie(data) {
                var list=[],value=[],max=0,totalData=0;
                if(data.name) {
                    if(data.name.length>0) {
                        for (var i = 0; i < data.name.length; i++) {
                            totalData += data.value[i];
                            if (data.value[i] > max) {
                                max = data.value[i];
                            }
                            var object = {
                                text: data.name[i],
                                max: data.value[i]
                            }
                            list.push(object);
                        }
                        for (var n = 0; n < list.length; n++) {
                            list[n].max = (max!=0 ?max*2:max+0.2);
                        }
                    }
                }
                this.$refs.chartRisk3.mergeOptions({
                    radar: {
                        indicator: list
                    },
                    series: [{
                        data:[{name:'总风险度：'+totalData,value :data.value}]
                    }]
                });
            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>
<style>
    .base-info .float-l {
        float: left;
        margin-bottom: 40px;
    }

    .base-info .echart {
        width: 100%;
        height: 240px;
    }

    .base-info .echart .chart {
        width: 310px;
        height: 240px;
    }

    .base-info .echart .desc {
        font-size: 13px;
    }
</style>