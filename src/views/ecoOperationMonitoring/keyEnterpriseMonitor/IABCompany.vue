<template>
    <chart :options="chartOption" ref="chart" auto-resize></chart>
</template>

<script>
    import allColors from '@/utils/styleUtil';
    export default {
        data() {
            return {
                chartOption: {
                    title: {
                        x: 10,
                        y: 3,
                        text: 'IAB企业',
                        textStyle: {
                            fontSize: 14,
                            fontWeight: 510,
                            color:allColors.textColor,
                        }
                    },
                    grid: {
                        top: '30%',
                        left: 5,
                        right: 5,
                        bottom: '3%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {type: 'shadow'},
                        position: function (pos, params, dom, rect, size) {
                            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                            var obj = {top: 20};
                            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                            return obj;
                        },
                        formatter: function (params) {
                            let strArr = [];
                            strArr.push('<p style="margin:0;">'+params[0].axisValue+'</p>');
                            params.forEach((item) => {
                                if (item.seriesType === 'bar') {
                                    strArr.push('<div class="chart-tooltip"><span class="name">');
                                    strArr.push(item.seriesName + '：' + item.data.value + '</span>');
                                    strArr.push('<span class="increment">增量：' + item.data.increment + '</span>');
                                    strArr.push('<span class="growth">');
                                    if (item.data.growth > 0) {
                                        strArr.push('<i class="fa fa-long-arrow-up k-red"></i>'+item.data.growth + '%</span></div>');
                                    } else if(item.data.growth < 0){
                                        strArr.push('<i class="fa fa-long-arrow-down k-green"></i>'+item.data.growth + '%</span></div>');
                                    }else{
                                        strArr.push(item.data.growth + '</span></div>');
                                    }
                                }
                            });

                            return strArr.join('');
                        }
                    },
                    legend: {
                        x: 'center',
                        y: '12%',
                        itemWidth: 12,
                        itemHeight: 10,
                        itemGap: 10,
                        textStyle: {
                            color: allColors.textColor
                        },
                        data: ['内资', '外资']
                    },
                    color: ['#ADD9FE', '#9FFFFF'],
                    xAxis: {
                        name: '年',
                        type: 'category',
                        nameTextStyle: {
                            color: allColors.textColor
                        },
                        boundaryGap: true,
                        data: [],
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 1,
                                color: allColors.lineColor
                            }
                        },
                        axisLabel: {
                            show:true,
                            textStyle: {
                                color: allColors.textColor
                            }
                        },
                        axisTick: {show: false}
                    },
                    yAxis: [{
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
                        splitNumber: 4
                    }, {
                        show: false,
                        type: 'value',
                    }],
                    series: [{
                        name: '内资',
                        type: 'bar',
                        stack: '1',
                        barMaxWidth: 25,
                        data: [0]
                    }, {
                        name: '内资',
                        type: 'line',
                        stack: '2',
                        yAxisIndex: 1,
                        data: [{value: 0, growth: 0}],
                        itemStyle: {
                            normal: {
                                lineStyle: {color: '#D1E390'},
                                color: '#D1E390'
                            }
                        }
                    }, {
                        name: '外资',
                        type: 'bar',
                        stack: '1',
                        barMaxWidth: 25,
                        data: [0]
                    }, {
                        name: '外资',
                        type: 'line',
                        stack: '2',
                        yAxisIndex: 1,
                        data: [{value: 0, growth: 0}],
                        itemStyle: {
                            normal: {
                                lineStyle: {color: '#5093CE'},
                                color: '#5093CE'
                            }
                        }
                    }
                    ]
                }
            }
        },
        methods: {
            paramData(param){
                this.$parent.paramData({qyType:3},param);
            },
            mergeOption(xAxisData, seriesData) {
                var _this=this;
                var domesticFundednData=[],foreignData=[];
                for(var i=0;i<seriesData.domesticFundednData.length;i++){
                    domesticFundednData[i]=seriesData.domesticFundednData[i].growth;
                    foreignData[i]=seriesData.foreignData[i].growth;
                }
                this.$refs.chart.chart.on('click',function(param){
                    _this.paramData(param);
                });
                this.$refs.chart.mergeOptions({
                    xAxis: {data: xAxisData},
                    series: [{
                        name: '内资',
                        type: 'bar',
                        data: seriesData.domesticFundednData
                    }, {
                        name: '内资',
                        type: 'line',
                        data: domesticFundednData
                    }, {
                        name: '外资',
                        type: 'bar',
                        data: seriesData.foreignData
                    }, {
                        name: '外资',
                        type: 'line',
                        data: foreignData
                    }]
                })
            }
        }
    }
</script>

<style scoped>

</style>
