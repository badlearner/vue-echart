<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick(activeName)">
      <el-tab-pane label="基本信息" name="基本信息">
        <base-info ref="companyBaseInfo"></base-info>
      </el-tab-pane>
      <el-tab-pane label="企业载体情况" name="企业载体情况">
        <enterprise-carrier-situation></enterprise-carrier-situation>
      </el-tab-pane>
      <el-tab-pane label="企业标签/关联公司" name="企业标签/关联公司">
        <enterprise-label :companyLabel="companyLabel"></enterprise-label>
      </el-tab-pane>
      <el-tab-pane label="活跃度/风险分析" name="活跃度/风险分析">
        <enterprise-risk-analysis ref="companyActive" :subdata="companyActive"></enterprise-risk-analysis>
      </el-tab-pane>
    </el-tabs>
    <div class="position-btn"><a @click="position()" v-if="positionBtn">查看定位</a></div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import baseInfo from './tab/baseInfo.vue';
  import enterpriseLabel from './tab/enterpriseLabel.vue';
  import enterpriseCarrierSituation from './tab/enterpriseCarrierSituation.vue';
  import enterpriseRiskAnalysis from './tab/enterpriseRiskAnalysis.vue';
  import service from '@/services/companyAndResource/infoServer';
  import {Tabs, TabPane, Loading} from 'element-ui';
  import {sendMessage} from '@/utils/iframeUtil';

  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Loading.directive);

  Vue.prototype.$loading = Loading.service;
  export default {
    props: {
      baseInfo: {type: Object}
    },
    components: {
      baseInfo,
      enterpriseLabel,
      enterpriseCarrierSituation,
      enterpriseRiskAnalysis
    },
    data () {
      return {
        param: {
          /** type ='企业定位' */
          type: '企业定位',
          /** 当前页面 ='重点企业产业分析' */
          pageName: '重点企业产业分析',
          /** 单个企业信息 */
          data: null
        },
        activeName: '基本信息',
        positionBtn: true,
        loading: true,
        companyBaseInfo: {},
        companyLabel: {},
        companyActive: {},
        commonParam: ''
      }
    },
    methods: {
      tabClick (value) {
        if (value === '基本信息') {
          this.positionBtn = true;
        } else {
          this.positionBtn = false;
        }
      },
      getBaseInfo (params) {
        this.param.data = params;
        var param = {
          qymc: params.QYMC,
          qyzch: params.QYZCH
        };
        service.getCompanyInfoData(param).then(result => {
          if (result) {
            this.companyBaseInfo.data = result;
            this.companyBaseInfo.name = params.QYMC;
            this.$refs.companyBaseInfo.setData(this.companyBaseInfo);
          }
        });
        service.getCompanyLabel(param).then(result => {
          if (result) {
            this.companyLabel = result;
          }
        });
        service.getCompanyActive(param).then(result => {
          if (result) {
            this.companyActive = result;
            this.$refs.companyActive.mergeOptionActive(this.companyActive.hydData);
            // this.$refs.companyActive.mergeOptionRisk(this.companyActive.fxyjData);
          }
        });
        service.getCompanyRisk(param).then(result => {
          if (result) {
            this.$refs.companyActive.mergeOptionRiskLie(result);
          }
        });
      },
      position () {
        var mapFrame = this.$parent.$parent;
        if (this.param.data.isFromBuild) {
          this.$nextTick(function () {
            mapFrame.dialogCompanyInfo = false;
            mapFrame.dialogResourceInfo = false;
            sendMessage(mapFrame.$refs.mapFrame, this.param.data.isFromBuild);
          });
        } else {
          this.$nextTick(function () {
            mapFrame.dialogCompanyInfo = false;
            mapFrame.dialogResourceInfo = false;
            sendMessage(mapFrame.$refs.mapFrame, this.param);
          });
        }
      }
    },
    created () {
    },
    mounted () {

    }
  }
</script>
