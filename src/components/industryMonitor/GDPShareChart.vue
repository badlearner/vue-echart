<template>
    <chart :options="chartOption" ref="gdpShare" auto-resize></chart>
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
                        text: this.name + '产值占比',
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
                        x2: 40,
                        y2: 35,
                        containLabel: true
                    },

                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {type: 'shadow'},
                        formatter: function (params) {
                            var strArr = [params[0].name];
                            params.forEach((item)=> {
                                strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.seriesName + ' : ' + formatAmount(item.data) + '%');
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
                        data: ['产值占比'],
                        textStyle: {
                            color: allColors.textColor
                        }
                    },
                    xAxis: [
                        {
                            name: '日期',
                            splitLine: {show: false},
                            boundaryGap: false,
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
                            name: '%',
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
                            name: '产值占比',
                            type: 'line',
                            //stack: 'sum',
                            barMaxWidth: 26,
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#FAB57E'
                                    },
                                    color: '#FAB57E',
                                    areaStyle: {type: 'default', color: '#FAB57E'}
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
                        data.seriesData[i].stack='sum';
                        data.seriesData[i].areaStyle={normal: {}};
                    }
                }
                this.$refs.gdpShare.mergeOptions({
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
