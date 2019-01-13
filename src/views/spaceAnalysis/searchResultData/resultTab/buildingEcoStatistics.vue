<template>
  <div>
    <div class="pie-echart">
      <pie-echart ref="pieEchart" class="height-inherit"></pie-echart>
    </div>
    <div class="pie-bar-chart">
      <p class="title"><strong>总资本数量排名/企业数量</strong>
        <span class="f-r">
                    <a class="color-b" :class="{'font-weight':tab==='孵化器'}" @click="tabC('孵化器')">孵化器</a>
                    <a class="color-b" :class="{'font-weight':tab==='园区'}" @click="tabC('园区')">园区</a>
                    <a class="color-b" :class="{'font-weight':tab==='写字楼'}" @click="tabC('写字楼')">写字楼</a>
                </span>
      </p>
      <div class="bar-chart">
        <bar-echart ref="barChart" class="height-inherit"></bar-echart>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import pieEchart from './buildingEcoEchart/pieEchart';
  import barEchart from './buildingEcoEchart/barEchart';

  export default {
    props: {
      buildingEcoStatistical: {type: Object}
    },
    watch: {
      buildingEcoStatistical: {
        handler: function (val, oldval) {
          if (val.pieData) {
            this.pieData(val.pieData);
          }
          if (val.barData) {
            this.resourceData = {
              yAxisData: [],
              seriesData: []
            };
            if (val.barData && val.barData.length > 0) {
              for (var i = 0; i < val.barData.length; i++) {
                var obj = {
                  value: val.barData[i].ZZCZB,
                  QYSL: val.barData[i].QYSL
                };
                this.resourceData.yAxisData[i] = val.barData[i].FHQMC ? val.barData[i].FHQMC : val.barData[i].YQMC;
                this.resourceData.seriesData[i] = obj;
              }
              this.resourceData.yAxisData.reverse();
              this.resourceData.seriesData.reverse();
            }
            this.barData();
          }
        },
        deep: true
      }
    }, components: {
      pieEchart,
      barEchart
    },
    data() {
      return {
        tableData3: [],
        tab: '孵化器',
        resourceData: {},
        companyListData: {
          yAxisData: [],
          QYSL: [],
          seriesData: []
        },
      }
    },
    methods: {
      pieData(data) {
        this.$refs.pieEchart.mergeOption(data);
      },
      barData() {
        this.$refs.barChart.mergeOption(this.resourceData);
      },
      setData(barChart) {

      },
      tabC(value) {
        this.tab = value;
        var object = this.$parent.$parent.$parent.$parent.$refs.buildingEco;
        object.resourceTypeChange(value);
      },
      tabChange(val) {
        this.tab = val;
      }
    },
    created() {

    },
    mounted() {

    }
  }
</script>
<style>
  .pie-echart {
    height: 200px;
    width: 400px;
  }

  .pie-bar-chart .title {
    background: #eef7ff;
    padding: 3px;
    font-size: 12px;
  }

  .darkgray .pie-bar-chart .title {
    background: #56bf67;
    color: #eee;
  }

  .darkblue .pie-bar-chart .title {
    background: #56bf67;
    color: #eee;
  }

  .pie-bar-chart .f-r {
    float: right;
  }

  .pie-bar-chart .color-b {
    cursor: pointer;
    color: #737373;
    margin-right: 10px;
  }

  .darkgray .pie-bar-chart .color-b {
    color: #eee;
  }

  .darkblue .pie-bar-chart .color-b {
    color: #eee;
  }

  .pie-bar-chart .f-r .font-weight {
    color: #333;
    font-weight: 700;
  }

  .pie-bar-chart .bar-chart {
    width: 400px;
    height: 230px;
  }

  .pie-echart .chart {
    height: 200px;
    width: 400px;
  }

  .pie-bar-chart .bar-chart .chart {
    width: 400px;
    height: 230px;
  }
</style>
