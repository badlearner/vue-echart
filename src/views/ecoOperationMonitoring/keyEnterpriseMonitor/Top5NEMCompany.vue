<template>
    <chart :options="chartOption" ref="chart" auto-resize></chart>
</template>
<script>
    import allColors from '@/utils/styleUtil';

    export default {
        props: {
            showButton: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                chartOption: {
                    title: {
                        left: 10,
                        text: 'NEM企业注册总资本街道排名TOP5',
                        textStyle: {
                            fontSize: 14,
                            fontWeight: 500,
                            color:allColors.textColor,
                            fontFamily: 'Microsoft YaHei'
                        },
                    },
                    legend: {
                        x: 'center',
                        y: '13%',
                        itemWidth: 10,
                        itemHeight: 10,
                        textStyle: {
                            color: allColors.textColor
                        },
                        data: ['内资', '外资']
                    },
                    color: ['#BCDEFA', '#5EB0FB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'none'
                        }
                    },
                    grid: {
                        top: '30%',
                        left: 5,
                        right: '15%',
                        bottom: 10,
                        containLabel: true
                    },
                    xAxis: {
                        name: '亿元',
                        nameTextStyle: {
                            color: allColors.textColor
                        },
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false,
                            textStyle: {
                                color: allColors.textColor
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: allColors.textColor,
                                width: 2
                            }
                        }
                    },
                    yAxis: {
                        type: 'category',
                        min: 'dataMin',
                        max: 'dataMax',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: allColors.textColor,
                                width: 2
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        data: ['-']
                    },
                    series: [
                        {
                            name: '内资',
                            type: 'bar',
                            stack: 'group',
                            barMaxWidth: 35,
                            data: [0]
                        },
                        {
                            name: '外资',
                            type: 'bar',
                            stack: 'group',
                            barMaxWidth: 35,
                            data: [0]
                        }
                    ]
                }
            }
        },
        methods: {
            paramData(param){
                this.$parent.paramData({qyType:2},param);
            },
            mergeOption(yAxisData, seriesData) {
                var _this=this;
                this.$refs.chart.chart.on('click',function(param){
                    _this.paramData(param);
                });
                this.$refs.chart.mergeOptions({
                    yAxis: {data: yAxisData},
                    series: seriesData
                })
            }
        }
    }
</script>
