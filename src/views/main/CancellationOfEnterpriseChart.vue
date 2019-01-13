<template>
  <chart :options="chartOption" ref="chart" auto-resize></chart>
</template>

<script>
  import allColors from '@/utils/styleUtil'

  export default {
    data () {
      return {
        mainData: [],
        chartOption: {
          grid: {
            top: 30,
            left: 60,
            right: 35,
            bottom: 25
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: {
                color: '#f7e54e',
                width: 2,
                type: 'solid'
              }
            },
            position: function (pos, params, dom, rect, size) {
              // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
              var obj = {top: 0};
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
              return obj;
            }
          },
          legend: {
            itemWidth: 20,
            itemHeight: 10,
            itemGap: 15,
            data: ['企业', '个体户'],
            textStyle: {
              color: allColors.textColor,
              fontFamily: 'Microsoft YaHei'
            }
          },
          color: ['#458FE8', '#FCCB40'],
          xAxis: {
            name: '年',
            nameTextStyle: {
              color: allColors.textColor
            },
            type: 'category',
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
            axisTick: {show: false},
          },
          yAxis: [{
            name: '户',
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
            splitLine: {
              lineStyle: {
                color: allColors.lineColor,
                width: 0.5,
                opacity: 0.3,
                type: 'solid'
              }
            },
            axisTick: {show: false},
            splitNumber: 3
          }, {
            show: false,
            type: 'value'
          }],
          series: [
            {
              name: '企业',
              type: 'bar',
              yAxisIndex: 0,
              stack: 'group',
              barMaxWidth: '50%',
              data: [0]
            },
            {
              name: '企业',
              type: 'line',
              yAxisIndex: 1,
              data: [0]
            },
            {
              name: '个体户',
              type: 'bar',
              yAxisIndex: 0,
              stack: 'group',
              barMaxWidth: '50%',
              data: [0]
            },
            {
              name: '个体户',
              type: 'line',
              yAxisIndex: 1,
              data: [0]
            }
          ]
        }
      }
    },
    methods: {
      mergeOption (xAxisData, seriesData) {
        var _this = this;
        var numMin = seriesData.enterpriseData[0].growth, numMax = 0;
        var enterpriseLine = [], personLine = [];
        _this.mainData = seriesData.allData;
        if (seriesData.enterpriseData) {
          for (var i = 0; i < seriesData.enterpriseData.length; i++) {
            enterpriseLine.push(seriesData.enterpriseData[i].growth);
            personLine.push(seriesData.personalData[i].growth);
            if (numMin > seriesData.enterpriseData[i].growth) {
              numMin = seriesData.enterpriseData[i].growth;
            }
            if (numMin > seriesData.personalData[i].growth) {
              numMin = seriesData.personalData[i].growth;
            }
            if (numMax < seriesData.enterpriseData[i].growth) {
              numMax = seriesData.enterpriseData[i].growth;
            }
            if (numMax < seriesData.personalData[i].growth) {
              numMax = seriesData.personalData[i].growth;
            }
          }
        }
        this.$refs.chart.mergeOptions({
          xAxis: {data: xAxisData},
          yAxis: [{}, {
            min: numMin - 5,
            max: numMax + 5
          }],
          tooltip: {
            formatter: function (params) {
              let strArr = '';
              strArr += "<p style='margin:1px;'>" + params[0].name + "</p>";
              strArr += "<p style='margin:2px;'><span>市场主体：</span><span style='display: inline-block;width:65px;'>"
                + _this.mainData[params[0].dataIndex].value
                + "</span><span>增量：</span><span style='display: inline-block;width:60px;'>"
                + _this.mainData[params[0].dataIndex].increment
                + "</span>";
              if (_this.mainData[params[0].dataIndex].growth > 0) {
                strArr += '<span class="k-red">↑</span>' + _this.mainData[params[0].dataIndex].growth + '%</span></p>';
              } else if (_this.mainData[params[0].dataIndex].growth < 0) {
                strArr += '<span class="k-green">↓</span>' + _this.mainData[params[0].dataIndex].growth + '%</span></p>';
              } else {
                strArr += '<span></span>' + _this.mainData[params[0].dataIndex].growth + '</p>';
              }
              params.forEach((item) => {
                if (item.seriesType === 'bar') {
                  if (item.seriesName === '企业') {
                    strArr += "<p style='margin:2px;'>企<span style='display: inline-block;width:28px;'></span>业：<span style='display: inline-block;width:65px;'> "
                      + item.data.value
                      + "</span><span>增量：</span><span style='display: inline-block;width:60px;'>"
                      + item.data.increment
                      + "</span>";
                    if (item.data.growth > 0) {
                      strArr += '<span class="k-red">↑</span>' + item.data.growth + '%</span></p>';
                    } else if (item.data.growth < 0) {
                      strArr += '<span class="k-green">↓</span>' + item.data.growth + '%</span></p>';
                    } else {
                      strArr += '<span></span>' + item.data.growth + '</p>';
                    }
                  }
                  if (item.seriesName == '个体户') {
                    strArr += "<p style='margin:3px;'>个<span style='display: inline-block;width:7px;'></span>体<span style='display: inline-block;width:7px;'></span>户：<span style='display: inline-block;width:65px;'>"
                      + item.data.value
                      + "</span><span>增量：</span><span style='display: inline-block;width:60px;'>"
                      + item.data.increment
                      + "</span>";
                    if (item.data.growth > 0) {
                      strArr += '<span class="k-red">↑</span>' + item.data.growth + '%</span></p>';
                    } else if (item.data.growth < 0) {
                      strArr += '<span class="k-green">↓</span>' + item.data.growth + '%</span></p>';
                    } else {
                      strArr += '<span></span>' + item.data.growth + '</p>';
                    }
                  }
                }
              })
              return strArr
            }
          },
          series: [
            {name: '企业', data: seriesData.enterpriseData},
            {name: '企业', data: enterpriseLine},
            {name: '个体户', data: seriesData.personalData},
            {name: '个体户', data: personLine}]
        })
      }
    }
  }
</script>
