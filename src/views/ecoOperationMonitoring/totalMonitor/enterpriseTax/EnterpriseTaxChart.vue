<template>
  <chart name="tax" :options="tax" ref="enterprisetax" auto-resize @click="chartClick"></chart>
</template>
<script>
  import allColors from '@/utils/styleUtil';
  import {formatAmount} from '@/filters';
  export default {
    data() {
      return {
        tax: {
          grid: {
            top: 40,
            left: '10',
            right: '40',
            bottom: '35',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            itemWidth: 15,
            itemHeight: 15,
            data: [
              {name: '全库税收', icon: 'rect', textStyle: {color: '#FCDC03'}},
              {name: '区库税收', icon: 'rect', textStyle: {color: '#01A0FB'}}
            ]
          },
          title: {
            text: '总税收',
            x: 'center',
            y: 'bottom',
            textStyle: {
              fontSize: 15,
              fontWeight: '700',
              color: allColors.textColor
            }
          },
          color: ['#FCDC03', '#01A0FB'],
          xAxis: {
            name: '日期',
            nameTextStyle: {
              color: allColors.textColor
            },
            data: [],
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: allColors.textColor
              }
            },
            axisLabel: {
              textStyle: {
                color: allColors.textColor
              }
            }
          },
          yAxis: {
            nameTextStyle: {
              color: allColors.textColor
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 2,
                color: allColors.textColor
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
                color: allColors.textColor,
                width: 0.5,
                opacity: 0.3,
                type: "dashed"
              }
            }
          },
          series: [
            {
              name: '全库税收',
              type: 'bar',
              //stack: '总税值',
              barWidth: 35,
              data: []
            },
            {
              name: '区库税收',
              type: 'bar',
              //stack: '总税值',
              barWidth: 35,
              data: []
            }
          ]
        }
      }
    },
    methods: {
      chartClick(param) {
        this.$emit('click', param);
      },
      setChartOption(xAxisData, unit, fTaxData, dTaxData) {
        this.$refs.enterprisetax.mergeOptions({
          tooltip: {
            formatter: function (params) {
              var strArr = [params[0].name];
              params.forEach((item) => {
                strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.seriesName + ' : ' + formatAmount(item.data) + (unit || ''));
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
            name: '全库税收',
            data: fTaxData
          }, {
            name: '区库税收',
            data: dTaxData
          }]
        })
      }
    }
  }
</script>
