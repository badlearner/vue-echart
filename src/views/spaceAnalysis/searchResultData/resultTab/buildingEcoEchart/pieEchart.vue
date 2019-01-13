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
                    title : {
                        text: '面积统计',
                        x:'left',
                        textStyle: {
                            fontSize: 14,
                            fontWeight: 700,
                            color:allColors.textColor,
                            fontFamily: 'Microsoft YaHei'
                        }
                    },
                    tooltip : {
                        show:true,
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color:['#FFBE62','#53C7FC','#45DB5E'],
                    legend: {
                        type: 'plain',
                        orient: 'horizontal',
                        left: 'center',
                        top: 20,
                        itemWidth:12,
                        itemHeight:12,
                        textStyle: {
                            color: allColors.textColor
                        },
                        data:[],
                    },
                    series : [
                        {
                            name: '面积',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data: [],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            mergeOption(data) {
                var array=[];
                for(var i=0;i<data.resourceType.length;i++){
                    var object={};
                    object.name=data.resourceType[i];
                    object.value=data.area[i];
                    array.push(object);
                }
                this.$refs.chart.mergeOptions({
                    legend:{
                        data:data.resourceType
                    },
                    series: [{
                        data:array
                    }]
                })
            }
        }
    }
</script>
