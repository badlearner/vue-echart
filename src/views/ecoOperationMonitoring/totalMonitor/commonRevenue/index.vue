<template>
  <div class="content-wrap" style="height:100%">
    <div class="content-body-top">
      <financial-revenue ref="revenue"></financial-revenue>
    </div>
    <div class="content-body-bottom">
      <financial-growth ref="growth"></financial-growth>
    </div>
  </div>
</template>
<script>
  import service from '@/services/ecoOperationMonitoring/service';
  import financialGrowth from './FinancialGrowthChart.vue';
  import financialRevenue from './FinancialRevenueChart.vue';

  export default {
    components: {
      financialRevenue,
      financialGrowth
    },
    methods: {
      loadData(param) {
        this.$Progress.start();
        this._setChartOption(param);
      },
      export() {
        alert('export');
      },
      _setChartOption(param) {
        service.getCommonReveData({params: param}).then((response) => {
          let item = response;
          let financialRevenue = item.financialRevenue;
          let financialGrowth = item.financialGrowth;
          this.$refs.revenue.setOption(financialRevenue.xAxisData, financialRevenue.unit, financialRevenue.totalData, financialRevenue.cTaxData, financialRevenue.lTaxData, financialRevenue.aFeesData);
          this.$refs.growth.setOption(financialGrowth.xAxisData, financialGrowth.cTaxData, financialGrowth.lTaxData, financialGrowth.aFeesData);
          // this.$Progress.finish();
        }, (response) => {
          console.log(response);
          //this.$Progress.fail();
        })
      }
    },
    mounted() {
      this._setChartOption();
    }
  }
</script>
