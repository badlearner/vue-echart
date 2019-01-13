<template>
  <div class="content-wrap" style="height:100%">
    <div class="content-body-top">
      <e-gdp-chart ref="gdp" @gdpLegendSelectChanged="gdpLegendSelectChanged"
                   @click="gdpChartClick"/>
    </div>
    <div class="content-body-bottom">
      <div class="left-chart-wrap pull-left">
        <e-gdp-mom-chart ref="mom"/>
      </div>
      <div class="right-chart-wrap pull-right">
        <e-gdp-yoy-chart ref="yoy"/>
      </div>
    </div>
  </div>
</template>
<script>
  import service from '@/services/ecoOperationMonitoring/service';
  import * as types from '@/store/mutation-types';
  import eGdpChart from './EnterpriseGDPChart.vue';
  import eGdpMomChart from './EnterpriseGDPMoMChart.vue';
  import eGdpYoyChart from './EnterpriseGDPYoYChart.vue';
  export default {
    data() {
      return {
        date: null,
        param: null,
      }
    },
    components: {
      eGdpChart,
      eGdpMomChart,
      eGdpYoyChart
    },
    methods: {
      loadData(param) {
        //this.$Progress.start();
        this.param = param;
        //this.$refs.gdp.setChartLegend(param.statisticsType);
        this._setChartOption(param);
      },
      export() {
      },
      goToMap() {
        this.$router.push('/areaGDP');
      },
      gdpChartClick(param) {
        this.date = new Date(param.name.replace('.', "/")).getFullYear();
        //this.$refs.ranking.showEnterpriseGDPRanking();
      },
      gdpLegendSelectChanged(param) {
        let isSelectedLimit = param.selected['限下产值'];
        let isSelectedRange = param.selected['当年累计四上产值'];
        let isNochoose = isSelectedLimit == false && isSelectedRange === false;
        let title;
        if ((isSelectedRange && isSelectedLimit) || isNochoose) {
          // isNochoose ? this.$store.commit(types.SET_GDP, 0) :
          //  this.$store.commit(types.SET_GDP, this.$store.state.navHeader.sumGDP);
          title = '总';
        } else if (isSelectedRange && isSelectedLimit === false) {
          // this.$store.commit(types.SET_GDP, this.$store.state.navHeader.sumGDP);
          title = '当年累计四上';
        } else if (isSelectedLimit && isSelectedRange === false) {
          // this.$store.commit(types.SET_GDP, this.fourLimitAboveGDP);
          title = '限下';
        }

        // this.$store.commit(types.SET_GDP_TITLE, title);
        this.$refs.gdp.setChartTitle(title);
        let item = {
          isSelectedLimit: isSelectedLimit,
          isSelectedRange: param.selected['四上产值'],
          isSelectedTotalRange: param.selected['当年累计四上产值'],
          title: title
        };
        this.$refs.mom.onselectLegend(item);
        this.$refs.yoy.onselectLegend(item);
      },
      _setChartOption(param) {
        service.getEnterpriseGdp({params: param}).then((response) => {
          let item = response;

          // if (this.param.statisticsType === '1') {
             // this.$refs.gdp.setChartOption(item.gdp.xAxisData, item.gdp.unit, item.gdp.incrementalUnit, item.gdp.underLimitGdpData, item.gdp.onLimitGdpData, item.gdp.onLimitAccumulaGdpData);
          // } else {
          this.$refs.gdp.setChartOption(item.gdp.xAxisData, item.gdp.unit, item.gdp.incrementalUnit, item.gdp.underLimitGdpData, [], item.gdp.onLimitGdpData);
          // }
          this.$refs.mom.setChartOption(item.mom.xAxisData, item.mom.limitData, item.mom.rGdpAccumulaData, item.mom.rGdpData);
          this.$refs.yoy.setChartOption(item.yoy.xAxisData, item.yoy.limitData, item.yoy.rGdpAccumulaData, item.yoy.rGdpData);
          //this.$Progress.finish();
        }, (response) => {
          console.log(response);
          //this.$Progress.fail();
        }).catch((e) => {
          console.error(e);
          //this.$Progress.fail();
        })
      }
    },
    mounted() {
      this._setChartOption();
    }
  }
</script>
