<template>
  <chart :options="chartOption" ref="chart" auto-resize />
</template>
<script>
  import allColors from '@/utils/styleUtil';
  export default{
    data(){
      return {
        chartOption: {
          title: {
            show: true,
            text: '',
            textStyle: {
              color: allColors.textColor,
              fontSize: 15,
              fontWeight: 700
            }
          },
          legend: {
            show: false,
            x: '20',
            orient: 'vertical',
            itemWidth: 14,
            itemHeight: 10,
            data: [{name: '限上批发零售和住宿餐饮企业'}, {name: '规模以上服务业'}, {name: '资质等级建筑业'}, {name: '规模以上工业企业'}],
            textStyle: {
              color: allColors.textColor
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function (item) {
              let strArr = [item.seriesName + '<br>'];
              strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.name + ' : (' + item.data.value + '家)');
              strArr.push('(占比 : ' + item.percent + '%)');
              return strArr.join('');
            }
          },
          series: [
            {
              name: '四上企业数量',
              type: 'pie',
              radius: ['20%', '70%'],
              center: ['50%', '40%'],
              data: [
                {
                  name: '限上批发零售和住宿餐饮企业',
                  value: 200,
                  itemStyle: {
                    normal: {
                      color: '#02C7C0'
                    }
                  }
                },
                {
                  name: '规模以上服务业',
                  value: 400,
                  itemStyle: {
                    normal: {
                      color: '#FE773D'
                    }
                  }
                },
                {
                  name: '资质等级建筑业',
                  value: 300,
                  itemStyle: {
                    normal: {
                      color: '#5265ff'
                    }
                  }
                },
                {
                  name: '规模以上工业企业',
                  value: 600,
                  itemStyle: {
                    normal:{
                      color:'#EB51A7'
                    }
                  }
                }],
              roseType: 'area',
              itemStyle: {
                normal: {
                  label: {
                    formatter: function (params) {
                      if (params.name === '限上批发零售和住宿餐饮企业') {
                        return '限上批发零售和\n住宿餐饮企业'
                      } else if (params.name === '规模以上服务业') {
                        return '规模以上\n服务业';
                      }
                      else if (params.name === '资质等级建筑业') {
                        return '资质等级\n建筑业';
                      }
                      else {
                        return '规模以上\n工业企业'
                      }
                    }
                  }
                }
              }
            }
          ]
        }
      }
    },
    methods: {
      setChartOption(data) {
        var color;
        for (var i = 0; i < data.length; i++) {
          var item = data[i];
          switch (item.name) {
            case '限上批发零售和住宿餐饮企业':
              color = '#02C7C0';
              break;
            case '规模以上服务业':
              color = '#FE773D';
              break;
            case '资质等级建筑业':
              color = '#5265ff';
              break;
            case '规模以上工业企业':
              color = '#EB51A7';
              break;
          }
          item.itemStyle = {normal: {color: color}}
        }
        this.$refs.chart.mergeOptions({
          series: {data: data}
        })
      }
    }
  }
</script>
