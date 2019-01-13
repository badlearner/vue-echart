<template>
    <chart :options="option" ref="chart" auto-resize></chart>
</template>

<script>
    import allColors from '../../utils/styleUtil';

    export default {
        data() {
            return {
                option: {
                    tooltip: {
                        show: false
                    },
                    legend: {
                        orient: 'vertical',
                        x: '30%',
                        y: 'center',
                        itemWidth: 8,
                        itemHeight: 8,
                        data: [{name: '企业数'}, {name: '个体户'}],
                        textStyle: {
                            color: allColors.textColor,
                            fontFamily: 'Microsoft YaHei'
                        }
                    },
                    color: ['#f9d66c', '#5b9ef5'],
                    series: [
                        {
                            name: '市场主体',
                            type: 'pie',
                            center: ['15%', '50%'],
                            radius: ['70%', '95%'],
                            hoverAnimation: false,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    label: {
                                        show: false,
                                        position: 'center',
                                        textStyle: {
                                            fontSize: '14',
                                            fontWeight: 'bold'
                                        }
                                    }
                                }
                            },
                            data: []
                        }
                    ]
                }
            }
        },
        methods: {
            mergeOption(seriesData) {
                this.$refs.chart.mergeOptions({
                    legend: {
                        formatter: function (name) {
                            let item = seriesData.find(item => {
                                return item.name === name
                            });
                            return item ? name + '    ' + item.presence : name;
                        }
                    },
                    series: {
                        data: seriesData
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>