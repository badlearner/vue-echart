<template>
    <chart :options="chartOption" ref="tax" auto-resize></chart>
</template>
<script>
  import allColors from '@/utils/styleUtil';
  import {formatAmount} from '@/filters';

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
                        text: this.name + '税收',
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
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {type: 'shadow'}
                    },
                    legend: {
                        x: 'center',
                        top: 3,
                        itemGap: 10,
                        itemWidth: 10,
                        itemHeight: 10,
                        data: ['税收'],
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
                            name: '税收',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#5AB1EF'
                                    },
                                    color: '#5AB1EF'
                                }
                            },
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
                        data.seriesData[i].type='line';
                    }
                }
                this.$refs.tax.mergeOptions({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {type: 'shadow'},
                        formatter: function (params) {
                            var strArr = [params[0].name];
                            params.forEach((item)=> {
                                strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.seriesName + ' : ' + formatAmount(item.data) + data.unit || '');
                        });
                            return strArr.join('<br>');
                        }
                    },
                    legend:{
                        data: data.legendData
                    },
                    xAxis: {
                        data: data.xAxisData
                    },
                    yAxis: {
                        name: data.unit
                    },
                    series: data.seriesData
                })
            }
        }
    }
</script>
