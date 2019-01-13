<template>
  <chart :options="chartOption" name="tax" ref="indexTax" @click="chartClick" auto-resize></chart>
</template>
<script>
  import allColors from '@/utils/styleUtil';
  import {formatAmount} from '@/filters';

  export default {
    data() {
      return {
        chartOption: {
          title: {
            text: '各行业企业税收图',
            top: 'bottom',
            left: 'center',
            textStyle: {
              color: allColors.textColor,
              fontSize: 15,
              fontWeight: 700
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            y: 10,
            x: 'center',
            itemWidth: 15,
            itemHeight: 12,
            textStyle: {color: allColors.textColor},
            data: ['工业', '商业', '服务业', '建筑业', '房地产']
          },
          grid: {
            left: '5',
            right: '40',
            top: '40',
            bottom: '30',
            containLabel: true
          },
          xAxis: [
            {
              name: '元',
              nameTextStyle: {
                color: allColors.textColor
              },
              type: 'value',
              axisLabel: {
                show: true,
                textStyle: {
                  color: allColors.textColor
                }
              },
              axisLine: {
                lineStyle: {
                  color: allColors.textColor,
                  width: 2
                }
              },
              splitLine: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'category',
              axisLabel: {
                show: true,
                textStyle: {
                  color: allColors.textColor
                }
              },
              axisLine: {
                lineStyle: {
                  color: allColors.textColor,
                  width: 2
                }
              },
              splitLine: {
                show: false
              },
              data: ['-']
            }
          ],
          series: [
            {
              name: '工业',
              barMaxWidth: 20,
              type: 'bar',
              stack: '行业',
              itemStyle: {
                normal: {
                  color: '#3398DB'
                }
              },
              data: []
            },
            {
              name: '商业',
              barMaxWidth: 20,
              type: 'bar',
              stack: '行业',
              itemStyle: {
                normal: {
                  color: '#88C601'
                }
              },
              data: []
            },
            {
              name: '服务业',
              barMaxWidth: 20,
              type: 'bar',
              stack: '行业',
              itemStyle: {
                normal: {
                  color: '#EB51A7'
                }
              },
              data: []
            },
            {
              name: '建筑业',
              barMaxWidth: 20,
              type: 'bar',
              stack: '行业',
              itemStyle: {
                normal: {
                  color: '#feb005'
                }
              },
              data: []
            },
            {
              name: '房地产',
              barMaxWidth: 20,
              type: 'bar',
              stack: '行业',
              itemStyle: {
                normal: {
                  color: '#edfb06'
                }
              },
              data: []
            }
          ]
        }
      }
    },
    methods: {
      chartClick: function (params) {
        this.$emit('click', params)
      },
      setChartOption: function (data) {
        this.$refs.indexTax.mergeOptions({
          yAxis: {
            data: data.ysriData
          },
          xAxis: [
            {
              name: data.unit,
            }
          ],
          legend: {data: data.legenDdata},
          tooltip: {
            formatter: function (params) {
              var strArr = [params[0].name];
              params.forEach((item) => {
                strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.seriesName + '税收 : ' + formatAmount(item.data) + data.unit);
              });
              return strArr.join('<br>');
            }
          },
          series: data.seriesData
        })
      }
    }
  }
</script>
