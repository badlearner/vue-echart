<template>
  <div class="content-wrap" style="height:100%">
    <div class="content-body-top">
      <e-tax-chart ref="tax" @click="taxChartClick"></e-tax-chart>
    </div>
    <div class="content-body-bottom">
      <div class="left-chart-wrap pull-left">
        <e-tax-mom-chart ref="taxMom"></e-tax-mom-chart>
      </div>
      <div class="right-chart-wrap pull-right">
        <e-tax-yoy-chart ref="taxYoy"></e-tax-yoy-chart>
      </div>
    </div>
  </div>
</template>
<script>
  import {formatAmount} from '@/filters';
  import service from '@/services/ecoOperationMonitoring/service';
  import eTaxChart from './EnterpriseTaxChart.vue';
  import eTaxMomChart from './EnterpriseTaxMoMChart.vue';
  import eTaxYoyChart from './EnterpriseTaxYoYChart.vue';
  export default {
    data() {
      return {
        date: null,
        unit: null,
        show: false,
        showLoading: false,
        rankingData: null,
        enterpriseName: null
      }
    },
    components: {
      eTaxChart,
      eTaxMomChart,
      eTaxYoyChart
    },
    methods: {
      loadData(param) {
        this.$Progress.start();
        this._setChartOption(param);
      },
      export(param) {
        alert('export');
      },
      goToMap() {
        this.$router.push('areaTax');
      },
      taxChartClick(param) {
        this.date = new Date(param.name.replace('.', "/")).getFullYear();
        this.$refs.ranking.showEnterpriseGDPRanking();
      },
      _setChartOption(param) {
        service.getEnterpriseTax({params: param}).then((response) => {
          var item = response;
          this.$refs.tax.setChartOption(item.tax.xAxisData, item.tax.unit, item.tax.fTaxData, item.tax.dTaxData);
          this.$refs.taxMom.setChartOption(item.mom.xAxisData, item.mom.fTaxData, item.mom.dTaxData);
          this.$refs.taxYoy.setChartOption(item.yoy.xAxisData, item.yoy.fTaxData, item.yoy.dTaxData);
          //this.$Progress.finish();
        }, (response) => {
          console.log(response);
          //this.$Progress.fail();
        })
      },
      exportTaxToExcel() {
        window.location.href = '/tax/GetEnterpriseExcelDataByOutPutAndTax?&TaxYear=' + this.date;
      }
    },
    mounted() {
      this._setChartOption();
    }
  }
</script>
