<template>
  <div class="pos-reative">
    <router-link :to="{path: '/MainIndex/ecoOperationMonitoring/industryMonitor/realEstateMap'}"><img class="pull-right" v-bind:src="icon" /></router-link>
    <industry-main ref="main" :mappath="mappath" :name="name" :industry-type="industryType" @export="dataExport"/>
  </div>
</template>
<script>
  import industryMain from '@/components/industryMonitor/Main.vue';
  import service from '@/services/ecoOperationMonitoring/industryMonitor';
  export default{
    data() {
      return {
        icon: require('@/assets/image/backMap.png'),
        name: '房地产业',
        industryType: 4,
        mappath: '/realEstateIndustryMap'
      }
    },
    components: {
      industryMain
    },
    methods: {
      dataExport() {
        alert('export');
      },
      _setChartsOption(param) {
        service.getRealEstateData().then((response) => {
          let item = response;
          this.$refs.main._setChartsOption(item);
          //this.$Progress.finish();
        }, (response) => {
          console.log(response);
          //this.$Progress.fail();
        });
      }
    },
    created() {
      this._setChartsOption();
    }
  }
</script>
