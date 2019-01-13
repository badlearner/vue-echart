<style lang="less">
  .t-title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 7px;
    margin-top: 5px;
  }

  .padding-top-40 {
    padding-top: 40px;
  }

  table {
    width: 100%;
    &.oat-table {
      & > thead {
        & > tr {
          & > th {
            border-top: 1px solid #1b7fdb;
            background-color: #288be7;
            color: #fff;
            border-color: #1b7fdb;
          }
        }
      }
      & > tbody {
        & > tr {
          &:nth-child(2n) {
            background-color: #a7d0f7;
          }
        }
      }
    }
    &.col-padding-5 {
      > tbody td, > thead th {
        padding: 5px 2px;
      }

    }
    .table-bordered, td, th {
      border-radius: 0;
      border-radius: 0;
    }
    .td-center {
      td, th {
        text-align: center;
      }
    }
  }

  .map-btn {
    height: 32px;
  }
</style>
<template>
  <div class="pos-reative">
    <router-link :to="{path: '/MainIndex/ecoOperationMonitoring/industryMonitor/totality/map'}"><img
      class="pull-right" v-bind:src="mapIcon"/></router-link>
    <div class="content-wrap" style="height: calc(100%);">
      <div class="content-body-top">
        <div class="left-container pull-left">
          <index-gdp ref="indexGdp"/><!--@click="gdpChartClick"-->
        </div>
        <div class="center-container pull-left">
          <index-tax ref="indexTax"/><!--@click="taxChartClick"-->
        </div>
        <div class="right-container pull-right">
          <quantity-chart ref="quantity"/><!--@click="quantityChartClick"-->
        </div>
      </div>
      <div class="content-body-bottom">
        <div class="chart">
          <p class="text-center t-title">{{ year }}年各行业产值税收详情一览表</p>
          <table class="oat-table td-center th-center col-padding-5">
            <thead>
            <tr>
              <th>行业类别</th>
              <th>企业数量</th>
              <th>总产值({{unit}})</th>
              <th>税收额({{unit}})</th>
              <th>产税比(%)</th>
              <th>产值增速(%)</th>
              <th>税收增速(%)</th>
              <th>产值占比(%)</th>
              <th>税收占比(%)</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in oatDetail">
              <td>{{ item.Type }}</td>
              <td>{{ item.NumberFirms}}</td>
              <td>{{ item.GrossOutputValue}}</td>
              <td>{{ item.AmountTax}}</td>
              <td>{{ item.ProductionTax}}</td>
              <td>{{ item.OutputGrowth }}</td>
              <td>{{ item.TaxRevenueGrowth }}</td>
              <td>{{ item.OutputValueProportion }}</td>
              <td>{{ item.TaxRevenueRatio }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--<gdp-ranking :date="date" search-type="searchType" ref="ranking"></gdp-ranking>-->
  </div>
</template>
<script type="es6">
  import indexGdp from './IndexGdpChart.vue';
  import indexTax from './IndexTaxChart.vue';
  import quantityChart from './IndexQuantityChart.vue';
  import service from '@/services/ecoOperationMonitoring/industryMonitor';
  import {formatAmount} from '@/filters';

  export default {
    data() {
      return {
        date: null,
        year: null,
        unit: '元',
        oatDetail: null,
        isSub: false,
        mapIcon: require('@/assets/image/backMap.png'),
      }
    },
    components: {
      indexGdp,
      indexTax,
      quantityChart
      /*			gdpRanking,*/
      /*			omSearchBar,*/
    },
    computerd: {
      /*searchType() {
                return this.$store.state.navHeader.searchType;
            }*/
    },
    mounted() {
      this._setChartOption();
    },
    methods: {
      loadData(param) {
        //this.$Progress.start();
        this._setChartOption(param);
      },
      /*
            export() {
                alert('export');
            },
            goToMap() {
                this.$router.push('/industryIndexMap');
            },
            gdpChartClick(param) {
                this.date = new Date(param.name.toString().replace('.', "/")).getFullYear();
                this.$refs.ranking.showEnterpriseGDPRanking();
            },
            quantityChartClick(param) {
                this.date = new Date(param.name.toString().replace('.', "/")).getFullYear();
                this.$refs.ranking.showEnterpriseGDPRanking();
            },
            taxChartClick(param) {
                this.date = param.name;
                this.$refs.ranking.showEnterpriseGDPRanking();
            },
            */
      _setChartOption(param) {
        service.getEnterpriseDataByIndustry({params: param}).then((response) => {
          let item = response.Data;
          this.unit = item.outputTaxDetail.GrossOutputValueUnit;
          this.oatDetail = item.outputTaxDetail.outputTaxDetails;
          this.year = item.outputTaxDetail.Year;
          this.$refs.quantity.setChartOption(item.enterpriseNum);
          this.$refs.indexGdp.setChartOption(item.outputs);
          this.$refs.indexTax.setChartOption(item.taxs);
          /*this.$Progress.finish();*/
        }, (response) => {
          console.log(response);
          /*this.$Progress.fail();*/
        })
      }

    }
  }
</script>
