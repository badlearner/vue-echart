<template>
    <chart :options="chartOption" ref="eQuantity" auto-resize></chart>
</template>
<script>
  import allColors from '@/utils/styleUtil';
  import {formatAmount,formatInt} from '@/filters';

    export default{
        props: {
            name: {
                type: String,
                require: true
            }
        },
        data(){
            return {
                chartOption: {
                    title: {
                        text: this.name + '企业数量',
                        top: 'bottom',
                        left: 'center',
                        textStyle: {
                            color: allColors.textColor,
                            fontSize: 14,
                            fontWeight: 700
                        }
                    },
                    grid: {
                        x: 5,
                        x2: 30,
                        y2: 35,
                        containLabel: true
                    },
                    color:[ '#E3463E','#B6A2DE', '#5AB1EF', '#FFB980','#3276b1', '#546570'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {type: 'shadow'},
                        confine:true,
                        position:['30%', '30%'],
                        formatter: function (params) {
                            var strArr = [params[0].name];
                            params.forEach((item) => {
                                strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.seriesName + ' : ' + formatInt(item.data) + '家');
                            });
                            return strArr.join('<br>');
                        }
                    },
                    legend: {
                        x: 'center',
                        top: 3,
                        itemGap: 10,
                        itemWidth: 10,
                        itemHeight: 10,
                        data: ['企业数量'],
                        textStyle: {
                            color: allColors.textColor
                        }
                    },
                    xAxis: [
                        {
                            name: '日\n期',
                            splitLine: {show: false},
                            axisLine: {
                                onZero: true,
                                lineStyle: {color: allColors.textColor, width: '2'}
                            },
                            axisTick: {lineStyle: {color: allColors.textColor}},
                            axisLabel: {textStyle: {color: allColors.textColor}},
                            type: 'category',
                            data: []
                        }
                    ],
                    yAxis: [
                        {
                            name: '家',
                            splitLine: {lineStyle: {type: 'dotted'}},
                            axisLine: {
                                onZero: true,
                                lineStyle: {color: allColors.textColor}
                            },
                            axisTick: {
                                lineStyle: {color: allColors.textColor}
                            },
                            axisLabel: {
                                textStyle: {color: allColors.textColor}
                            },
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '企业数量',
                            type: 'bar',
                            barMaxWidth: 26,
                            data: []
                        }
                    ]
                }
            }
        },
        methods: {
            setChartOption(data) {
                if(data.seriesData){
                    for(var i=0;i<data.seriesData.length;i<i++){
                        data.seriesData[i].stack='行业';
                        data.seriesData[i].type='bar';
                    }
                }
                this.$refs.eQuantity.mergeOptions({
                    xAxis: {
                        data: data.xAxisData
                    },
                    legend:{
                        data: data.legendData
                    },
                    series: data.seriesData
                })
            }
        }
    }
</script>
