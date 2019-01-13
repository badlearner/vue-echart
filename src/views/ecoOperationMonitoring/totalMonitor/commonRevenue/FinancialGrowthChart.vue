<template>
  <chart :options="chartOption" ref="growthChart" auto-resize></chart>
</template>
<script type="text/ecmascript-6">
  import allColors from '@/utils/styleUtil';

  export default {
    data() {
      return {
        chartOption: {
          grid: {
            top: 40,
            left: '10',
            right: '40',
            bottom: '35',
            containLabel: true
          },
          title: {
            text: '公共财政收入增速',
            x: 'center',
            y: 'bottom',
            textStyle: {
              fontSize: 15,
              fontWeight: '700',
              color: allColors.textColor
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: function (params) {
              var strArr = [params[0].name];
              params.forEach((item) => {
                strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.seriesName + ' : ' + (item.data || 0) + '%');
              });
              return strArr.join('<br>');
            }
          },
          legend: {
            data: [
              {name: '国税'},
              {name: '地税'},
              {name: '行政收费'}
            ],
            textStyle: {color: allColors.textColor},
            y: 'top'
          },
          xAxis: [
            {
              name: '日期',
              type: 'category',
              data: [],
              axisLabel: {textStyle: {color: allColors.textColor}},
              splitLine: {show: true, lineStyle: {color: [allColors.textColor]}},
              axisLine: {
                lineStyle: {color: allColors.textColor, width: '2'},
                onZero: false
              },
              axisTick: {
                lineStyle: {color: allColors.textColor}
              }
            }
          ],
          yAxis: [
            {
              name: '%',
              type: 'value',
              axisLabel: {textStyle: {color: allColors.textColor}},
              splitLine: {show: false},
              axisLine: {
                lineStyle: {color: allColors.textColor, width: '2'}
              },
              axisTick: {
                lineStyle: {color: allColors.textColor}
              }
            }
          ],
          series: [
            {
              name: '行政收费',
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#02C7BF', lineStyle: {color: '#02C7BF'}
                }
              },
              data: []
            }, {
              name: '地税',
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#F7E900', lineStyle: {color: '#F7E900'}
                }
              },
              data: []
            }, {
              name: '国税',
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#029634', lineStyle: {color: '#029634'}
                }
              },
              data: []
            }
          ]
        }
      }
    },
    methods: {
      setOption(xAxisData, cTaxData, lTaxData, aFeesData) {
        this.$refs.growthChart.mergeOptions({
          xAxis: {
            data: xAxisData
          },
          series: [{
            name: '国税',
            data: cTaxData
          }, {
            name: '地税',
            data: lTaxData
          }, {
            name: '行政收费',
            data: aFeesData
          }]
        })
      },
      resize() {
        this.$refs.growthChart.resize();
      }
    }
  }
</script>
