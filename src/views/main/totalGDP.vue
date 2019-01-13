<template>
  <chart :options="chartOption" ref="gdp" auto-resize></chart>
</template>

<script>
  import allColors from '@/utils/styleUtil';
  import {formatAmount} from '@/filters/index';
  export default {
    data() {
      return {
        mainData:[],
        chartOption: {
          grid: {
            top: 30,
            left: 40,
            right: 40,
            bottom: 25
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {type: 'shadow'},
            position: function (pos, params, dom, rect, size) {
              // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
              var obj = {top: 0};
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
              return obj;
            }
          },
          legend: {
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 5,
            formatter: function (params) {
              switch (params) {
                case '全区同比':
                case '四上同比':
                  return '同比';
                  break;
                case '全区环比':
                case '四上环比':
                  return '环比';
                  break;
                default:
                  return params;
                  break;
              }
            },
            data: ['全区','全区同比','全区环比','四上','四上同比','四上环比'],
            textStyle: {
              color: allColors.textColor,
              fontFamily: 'Microsoft YaHei'
            }
          },
          xAxis: [
            {
              name: '日\n期',
              splitLine: {show: false},
              axisLine: {
                onZero: true,
                lineStyle: {color: '#3D5064', width: '2'}
              },
              axisTick: {lineStyle: {color: '#3D5064'}},
              axisLabel: {textStyle: {color: allColors.textColor}},
              type: 'category',
              data: []
            },
            {
              type: 'category',
              axisLine: {show: false},
              axisTick: {show: false},
              axisLabel: {show: false},
              splitLine: {show: false},
              splitArea: {show: false},
              data: []
            }
          ],
          yAxis: [
            {
              splitLine: {lineStyle: {type: 'dotted'}},
              axisLine: {
                onZero: true,
                lineStyle: {color: '#3D5064'}
              },
              axisTick: {
                lineStyle: {color: '#3D5064'}
              },
              axisLabel: {
                textStyle: {color: allColors.textColor}
              },
              type: 'value'
            }, {
              type: 'value',
              axisLine: {show: false},
              axisTick: {show: false},
              axisLabel: {show: false},
              splitLine: {show: false},
              splitArea: {show: false}
            }
          ],
          series: [
            {
              name: '全区同比',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: [],
              itemStyle: {normal: {lineStyle: {color: '#D7070F'}, color: '#D7070F'}}
            }, {
              name: '全区环比',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: [],
              itemStyle: {normal: {lineStyle: {color: '#FE773C'}, color: '#FE773C'}}
            }, {
              barMaxWidth: 25,
              name: '全区',
              type: 'bar',
              data: [],
              itemStyle: {normal: {color: '#FDFF00'}}
            }, {
              barMaxWidth: 25,
              name: '四上',
              type: 'bar',
              data: [],
              itemStyle: {normal: {color: '#01B127'}}
            }, {
              name: '四上同比',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: [],
              itemStyle: {normal: {lineStyle: {color: '#DC04F3'}, color: '#DC04F3'}}
            }, {
              name: '四上环比',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: [],
              itemStyle: {normal: {lineStyle: {color: '#0BA2F9'}, color: '#0BA2F9'}}
            }
          ]
        }
      }
    },
    methods: {
      setChartOption(item) {
        this.item = item;

        this.$refs.gdp.mergeOptions({
          tooltip: {
            formatter: function (params) {
              let strArr = [params[0].name];
              strArr.push('<span class="chart-dot" style="background-color: #FDFF00"></span>全区 : ' + formatAmount(item.gdpData[params[0].dataIndex]) + item.unit);
              strArr.push('<span class="chart-dot" style="background-color: #01B127"></span>四上 : ' + formatAmount(item.fourCapsData[params[0].dataIndex]) + item.unit);
              params.forEach((item) => {
                strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.seriesName + ' : ' + formatAmount(item.data) + '%');
              });
              return strArr.join('<br>');
            }
          },
          xAxis: [{
            data: item.xAxisData
          }, {
            data: item.xAxisData
          }],
          yAxis: {name: item.unit},
          series: [
            {
              name: '全区同比',
              data: item.gdpYoYData
            }, {
              name: '全区环比',
              data: item.gdpMoMData
            }, {
              name: '全区',
              data: item.gdpData
            }, {
              name: '四上',
              data: item.fourCapsData
            }, {
              name: '四上同比',
              data: item.fourCapsYoYData
            }, {
              name: '四上环比',
              data: item.fourCapsMoMData
            }
          ]
        });
      },
      setTooltipFormatter(selected) {
        var item = this.item;
        return function (params) {
          let index = params[0].dataIndex;
          let strArr = [];
          strArr.push(item.xAxisData[index] + ' 总产值');
          if (selected['全区'] === true) {
            strArr.push('<span class="chart-dot" style="background-color: #FDFF00"></span>全区 : ' + formatAmount(item.gdpData[index]) + item.unit);
          }
          if (selected['全区同比'] === true) {
            strArr.push('<span class="chart-dot" style="background-color: #D7070F"></span>全区同比 : ' + formatAmount(item.gdpYoYData[index]) + '%');
          }
          if (selected['全区环比'] === true) {
            strArr.push('<span class="chart-dot" style="background-color: #FE773C"></span>全区环比 : ' + formatAmount(item.gdpMoMData[index]) + '%');
          }
          if (selected['四上'] === true) {
            strArr.push('<span class="chart-dot" style="background-color: #01B127"></span>四上 : ' + formatAmount(item.fourCapsData[index]) + item.unit);
          }
          if (selected['四上同比'] === true) {
            strArr.push('<span class="chart-dot" style="background-color: #DC04F3"></span>四上同比 : ' + formatAmount(item.fourCapsYoYData[index]) + '%');
          }
          if (selected['四上环比'] === true) {
            strArr.push('<span class="chart-dot" style="background-color: #0BA2F9"></span>四上环比 : ' + formatAmount(item.fourCapsMoMData[index]) + '%');
          }
          return strArr.join('<br/>');
        }
      },
      gdpLegendSelectChanged(params) {
        let self = this;
        let i = 1;
        switch (params.name) {
          case '全区同比':
            i = 2;
            break;
          case '全区环比':
            i = 3;
            break;
          case '四上':
            i = 4;
            break;
          case '四上同比':
            i = 5;
            break;
          case '四上环比':
            i = 6;
            break;
        }
        if (params.selected[params.name] === false) {
          self.legendData[i - 1].icon = 'image:///src/assets/image/' + skin + '/gdp/gdp-' + i + '-unselected.png';
        } else {
          self.legendData[i - 1].icon = 'image:///src/assets/image/' + skin + '/gdp/gdp-' + i + '-selected.png';
        }

        let formatter = self.setTooltipFormatter(params.selected);

        this.$refs.gdp.mergeOptions({
          tooltip: {
            formatter: formatter
          },
          legend: {data: self.legendData}
        });
      }
    }
  }
</script>
