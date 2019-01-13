<template>
    <chart :options="chartOption" ref="chart" auto-resize></chart>
</template>

<script>
    import allColors from '@/utils/styleUtil';

    export default {
        data() {
            return {
                chartOption: {
                    grid: {
                        top: '35%',
                        left: 20,
                        right: 40,
                        bottom: 10,
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                            lineStyle: {
                                color: '#458FE8',
                                width: 2,
                                type: 'solid'
                            },
                        }
                    },
                    legend: {
                        y: '2%',
                        itemWidth: 30,
                        itemHeight: 10,
                        itemGap: 15,
                        data: ['迁入', '迁出'],
                        textStyle: {
                            color: allColors.textColor,
                            fontFamily: 'Microsoft YaHei'
                        }
                    },
                    color: ['#d74f51', '#76B23B'],
                    xAxis: {
                        name: '年',
                        nameTextStyle: {
                            color: allColors.textColor
                        },
                        boundaryGap: false,
                        data: [],
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 1,
                                color: allColors.lineColor
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: allColors.textColor
                            }
                        },
                        axisTick: {show: false},
                    },
                    yAxis: {
                        name: '户',
                        nameTextStyle: {
                            color: allColors.textColor
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 1,
                                color: allColors.lineColor
                            }
                        },
                        type: 'value',
                        axisLabel: {
                            textStyle: {
                                color: allColors.textColor
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: allColors.lineColor,
                                width: 0.5,
                                opacity: 0.3,
                                type: "solid"
                            }
                        },
                        axisTick: {show: false},
                        splitNumber: 3
                    },
                    series: [
                        {
                            name: '迁入',
                            type: 'line',
                            barMaxWidth: 35,
                            data: [0]
                        },
                        {
                            name: '迁出',
                            type: 'line',
                            barMaxWidth: 35,
                            data: [0]
                        }
                    ]
                }
            }
        },
        methods: {
            mergeOption(xAxisData, seriesData) {
                this.$refs.chart.mergeOptions({
                    xAxis: {data: xAxisData},
                    series: seriesData
                })
            }
        }
    }
</script>