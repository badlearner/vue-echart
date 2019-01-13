<template>
  <e-chart-map :chartOption="option" :src="src" :map-name="mapName" ref="chart"></e-chart-map>
</template>

<script>
  import EChartMap from '@/components/echart-map/Map';
  import echarts from '@/assets/jsPlugins/echarts';
  import allColors from '@/utils/styleUtil';
  import {formatAmount} from '@/filters';

  export default {
    data() {
      return {
        src: '../../../static/mapData/haizhu.json',
        mapName: 'haizhu',
        option: {
          tooltip: {
            trigger: "item",
            formatter: function (params) {
              let colors = {
                  '工业': '#EB51A7',
                  '商业': '#3398DB',
                  '服务业': '#FF5554',
                  '建筑业': '#FD9811',
                  '房地产': '#AD6BE5',
                },
                strArr = ['<div class="map-tooltip-content">' + params.name];
              strArr.push('<span class="chart-dot" style="background-color: #2DDDDF"></span>总全库税收：' + formatAmount(params.data.value) + params.data.unit);
              strArr.push('<span class="chart-dot" style="background-color: #B3C510"></span>排名：' + params.data.ranking + '</span>');
              params.data.selectedItem.forEach(function (item) {
                if (item.yoy > 0) {
                  strArr.push('<span class="chart-dot" style="background-color:' + colors[item.name] + '">' +
                    '</span>' + item.name + '：' + formatAmount(item.value) + params.data.unit + '<span class="chart-value-red">↑&nbsp;' + item.yoy + '%</span>');
                } else if (item.yoy < 0) {
                  strArr.push('<span class="chart-dot" style="background-color: ' + colors[item.name] + '">' +

                    '</span>' + item.name + '：' + formatAmount(item.value) + params.data.unit + '<span class="chart-value-green">↓&nbsp;' + item.yoy + '%</span>');
                } else if (item.yoy == 0) {
                  strArr.push('<span class="chart-dot" style="background-color: ' + colors[item.name] + '">' +
                    '</span>' + item.name + '：' + formatAmount(item.value) + params.data.unit + '<span style="float:right">&nbsp;--&nbsp;' + '</span>');
                }
              });
              return strArr.join('</br>') + '</div>'
            }
          },
          visualMap: {
            z: 200,
            left: '20',
            top: 'bottom',
            text: ['高', '低'],
            calculable: true,
            textStyle:{
              color:allColors.textColor
            },
            inRange: {
              color: ['#9ACDF7', '#4DA8EE']
            }
          },
          series: [{
            name: 'haizhu',
            type: 'map',
            mapType: 'haizhu',
            roam: false,
            data: [],
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: '#000',
                  fontSize: 12
                }
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff',
                  fontSize: 12
                }
              }
            },
            itemStyle: {
              normal: {//地图省颜色，边界颜色
                borderColor: '#fff',
              },
              emphasis: {//经过后的颜色
                areaColor:'#88bbe6',
                color:'#fff',
                shadowColor: 'rgba(45, 134, 225, 0.5)',
                shadowBlur: 10,
              }
            },
            markPoint:{
              symbolSize: function (val) {
                return val / 10000;
              },
              data:[],
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'inside',
                  show: true,
                  textStyle: {
                    color: '#000',
                    fontSize: 12
                  },
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 12
                  }
                }
              },
            },
            aspectScale: 1
          }]
        }
      }
    },
    components: {
      EChartMap
    }
    ,
    methods: {
      mergeOption(seriesData,resultStreetPointerData) {
        let max = 0;
        if (seriesData&&seriesData.length > 0) {
          let len = seriesData.length;
          for (let i = 0; i < len; i++) {
            if (seriesData[i].value > max) {
              max = seriesData[i].value;
            }
          }
          this.$refs.chart.mergeOptions({
            visualMap:{
              max:max,min: 0,range:[0,max]
            },
            series: [
              {
                data: seriesData,
                markPoint:{
                  data:resultStreetPointerData
                }
              }
            ]
          })
        }else{
          this.$refs.chart.mergeOptions({
            visualMap:{
              max:44,min: 0,range:[0,max]
            },
            series: [
              {
                data: [],
                markPoint:{
                  data:resultStreetPointerData
                }
              }
            ]
          })
        }
      }
    }
  }
</script>

<style scoped>
</style>
