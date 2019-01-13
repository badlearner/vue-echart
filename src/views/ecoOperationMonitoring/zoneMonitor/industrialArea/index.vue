<template>
  <div class="h-hundred-percent" style="position: relative;">
    <div style="height: 32px;position: absolute;top:0;right:0;z-index: 6666"><router-link :to="{path: '/MainIndex/ecoOperationMonitoring/zoneMonitor/industrialAreaMap'}"><img class="pull-right" v-bind:src="icon" /></router-link></div>
    <div class="content-wrap" style="height: calc(100% - 32px)">
      <div class="content-body-top">
        <div class="left-chart-wrap pull-left">
          <professional-wholesale-quantity ref="quantity" @click="quantityChartClick"
                                           @sizeChange="quantityChartChangSize"/>
        </div>
        <div class="right-chart-wrap pull-right">
          <professional-wholesale-area ref="area" @click="areaChartClick" @sizeChange="areaChartChangSize"/>
        </div>
      </div>
      <div class="content-body-bottom">
        <div class="left-chart-wrap pull-left">
          <professional-wholesale-gdp ref="gdp" @click="gdpPChartClick" @sizeChange="gdpChartChangSize"/>
        </div>
        <div class="right-chart-wrap pull-right">
          <professional-wholesale-tax ref="tax" @click="taxChartClick" @sizeChange="taxChartChangSize"/>
        </div>
      </div>
    </div>
    <professional-wholesale-portrait v-if="showPortrait" ref="portrait" @hidePortrait="hidePortrait"/>
  </div>
</template>
<script>
  import Vue from 'vue';
  import service from '@/services/ecoOperationMonitoring/ZoneMonitorService';
  import professionalWholesaleArea from './WholesaleArea.vue';
  import professionalWholesaleGdp from './WholesaleGDPChart.vue';
  import professionalWholesaleTax from './WholesaleTaxChart.vue';
  import professionalWholesaleQuantity from './WholesaleQuantity.vue';
  import professionalWholesalePortrait from './ProfessionalWholesalePortrait.vue';

  export default {
    data() {
      return {
        icon: require('@/assets/image/backMap.png'),
        param: null,
        showPortrait: false
      }
    },
    events: {},
    components: {
      professionalWholesaleArea,
      professionalWholesaleQuantity,
      professionalWholesaleGdp,
      professionalWholesaleTax,
      professionalWholesalePortrait
    },
    methods: {
      loadData: function (param) {
        this.param = param;
        //this.$Progress.start();
        this._setChartOption();
      },
      gdpPChartClick(param) {
        this._openPortrait(param.data);
      },
      quantityChartClick(param) {
        this._openPortrait(param.data);
      },
      areaChartClick(param) {
        this._openPortrait(param.data);
      },
      taxChartClick(param) {
        this._openPortrait(param.data);
      },
      quantityChartChangSize(count) {
        this._setChartDataByCountAndDifference(count, 1);
      },
      areaChartChangSize(count) {
        this._setChartDataByCountAndDifference(count, 2);
      },
      gdpChartChangSize(count) {
        this._setChartDataByCountAndDifference(count, 3);
      },
      taxChartChangSize(count) {
        this._setChartDataByCountAndDifference(count, 4);
      },
      export: function () {
        alert('export');
      },
      goToMap() {
        this.$router.push('/professionalWholesaleMap');
      },
      hidePortrait() {
        this.showPortrait = false;
      },
      _openPortrait(item) {
        this.showPortrait = true;
        Vue.nextTick(() => {
          this.$refs.portrait.setPortraitDataById(item.id);
        })
      },
      _setChartOption() {
        service.getDataProfessional({params: this._getParams()}).then((response) => {
          let item = response;
          this.$refs.gdp.setOption(item.gdp.seriesData, item.gdp.unit);
          this.$refs.tax.setOption(item.tax.seriesData, item.tax.unit);
          this.$refs.area.setOption(item.areas);
          this.$refs.quantity.setOption(item.nums);
          //this.$Progress.finish();
        }, (response) => {
          console.log(response);
          //this.$Progress.fail();
        })
      },
      _setChartDataByCountAndDifference(count, difference) {
        this.count = count;
        this.difference = difference;
        //this.$Progress.start();
        service.getDataProfessional({params: this._getParams()}).then((response) => {
          let item = response;
          switch (this.difference) {
            case 1:
              this.$refs.quantity.setOption(item.nums, this.count);
              break;
            case 2:
              this.$refs.area.setOption(item.areas, this.count);
              break;
            case 3:
              this.$refs.gdp.setOption(item.gdp.seriesData, item.gdp.unit, this.count);
              break;
            case 4:
              this.$refs.tax.setOption(item.tax.seriesData, item.tax.unit, this.count);
              break;
          }
          //this.$Progress.finish();
        }, (response) => {
          console.log(response);
          //this.$Progress.fail();
        })
      },
      _getParams() {
        return Object.assign({}, this.param, {
          difference: this.difference,
          count: this.count
        })
      }
    },
    created() {
      this.count = 20;
      this.difference = 0;
      this._setChartOption();
    }
  }
</script>
<style>
  .h-hundred-percent {
    height: 100%;
  }

  .content-body-top {
    height: 50%;
  }

  .content-body-bottom {
    height: 50%;
    padding: 5px 0 0 0;
  }

  .left-chart-wrap {
    width: 50%;
    height: 100%;
    padding: 0 2.5px 0 0;
  }

  .right-chart-wrap {
    width: 50%;
    height: 100%;
    padding: 0 0 0 2.5px;
  }
</style>
