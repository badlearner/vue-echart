<template>
  <chart :options="chartOption" ref="revenueChart" auto-resize></chart>
</template>
<script type="text/ecmascript-6">
  import allColors from '@/utils/styleUtil';
  import {formatAmount} from '@/filters';

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
            text: '公共财政收入',
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
            axisPointer: {type: 'shadow'}
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
              boundaryGap: false,
              data: [],
              axisLabel: {textStyle: {color: allColors.textColor}},
              splitLine: {show: true, lineStyle: {color: [allColors.textColor]}},
              axisLine: {
                onZero: true,
                lineStyle: {color: allColors.textColor, width: '2'}
              },
              axisTick: {
                lineStyle: {color: allColors.textColor}
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {textStyle: {color: allColors.textColor}},
              splitLine: {show: false},
              axisLine: {
                onZero: true,
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
              barMaxWidth: 35,
              stack: '总量',
              itemStyle: {
                normal: {
                  color: function () {
                    return '#02C7BF';
                  },
                  lineStyle: {color: '#02C7BF'},
                  areaStyle: {type: 'default', color: '#02C7BF'}
                }
              },
              data: []
            },
            {
              name: '地税',
              type: 'line',
              stack: '总量',
              itemStyle: {
                normal: {
                  color: function () {
                    return '#F7E900';
                  },
                  lineStyle: {color: '#F7E900'},
                  areaStyle: {type: 'default', color: '#F7E900'}
                }
              },
              data: []
            },
            {
              name: '国税',
              type: 'line',
              stack: '总量',
              itemStyle: {
                normal: {
                  color: function () {
                    return '#029634';
                  },
                  lineStyle: {color: '#029634'},
                  areaStyle: {type: 'default', color: '#029634'}
                }
              },
              data: []
            }
          ]
        }
      }
    },
    methods: {
      setOption(xAxisData, unit, totalData, cTaxData, lTaxData, aFeesData) {
        this.$refs.revenueChart.mergeOptions({
          tooltip: {
            formatter: function (param) {
              var strArr = [param[0].name];
              unit = unit || '';
              param.forEach((item, index) => {
                if (index == 0) {
                  strArr.push('<span class="chart-dot" style="background-color: red"></span>总额 : ' + formatAmount(totalData[item.dataIndex]) + unit);
                }
                strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.seriesName + ' : ' + formatAmount(item.data) + unit);
              });
              return strArr.join('<br>');
            }
          },
          xAxis: {
            data: xAxisData
          },
          yAxis: {
            name: unit
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
        this.$refs.revenueChart.resize();
      }
    }
  }
</script>
