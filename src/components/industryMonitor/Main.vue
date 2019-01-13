<template>
  <div class="h-hundred-percent" style="height:100%;">
    <div class="content-wrap" style="height:100%;">
      <div class="content-body-top">
        <div class="left-container pull-left">
          <enterprise-quantity :name="name" ref="quantity"/>
        </div>
        <div class="center-container pull-left">
          <gdp :name="name" ref="gdp"/>
        </div>
        <div class="right-container pull-right">
          <tax :name="name" ref="tax"/>
        </div>
      </div>
      <div class="content-body-bottom">
        <div class="left-chart-wrap pull-left">
          <gdp-share :name="name" ref="gdpShare"/>
        </div>
        <div class="right-chart-wrap pull-right">
          <tax-share :name="name" ref="taxShare"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import gdp from './GDPChart.vue';
  import tax from './TaxChart.vue';
  import gdpShare from './GDPShareChart.vue';
  import taxShare from './TaxShareChart.vue';
  import enterpriseQuantity from './EnterpriseQuantityChart.vue';
  import service from '@/services/ecoOperationMonitoring/industryMonitor';

  export default {
    props: {
      name: {type: String, require: true},
      mappath: {type: String, require: true},
      industryType: {type: Number, default: 0}
    },
    components: {
      enterpriseQuantity,
      gdp,
      gdpShare,
      tax,
      taxShare
    },
    methods: {
      loadData(param) {
        this.$Progress.start();
        this._setChartsOption(param);
      },
      export() {
        this.$emit('export');
      },
      goToMap() {
        this.$router.push(this.mappath);
      },
      _setChartsOption(item) {
        this.$refs.quantity.setChartOption(item.enterpriseQuantity);
        this.$refs.gdp.setChartOption(item.gdp);
        this.$refs.gdpShare.setChartOption(item.gdpShare);
        this.$refs.tax.setChartOption(item.tax);
        this.$refs.taxShare.setChartOption(item.taxShare);
        //this.$Progress.finish();
      }
    },
    created() {
    }
  }
</script>
