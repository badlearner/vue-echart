<template>
  <chart :options="chartOption" name="zone" ref="zone" @legendselectchanged="legendselectchanged"
         @click="chartClick" auto-resize/>
</template>
<script>
  import {formatAmount,formatInt} from '@/filters';
  import allColors from '@/utils/styleUtil';

  export default {
    data() {
      return {
        chartOption: {
          title: {
            text: '街镇产值排名',
            x: 'center',
            y: 'bottom',
            textStyle: {
              color: allColors.textColor,
              fontSize: 15,
              fontWeight: 700
            }
          },
          legend: {
            textStyle: {
              color: allColors.textColor,
            },
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 3,
            top: 'top',
            left: 'center',
            data: ['批发业', '零售业', '住宿业', '餐饮业']
          },
          color: ['#EB51A7', '#3398DB', '#FF5554', '#FD9811'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '10',
            right: '65',
            bottom: '20',
            top: '30',
            containLabel: true
          },
          dataZoom: [
            {
              type: 'slider',
              show: true,
              yAxisIndex: [0],
              width: 20,
              top: 65,
              start: 65,
              end: 100,
              showDetail: false
            }
          ],
          xAxis: {
            name: '平方米',
            nameTextStyle: {
              color: allColors.textColor
            },
            position: 'top',
            type: 'value',
            splitLine: {show: false},
            axisLabel: {
              show: true,
              interval: 0,
              textStyle: {
                color: allColors.textColor
              }
            },
            axisLine: {
              lineStyle: {
                color: allColors.textColor,
                width: 2
              }
            }
          },
          yAxis: {
            type: 'category',
            data: ['-'],
            nameTextStyle: {
              color: allColors.textColor
            },
            splitLine: {
              show: false
            },
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
            }
          },
          series: [
            {
              name: '批发业',
              type: 'bar',
              stack: '面积',
              barWidth: '80%',
              data: []
            },
            {
              name: '零售业',
              type: 'bar',
              stack: '面积',
              barWidth: '80%',
              data: []
            }, {
              name: '住宿业',
              type: 'bar',
              stack: '面积',
              barWidth: '80%',
              data: []
            },
            {
              name: '餐饮业',
              type: 'bar',
              stack: '面积',
              barWidth: '80%',
              data: []
            }
          ]
        },
        seriesData: null
      }
    },
    computed: {
      queryText() {
        return this.$store.state.search.queryText;
      }
    },
    methods: {
      chartClick(params) {
        this.$emit('click', params)
      },
      legendselectchanged(param) {
        this.$emit('legendcange', param);
      },
      setChartOption(item, isFirst) {
        if (isFirst) {
          this.seriesData = item.seriesData;
        }
        for(var i=0;i<item.seriesData.length;i++){
          item.seriesData[i].type = "bar";
        }
        let unit = item.seriesData && item.seriesData.length > 1 && item.seriesData[0].unit;

        this.$refs.zone.mergeOptions({
          title: {
            text: '街镇' + isFirst + '排名',
          },
          legend: {
            data: item.legendDataList
          },
          tooltip: {
            formatter: function (params) {
              var strArr = [params[0].name];
              params.forEach((items) => {
                strArr.push('<span class="chart-dot" style="background-color: ' + items.color + '"></span>' + items.seriesName + ' : ' + formatAmount(items.value) + (unit || ''));
              })
              ;
              return strArr.join('<br>');
            }
          },
          xAxis: {name: unit},
          yAxis: {data: item.yAxisData},
          series: item.seriesData
        })
      }
    }
  }
</script>
