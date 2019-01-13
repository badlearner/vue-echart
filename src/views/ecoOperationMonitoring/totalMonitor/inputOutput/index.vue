<template>
  <div class="content-wrap" style="height: 100%">
    <chart name="exp" :options="chartOption" ref="exp" @click="chartClick" auto-resize></chart>
  </div>
</template>
<script>
  import service from '@/services/ecoOperationMonitoring/service';
  import {formatAmount} from '@/filters';
  import allColors from '@/utils/styleUtil';

  export default {
    data() {
      return {
        date: '',
        show: false,
        chartOption: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            show: true,
          },
          title: {
            text: '进出口交易总额一览',
            left: 10,
            top: 15,
            textStyle: {
              fontSize: 16,
              fontWeight: '700',
              color: allColors.textColor
            }
          },
          legend: {
            right: 45,
            top: 5,
            width: 230,
            orient: 'horizontal',
            itemGap: 10,
            itemWidth: 10,
            itemHeight: 10,
            data: [
              {name: '合同利用外资', icon: 'rect'},
              {name: '离岸合同总额', icon: 'rect'},
              {name: '实际使用外资', icon: 'rect'},
              {name: '离岸执行总额', icon: 'rect'},
              {name: '出口总额', icon: 'rect'},
              {name: '境外投资总额', icon: 'rect'},
              {name: '进口总额', icon: 'rect'},
              {name: '境外投资项目协议总额', icon: 'rect'},
              {name: '全口径合同总额', icon: 'rect'},
              {name: '对外承包工程总额', icon: 'rect'}
            ],
            textStyle: {
              fontSize: 12,
              fontWeight: '400',
              color: allColors.textColor
            }
          },
          grid: {
            top: 130,
            left: '10',
            right: '40',
            bottom: '15',
            containLabel: true
          },
          xAxis: [
            {
              name: '日期',
              nameTextStyle: {
                color: allColors.textColor
              },
              type: 'category',
              data: [],
              axisLabel: {textStyle: {color: allColors.textColor}},
              splitLine: {
                show: true,
                lineStyle: {
                  color: allColors.textColor, width: 1, opacity: 0.6
                }
              },
              axisLine: {
                lineStyle: {color: allColors.textColor, width: 2}
              }
            }
          ],
          yAxis: [
            {
              nameTextStyle: {
                color: allColors.textColor
              },
              splitLine: {show: false},
              type: 'value',
              axisLabel: {textStyle: {color: allColors.textColor}},
              axisLine: {lineStyle: {color: allColors.textColor, width: 2}}
            }
          ],
          series: [{
            name: '合同利用外资', type: 'bar', barMaxWidth: 20,
            barGap: 0,
            data: [],
            itemStyle: {normal: {color: '#FF7640'}}
          }, {
            name: '离岸合同总额', type: 'bar', barMaxWidth: 20,
            barGap: 0,
            data: [],
            itemStyle: {normal: {color: '#F7E900'}}
          }, {
            name: '实际使用外资', type: 'bar', barMaxWidth: 20,
            barGap: 0,
            data: [],
            itemStyle: {normal: {color: '#B403C5'}}
          }, {
            name: '离岸执行总额', type: 'bar', barMaxWidth: 20,
            barGap: 0,
            data: [],
            itemStyle: {normal: {color: '#7B04F7'}}
          }, {
            name: '出口总额', type: 'bar', barMaxWidth: 20,
            barGap: 0,
            data: [],
            itemStyle: {normal: {color: '#0099EC'}}
          }, {
            name: '境外投资总额', type: 'bar', barMaxWidth: 20,
            barGap: 0,
            data: [],
            itemStyle: {normal: {color: '#8F4008'}}
          }, {
            name: '进口总额', type: 'bar', barMaxWidth: 20,
            barGap: 0,
            data: [],
            itemStyle: {normal: {color: '#EB51A7'}}
          }, {
            name: '境外投资项目协议总额', type: 'bar', barMaxWidth: 20,
            barGap: 0,
            data: [],
            itemStyle: {normal: {color: '#BE0607'}}
          }, {
            name: '全口径合同总额', type: 'bar', barMaxWidth: 20,
            barGap: 0,
            data: [],
            itemStyle: {normal: {color: '#029634'}}
          }, {
            name: '对外承包工程总额', type: 'bar', barMaxWidth: 20,
            barGap: 0,
            data: [],
            itemStyle: {normal: {color: '#02C7BF'}}
          }]
        }
      }
    },
    methods: {
      loadData(param) {
        this.$Progress.start();
        this._setChartOption(param);
      },
      export() {
        alert('export');
      },
      closeDialog() {
        this.show = false;
      },
      chartClick(param) {
        this.date = new Date(param.name.replace('.', "/")).getFullYear();
        this.show = true;
      },
      _setChartOption(param) {
        service.getInputOutData({params: param}).then((response) => {
          let item = response;
          let unit = item.unit || '';
          this.$refs.exp.mergeOptions({
            tooltip: {
              formatter: function (params) {
                var strArr = [params[0].name];
                params.forEach((item) => {
                  strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.seriesName + ' : ' + formatAmount(item.data) + unit);
                });
                return strArr.join('<br>');
              }
            },
            xAxis: {
              data: item.xAxisData
            },
            yAxis: {
              name: unit
            },
            series: [
              {name: '合同利用外资', data: item.contractForeignInvestment},
              {name: '实际使用外资', data: item.actualUseForeignInvestment},
              {name: '出口总额', data: item.totalExports},
              {name: '进口总额', data: item.totalImports},
              {name: '全口径合同总额', data: item.fullApertureContract},
              {name: '离岸合同总额', data: item.offshoreContract},
              {name: '离岸执行总额', data: item.totalOffshoreExecution},
              {name: '境外投资总额', data: item.totalOverseasInvestm},
              {name: '境外投资项目协议总额', data: item.totalOverseasInvestmentProjectAgreement},
              {name: '对外承包工程总额', data: item.totalForeignContractProjects}
            ]
          });
          //this.$Progress.finish();
        }, (response) => {
          console.log(response);
          //this.$Progress.fail();
        })
      }
    },
    mounted() {
      this._setChartOption();
    }
  }
</script>
