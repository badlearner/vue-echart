<template>
    <chart :options="chartOption" ref="chart" auto-resize></chart>
</template>
<script>
    import allColors from '@/utils/styleUtil';

    export default {
        props: {
            echartData: {
                type: Array
            }
        },
        watch: {
            echartData: function (val) {
                if(val.length>0){
                    this.mergeOption(val);
                }
            }
        },
        data() {
            return {
                chartOption: {
                    title: {
                        top:0,
                        right: 40,
                        text: '总注册资本(亿)',
                        textStyle: {
                            fontSize: 14,
                            fontWeight: 400,
                            color:allColors.textColor,
                            fontFamily: 'Microsoft YaHei'
                        },
                    },
                    legend: {
                        left:30,
                        top:25,
                        itemWidth: 10,
                        itemHeight: 10,
                        textStyle: {
                            color: allColors.textColor
                        },
                    },
                    color: ['#45DB5E'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'none'
                        },
                        position: function (pos, params, dom, rect, size) {
                            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                            var obj = {top: 20};
                            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                            return obj;
                        }
                    },
                    grid: {
                        top: 32,
                        left: 180,
                        right: 45,
                        bottom: 0,
                        containLabel: false
                    },
                    dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            yAxisIndex: [0],
                            width: 15,
                            top: 32,
                            right:0,
                            bottom:30,
                            start: 65,
                            end: 100,
                            showDetail: false
                        }
                    ],
                    xAxis: {
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
                        axisTick: {
                            show: false
                        },
                        name:'资源名称',
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
                        data: []
                    },
                    series: [
                        {
                            type: 'bar',
                            stack: 'group',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right'
                                }
                            },
                            barMaxWidth: 20,
                            data: []
                        }
                    ]
                }
            }
        },
        methods: {
            mergeOption(data) {
                this.$refs.chart.mergeOptions({
                    dataZoom:[{
                        start: data.yAxisData.length*2,
                        end: data.yAxisData.length*3
                    }],
                    yAxis: {
                        data: data.yAxisData
                    },
                    series: [{
                        data:data.seriesData
                    }],
                    dataZoom: [
                        {
                            start: 65,
                            end: 100
                        }
                    ],
                    tooltip: {
                        formatter: function (params) {
                            let strArr = [];
                            params.forEach((item) => {
                                strArr.push('<div class="chart-tooltip">'+item.name+'</div>');
                                strArr.push('<p class="name">注册资本：' + item.value + '</p>');
                                strArr.push('<p class="increment">企业数量：' + item.data.QYSL + '</p>');
                            });
                            return strArr.join('');
                        }
                    }
                })
            }
        }
    }
</script>
