<template>
  <e-chart-map :chartOption="option" :src="src" :map-name="mapName" ref="chart"></e-chart-map>
</template>

<script>
  import allColors from '@/utils/styleUtil'
  import EChartMap from '../../components/echart-map/Map'
  import ECharts from 'vue-echarts/components/ECharts'
  export default {
    data () {
      return {
        src: '../../../static/mapData/gz_map.json',
        mapName: 'guangzhou',
        option: {
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              if (params.value) {
                return params.name + '' + params.value[2]
              } else {
                return params.seriesName
              }
            }
          },
          geo: {
            roam: false,
            map: 'guangzhou',
            label: {
              normal: {
                show: true,
                color: allColors.map.geo.color
              },
              emphasis: {
                show: true,
                color: allColors.map.geo.color
              }
            },
            itemStyle: {
              normal: {
                areaColor: allColors.mapItemStyle.normal.areaColor,
                borderColor: allColors.mapItemStyle.normal.borderColor,
                borderWidth: 1
              },
              emphasis: {
                areaColor: allColors.mapItemStyle.emphasis.areaColor
              }
            },
            aspectScale: 1,
            layoutCenter: ['50%', '50%'],
            layoutSize: '100%'
          },
          series: [
            {
              type: 'lines',
              zlevel: 2,
              symbol: ['none', 'arrow'],
              effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbolSize: 8
              },
              lineStyle: {
                normal: {
                  color: '#f7d76a',
                  width: 1.2,
                  opacity: 1,
                  curveness: 0.2
                }
              },
              data: []
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              symbolSize: 35,
              zlevel: 2,
              rippleEffect: {
                period: 0,
                scale: 0.1,
                brushType: 'fill'
              },
              label: {
                normal: {
                  show: true,
                  color: '#fff',
                  formatter: function (params) {
                    if (params.value) {
                      return params.value[2]
                    } else {
                      return ''
                    }
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: new ECharts.graphic.RadialGradient(0.5, 0.5, 1, [{
                    offset: 0,
                    color: 'rgba(247, 215, 106, 0)'
                  }, {
                    offset: 0.3,
                    color: 'rgba(247, 215, 106, 0.2)'
                  }, {
                    offset: 0.5,
                    color: 'rgba(247, 215, 106, 0.7)'
                  }, {
                    offset: 1,
                    color: 'rgba(247, 215, 106, 0.85)'
                  }])
                }
              },
              data: []
            }
          ]
        }
      }
    },
    components: {
      EChartMap
    },
    methods: {
      mergeOption (linesData, valueData, isMovrOut) {
        const name = isMovrOut ? '海珠区迁出企业' : '海珠区迁入企业'
        this.$refs.chart.mergeOptions({
          series: [
            {
              name: name,
              type: 'lines',
              data: linesData
            },
            {
              name: name,
              type: 'effectScatter',
              data: valueData
            }
          ]
        })
      }
    }
  }
</script>
