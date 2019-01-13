<template>
  <chart :options="chartOption" ref="bar" auto-resize></chart>
</template>
<script>
  import allColors from '@/utils/styleUtil';
  import {formatAmount} from '@/filters';

  export default{
    data(){
      return {
        color: ['#C12E34','E6B600','#3398DB','#C12E34','#E6B600','#2B821D','#005EAA','#2B821D','#339CA8','#2B821D','#CDA819','#C12E34','#3398DB','#C12E34','#E6B600','#2B821D','#005EAA','#2B821D','#339CA8','#2B821D','#CDA819'],
        chartOption: {
          title: {
            text: '',
            top: 'bottom',
            left: 'center',
            textStyle: {
              color: allColors.textColor,
              fontSize: 14,
              fontWeight: 700
            }
          },
          grid: {
            x: 5,
            x2: 30,
            y2: 35,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {type: 'shadow'}
          },
          xAxis: [
            {
              splitLine: {show: false},
              axisLine: {
                onZero: true,
                lineStyle: {color: allColors.textColor, width: '2'}
              },
              axisTick: {lineStyle: {color: allColors.textColor}},
              axisLabel: {textStyle: {color: allColors.textColor},rotate:45,interval:0},
              type: 'category',
              data: []
            }
          ],
          yAxis: [
            {
              splitLine: {lineStyle: {type: 'dotted'}},
              axisLine: {
                onZero: true,
                lineStyle: {color: allColors.textColor}
              },
              axisTick: {
                lineStyle: {color: allColors.textColor}
              },
              axisLabel: {
                textStyle: {color: allColors.textColor}
              },
              type: 'value'
            }
          ],
          series: [
            {
              name: '产值',
              type: 'bar',
              data: []
            }
          ]
        }
      }
    },
    methods: {
      setChartOption(data) {
        var xAxisData=[],seriesData=[];
        if(data.xAxisData){
          for(var i = 0; i < data.xAxisData.length; i++){
            if(data.xAxisData[i].ZJ){
              xAxisData[i]=data.xAxisData[i].ZJ;
            }
            if(data.xAxisData[i].HYMC){
              xAxisData[i]=data.xAxisData[i].HYMC;
            }
          }
          for(var i = 0; i < data.seriesData.length; i++){
            var object={
              value:0,
              itemStyle:{
                color:''
              }
            }
            object.value=data.seriesData[i];
            object.itemStyle.color=this.color[i];
            seriesData.push(object);
          }
        }
        this.$refs.bar.mergeOptions({
          tooltip: {
            trigger: 'axis',
            axisPointer: {type: 'shadow'}
          },
          xAxis: {
            data: xAxisData
          },
          yAxis: {
            name: data.unit,
          },
          series: [{
            data: seriesData
          }]
        })
      }
    }
  }
</script>
