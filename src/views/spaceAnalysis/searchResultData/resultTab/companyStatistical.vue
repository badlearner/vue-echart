<template>
  <div class="result-p-5">
    <p><span>年份：</span><span>{{year}}</span></p>
    <p><span>企业主体数：</span><span>{{statistical.companyNum}}</span><span
      class="span-w-50"></span><span>总注册资本：</span><span>{{statistical.totalCapital}}{{totalCapitalUnit}}</span></p>
    <div class="result-echart">
      <div class="flow-f">
        <industry-rankings ref="top5Industry" :echartData="statistical.top5Data"
                           class="height-inherit"></industry-rankings>
      </div>
      <div class="flow-f">
        <street-rankings ref="top5Street" :echartData="statistical.numStreetCompaniesData"
                         class="height-inherit"></street-rankings>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import industryRankings from './companyListEchart/industryRankings';
  import streetRankings from './companyListEchart/streetRankings';

  export default {
    props: {
      statistical: {type: Object}
    },
    watch: {
      statistical: {
        handler: function (val, oldval) {
          this.year = this.$store.state.spaceAnalysisSearch.currentYear;
        },
        deep: true
      }
    },
    components: {
      industryRankings,
      streetRankings
    },
    data () {
      return {
        year: '',
        totalNum: 0,
        totalCapital: 0,
        totalCapitalUnit: '亿'

      }
    },
    methods: {
      panelClose () {
        this.isShow = !this.isShow;
      },
    },
    created () {

    },
    mounted () {
    }
  }
</script>
<style>
  .result-p-5 {
    padding:3px 10px;
  }

  .span-w-50 {
    display: inline-block;
    width: 50px;
  }

  .result-echart {
    width: 100%;
  }

  .result-echart .flow-f {
    float: left;
    width: 50%;
    height: 400px;
  }

  .result-echart .flow-f .chart {
    width: 200px;
    height: 400px;
  }
</style>
