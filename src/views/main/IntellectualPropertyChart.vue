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
                        data: ['申请量', '授权量','存量总数'],
                        textStyle: {
                            color: allColors.textColor,
                            fontFamily: 'Microsoft YaHei'
                        }
                    },
                    color: ['#d74f51', '#9be8f2','#F2CB3B'],
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
                            name: '申请量',
                            type: 'line',
                            data: [0]
                        },
                        {
                            name: '授权量',
                            type: 'line',
                            data: [0]
                        },
                        {
                            name: '存量总数',
                            type: 'line',
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
                    series: [{
                        data:seriesData[0].data ? seriesData[0].data :[]
                    },{
                        data:seriesData[1].data ? seriesData[1].data :[]
                    },{
                        data:seriesData[2].data ? seriesData[2].data :[]
                    }]
                })
            }
        }
    }
</script>

<style scoped>

</style>