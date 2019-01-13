<template>
  <e-chart-map :chartOption="option" :src="src" :map-name="mapName" ref="chart"></e-chart-map>
</template>

<script>
  import EChartMap from '@/components/echart-map/Map';
  import echarts from '@/assets/jsPlugins/echarts';
  import allColors from '@/utils/styleUtil';
  export default {
    data() {
      return {
        src: '../../../static/mapData/haizhu.json',
        mapName: 'haizhu',
        option: {
          tooltip: {
            trigger: "item",
            formatter: function (params) {
              let strArr = ['<div style="color: #eee;padding: 5px;"><div class="font-13">' + params.name +'：&nbsp;&nbsp;'];
              if(params.data.ranking){
                strArr.push(params.value+'&nbsp;&nbsp;'+'TOP' + params.data.ranking + '</div>');
              }
              if(params.data.industrys){
                params.data.industrys.forEach(item => {
                  strArr.push(['<div class="font-14" style="padding: 3px 5px;">' + item.name + '：' + item.count] + '<span class="map-tooltip-industry-ranking">');
                  if (item.ratio > 0) {
                    strArr.push('<span class="k-red">↑ </span>'+item.ratio + '%</span></div>');
                  } else if(item.ratio < 0) {
                    strArr.push('<span class="k-green">↓ </span>'+item.ratio + '%</span></div>');
                  }else{
                    strArr.push(item.ratio + '</span></div>');
                  }
                });
              }
              strArr.push('</div');
              return strArr.join('');
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
