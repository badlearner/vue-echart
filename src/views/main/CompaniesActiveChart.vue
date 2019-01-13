<template>
  <chart :options="chartOption" ref="chart" auto-resize></chart>
</template>

<script>
  import allColors from '@/utils/styleUtil'
  import ECharts from 'vue-echarts/components/ECharts'
  export default {
    data () {
      return {
        chartOption: {
          grid: {
            top: 30,
            left: 10,
            right: 10,
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
              }
            },
            formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}%'
          },
          legend: {
            y: 5,
            itemWidth: 30,
            itemHeight: 10,
            itemGap: 15,
            data: [],
            textStyle: {
              color: allColors.textColor,
              fontFamily: 'Microsoft YaHei'
            }
          },
          color: ['#f7e54e', '#458FE8'],
          xAxis: {
            name: '年',
            type: 'category',
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
                color: allColors.textColor,
                fontFamily: 'Microsoft YaHei'
              }
            },
            axisTick: {show: false}
          },
          yAxis: [{
            show: true,
            type: 'value',
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
            axisLabel: {
              textStyle: {
                color: allColors.textColor,
                fontFamily: 'Microsoft YaHei'
              }
            },
            splitLine: {
              lineStyle: {
                color: allColors.lineColor,
                width: 0.5,
                opacity: 0.3,
                type: 'solid'
              }
            },
            min: 40000,
            axisTick: {show: false},
            splitNumber: 3
          }, {
            show: false,
            name: '百分比',
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
                color: allColors.textColor,
                fontFamily: 'Microsoft YaHei'
              }
            },
            min: 82,
            max: 84
          }],
          series: [{
            name: '活跃企业',
            yAxisIndex: 0,
            type: 'line',
            areaStyle: {
              normal: {
                color: new ECharts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: 'rgba(247,229,78, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(247,229,78, 0.4)'
                }])
              }
            },
            data: [0]
          }, {
            name: '活跃占比',
            type: 'line',
            yAxisIndex: 1,
            data: [0]
          }
          ]
        }
      }
    },
    methods: {
      mergeOption (item) {
        var legendData = ['活跃占比', '活跃企业'], pieData = [], numData = [], numMin = item.series[0].data[0].num;
        if (item.series[0].data) {
          for (var i = 0; i < item.series[0].data.length; i++) {
            if (numMin > item.series[0].data[i].num) {
              numMin = item.series[0].data[i].num;
            }
            pieData.push(item.series[0].data[i].value);
            numData.push(item.series[0].data[i].num);
          }
        }
        var max = 84, min = 82;
        if (item.rank) {
          max = item.rank.max ? item.rank.max : 84;
          min = item.rank.min ? item.rank.min : 82;
        }
        this.$refs.chart.mergeOptions({
          legend: {data: legendData},
          xAxis: {data: item.xAxisData},
          yAxis: [{
            min: numMin
          }, {
            min: min,
            max: max
          }],
          series: [{
            data: numData
          }, {
            data: pieData
          }]
        })
      }
    }
  }
</script>

<style scoped>

</style>
