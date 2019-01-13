<template>
  <div class="pos-reative">
    <router-link :to="{path: '/MainIndex/ecoOperationMonitoring/industryMonitor/serviceIndustryMap'}"><img class="pull-right" v-bind:src="icon" /></router-link>
    <industry-main ref="main" :mappath="mappath" :name="name" :industry-type="industryType" @export="dataExport"/>
  </div>
</template>
<script>
  import industryMain from '@/components/industryMonitor/Main.vue';
  import service from '@/services/ecoOperationMonitoring/industryMonitor';
  export default {
    data: function () {
      return {
        icon: require('@/assets/image/backMap.png'),
        name: '服务业',
        industryType: 2,
        mappath: '/serviceIndustryMap'
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
        service.getServerData().then((response) => {
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
