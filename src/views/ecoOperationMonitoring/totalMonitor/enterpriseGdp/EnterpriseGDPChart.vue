<style lang="less">
  .map-tooltip-content {
    width: 230px;
  }

  .gdp-value-red {
    color: red;
    font-weight: bold;
  }

  .gdp-value-green {
    color: #5cd411;
    font-weight: bold;
  }

</style>
<template>
  <chart :options="chartOption" name='gdp' ref="chart" auto-resize @legendselectchanged="legendselectchanged"
         @click="chartClick"/>
</template>
<script type="text/babel">
  import {formatAmount} from '@/filters';
  import allColors from '@/utils/styleUtil';

  export default {
    data() {
      return {
        xAxisData: null,
        unit: null,
        limitData: null,
        rGdpData: null,
        rGdpAccumulaData: null,
        chartOption: {
          grid: {
            top: 40,
            left: '10',
            right: '40',
            bottom: '35',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {type: 'shadow'}
          },
          legend: {
            itemWidth: 15,
            itemHeight: 15,
            textStyle: {
              fontSize: 12,
              fontWeight: 700,
              color: allColors.textColor
            },
            data: null,
            selected:{
              '限下产值':false,
              '当年累计四上产值':true
            }
          },
          title: {
            text: '当年累计四上产值',
            x: 'center',
            y: 'bottom',
            textStyle: {
              fontSize: 15,
              fontWeight: 700,
              color: allColors.textColor
            }
          },
          color: ['#00B024', '#FCDC03'],
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
              name: '限下产值',
              type: 'bar',
              barMaxWidth: 35,
              data: []
            },
            {
              name: '当年累计四上产值',
              type: 'bar',
              barMaxWidth: 35,
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
      legendselectchanged(param) {
        if (param.name === '当年累计四上产值') {
          param.selected['当年累计四上产值'] = param.selected['当年累计四上产值'];
        }
        if (param.name === '线下产值') {
          param.selected['线下产值'] = param.selected['线下产值'];
        }

        this.$refs.chart.mergeOptions({
          legend: {selected: param.selected}
        });

        this.$emit('gdpLegendSelectChanged', param);
      },
      setChartLegend(type) {
        let data = [
          {name: '限下产值', icon: 'rect', textStyle: {color: '#00B024'}},
          {name: '当年累计四上产值', icon: 'rect', textStyle: {color: '#FCDC03'}}
        ], selected = {
          '限下产值': false,
          '当年累计四上产值': true
        };

        if (type === '1') {
          data.splice(1, 0, {name: '四上产值', show: false, icon: 'rect', textStyle: {color: '#3398DB'}})
          selected['当年累计四上产值'] = false;
        }

        this.chartOption.legend.data = data;
        this.chartOption.legend.selected = selected;
      },
      setChartTitle(title) {
        this.$refs.chart.mergeOptions({
          title: {text: title + '产值'}
        })
      },
      mergeOptions(option) {
        this.$refs.chart.mergeOptions(option)
      },
      setChartOption(xAxisData, unit, incrementalUnit, underLimitGdpData, rGdpData, rGdpAccumulaData) {
        xAxisData && this.$refs.chart.mergeOptions({
          tooltip: {
            formatter: function (params) {
              var strArr = [params[0].name];

              params.forEach((item) => {
                if (!item.data) {
                  return
                }

                strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.seriesName + ' : ' + formatAmount(item.value) + unit || '');
                if (item.data.incremental > 0) {
                  strArr.push('<span class="gdp-value-red">↑&nbsp;环比 : ' + item.data.incremental + incrementalUnit + '&nbsp;+' + item.data.growth + '%</span>');
                } else {
                  strArr.push('<span class="gdp-value-green">↓&nbsp;环比 : ' + item.data.incremental + incrementalUnit + '&nbsp;' + item.data.growth + '%</span>');
                }
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
            name: '限下产值',
            data: underLimitGdpData
          }, {
            name: '当年累计四上产值',
            data: rGdpAccumulaData
          }]
        });
      }
    },
    destroyed() {
      this.xAxisData = null;
      this.unit = null;
      this.limitData = null;
      this.rGdpData = null;
      this.rGdpAccumulaData = null;
      this.chartOption = null;
    }
  }
</script>
