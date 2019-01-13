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
                        left: 10,
                        text: '街镇排名',
                        textStyle: {
                            fontSize: 14,
                            fontWeight: 700,
                            color:allColors.textColor,
                            fontFamily: 'Microsoft YaHei'
                        },
                    },
                    color: ['#FFC2A9','#FBD8C2'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'none'
                        },
                        formatter: '{b}<br />{c}'
                    },
                    grid: {
                        top: 25,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        containLabel: true
                    },
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
                        min: 'dataMin',
                        max: 'dataMax',
                        axisTick: {
                            show: false
                        },
                        nameTextStyle: {
                            width:90
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
                        data: []
                    },
                    series: [
                        {
                            name: '排名TOP5',
                            type: 'bar',
                            stack: 'group',
                            barMaxWidth: 20,
                            data: []
                        }
                    ]
                }
            }
        },
        methods: {
            mergeOption(data) {
                let newData={
                    yAxisData:[],
                    seriesData:[]
                };
                for(var i=0;i<data.length;i++){
                    newData.yAxisData[i]=data[i].STREET;
                    newData.seriesData[i]=data[i].count;
                }
                this.$refs.chart.mergeOptions({
                    yAxis: {
                        data: newData.yAxisData.reverse()
                    },
                    series: [{
                        name:'排名TOP',
                        data:newData.seriesData.reverse()
                    }]
                })
            }
        }
    }
</script>
