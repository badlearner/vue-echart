<template>
  <chart :options="chartOption" ref="chart" auto-resize @legendselectchanged="legendselectchanged"></chart>
</template>

<script>
  import {add} from '@/utils/accountUtil';
  import allColors from '@/utils/styleUtil';

  export default {
    data () {
      return {
        xAxisData: null,
        seriesData: null,
        chartOption: {
          title: {
            x: 15,
            y: 5,
            text: '街道TOP10',
            textStyle: {
              fontSize: 12,
              fontWeight: 500,
              color: allColors.textColor,
              fontFamily: 'Microsoft YaHei'
            }
          },
          grid: {
            left: '1%',
            right: '1%',
            bottom: '0',
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
            }
          },
          legend: {
            x: '45%',
            y: 5,
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 10,
            data: ['园区', '孵化器', '楼宇经济'],
            textStyle: {
              color: allColors.textColor,
              fontFamily: 'Microsoft YaHei'
            }
          },
          color: ['#9be8f2', '#d74f51', '#f7d76a'],
          xAxis: {
            type: 'category',
            nameTextStyle: {
              color: allColors.textColor
            },
            data: [],
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: allColors.lineColor
              }
            },
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 45,
              margin: 2,
              textStyle: {
                color: allColors.textColor
              }
            },
            axisTick: {show: false},
          },
          yAxis: {
            nameTextStyle: {
              color: allColors.textColor
            },
            axisLine: {
              show: false,
            },
            type: 'value',
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {show: false},
            splitNumber: 3
          },
          series: [
            {
              name: '园区',
              type: 'bar',
              stack: 'group',
              data: [0]
            },
            {
              name: '孵化器',
              type: 'bar',
              stack: 'group',
              data: [0]
            },
            {
              name: '楼宇经济',
              type: 'bar',
              stack: 'group',
              data: [0]
            }
          ]
        }
      }
    },
    methods: {
      mergeOption (xAxisData, series) {
        this.xAxisData = xAxisData.slice(0, 10);
        for (var i = 0; i < series.length; i++) {
          series[i].data = series[i].data.slice(0, 10);
        }
        this.series = series;
        this.$refs.chart.mergeOptions({
          xAxis: {data: xAxisData.slice(0, 10)},
          series: series
        })
      },
      legendselectchanged (param) {
        let seriesData = [];
        let tempObj = {};

        if (this.isSelectedAll(param)) {
          this.$refs.chart.mergeOptions({xAxis: {data: this.xAxisData}, series: this.series});
          return;
        }

        this.series.forEach((item) => {
          if (param.selected[item.name]) {
            seriesData.push({name: item.name, data: item.data});

            item.data.forEach((val, i) => {
              let street = this.xAxisData[i];
              if (tempObj[street]) {
                tempObj[street] = add(tempObj[street], val);
              } else {
                tempObj[street] = val
              }
            })
          }
        });

        let sortForStreet = Object.keys(tempObj).sort((a, b) => {
          return tempObj[b] - tempObj[a];
        });

        let data = seriesData.map(item => {
          let arr = [];
          sortForStreet.forEach(street => {
            let index = this.xAxisData.indexOf(street);

            arr.push(item.data[index])
          });
          return {name: item.name, data: arr}
        });

        this.$refs.chart.mergeOptions({xAxis: {data: sortForStreet}, series: data});
      },
      isSelectedAll (param) {
        let result = true;
        Object.keys(param.selected).forEach(key => {
          if (!param.selected[key]) {
            result = false;
          }
        });
        return result
      }
    }
  }
</script>
