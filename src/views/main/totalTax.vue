<template>
  <chart :options="chartOption" ref="tax" @legendselectchanged="taxLegendSelectChanged" auto-resize></chart>
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
            top: 35,
            left: 30,
            right: 40,
            bottom: 50
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
                case '全库同比':
                case '区库同比':
                  return '同比';
                  break;
                case '全库环比':
                case '区库环比':
                  return '环比';
                  break;
                default:
                  return params;
                  break;
              }
            },
            data: ['全库','全库同比','全库环比','区库','区库同比','区库环比'],
            textStyle: {
              color: allColors.textColor,
              fontFamily: 'Microsoft YaHei'
            }
          },
          xAxis: [
            {
              name: '日\n期',
              boundaryGap: [20, 10],
              splitLine: {show: false},
              axisLine: {onZero: true, lineStyle: {color: '#3D5064', width: '2'}},
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
              axisLine: {onZero: true, lineStyle: {color: '#3D5064'}},
              axisTick: {lineStyle: {color: '#3D5064'}},
              axisLabel: {textStyle: {color: allColors.textColor}},
              type: 'value'
            },
            {
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
              name: '全库同比',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: [],
              itemStyle: {normal: {lineStyle: {color: '#DF0202'}, color: '#DF0202'}}
            }, {
              name: '全库环比',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: [],
              itemStyle: {normal: {lineStyle: {color: '#FE773C'}, color: '#FE773C'}}
            }, {
              barMaxWidth: 25,
              name: '全库',
              type: 'bar',
              data: [],
              itemStyle: {normal: {color: '#01A0FB'}}
            }, {
              barMaxWidth: 25,
              name: '区库',
              type: 'bar',
              data: [],
              itemStyle: {normal: {color: '#FCDC03'}}
            }, {
              name: '区库同比',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: [],
              itemStyle: {normal: {lineStyle: {color: '#00B025'}, color: '#00B025'}}
            }, {
              name: '区库环比',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: [],
              itemStyle: {normal: {lineStyle: {color: '#EC51A8'}, color: '#EC51A8'}}
            }
          ]
        }
      }
    },
    methods: {
      setChartOption(item){
        this.item = item;

        this.$refs.tax.mergeOptions({
          tooltip: {
            formatter: function (params) {
              let strArr = [params[0].name];
              strArr.push('<span class="chart-dot" style="background-color: #01A0FB"></span>全库 : ' + formatAmount(item.fullTaxData[params[0].dataIndex]) + item.unit);
              strArr.push('<span class="chart-dot" style="background-color: #FCDC03"></span>区库 : ' + formatAmount(item.districtTaxData[params[0].dataIndex]) + item.unit);
              params.forEach((item)=> {
                strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.seriesName + ' : ' + formatAmount(item.data) + '%');
              });
              return strArr.join('<br>');
            }
          },
          xAxis: {
            data: item.xAxisData
          },
          yAxis: {name: item.unit},
          series: [
            {
              name: '全库同比',
              data: item.fullYoYData
            }, {
              name: '全库环比',
              data: item.fullMoMData
            }, {
              name: '全库',
              data: item.fullTaxData
            }, {
              name: '区库',
              data: item.districtTaxData
            }, {
              name: '区库同比',
              data: item.districtYoYData
            }, {
              name: '区库环比',
              data: item.districtMoMData
            }
          ]
        });
      },
      setTooltipFormatter(selected){
        var item = this.item;
        return function (params) {
          let index = params[0].dataIndex;
          let strArr = [];
          strArr.push(item.xAxisData[index] + ' 总税收');
          if (selected['全库'] === true) {
            strArr.push('<span class="chart-dot" style="background-color: #01A0FB"></span>全库 : ' + formatAmount(item.fullTaxData[index]) + item.unit);
          }
          if (selected['全库同比'] === true) {
            strArr.push('<span class="chart-dot" style="background-color: #DF0202"></span>全库同比 : ' + formatAmount(item.fullYoYData[index]) + '%');
          }
          if (selected['全库环比'] === true) {
            strArr.push('<span class="chart-dot" style="background-color: #FE773C"></span>全库环比 : ' + formatAmount(item.fullMoMData[index]) + '%');
          }
          if (selected['区库'] === true) {
            strArr.push('<span class="chart-dot" style="background-color: #FCDC03"></span>区库 : ' + formatAmount(item.districtTaxData[index]) + item.unit);
          }
          if (selected['区库同比'] === true) {
            strArr.push('<span class="chart-dot" style="background-color: #00B025"></span>区库同比 : ' + formatAmount(item.districtYoYData[index]) + '%');
          }
          if (selected['区库环比'] === true) {
            strArr.push('<span class="chart-dot" style="background-color: #EC51A8"></span>区库环比 : ' + formatAmount(item.districtMoMData[index]) + '%');
          }
          return strArr.join('<br/>');
        }
      },
      taxLegendSelectChanged(params){
        let i = 1;
        let self = this;
        switch (params.name) {
          case '全库同比':
            i = 2;
            break;
          case '全库环比':
            i = 3;
            break;
          case '区库':
            i = 4;
            break;
          case '区库同比':
            i = 5;
            break;
          case '区库环比':
            i = 6;
            break;
        }
        if (params.selected[params.name] === false) {
          self.legendData[i - 1].icon = 'image:///src/assets/image/' + skin + '/tax/ttr-' + i + '-unselected.png';
        } else {
          self.legendData[i - 1].icon = 'image:///src/assets/image/' + skin + '/tax/ttr-' + i + '-selected.png';
        }

        let formatter = self.setTooltipFormatter(params.selected);

        this.$refs.tax.mergeOptions({
          tooltip: {
            formatter: formatter
          },
          legend: {data: self.legendData}
        });
      }
    }
  }
</script>
