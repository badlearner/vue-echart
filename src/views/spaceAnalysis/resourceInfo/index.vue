<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick(activeName)">
      <el-tab-pane label="基本信息" name="基本信息">
        <base-info ref="resourceBaseInfo"></base-info>
      </el-tab-pane>
      <el-tab-pane label="行业构成" name="行业构成">
        <industry-composition ref="industryStruct"></industry-composition>
      </el-tab-pane>
      <el-tab-pane label="企业列表" name="企业列表">
        <company-list ref="Companies"></company-list>
      </el-tab-pane>
    </el-tabs>
    <div class="position-btn"><a @click="position()" v-if="positionBtn">查看定位</a><a @click="exportInfo()"
                                                                                   v-if="exportBtn">导出信息</a></div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import {hrefDownloadUrl} from '../../../utils/config';
  import baseInfo from './tab/baseInfo.vue';
  import companyList from './tab/companyList.vue';
  import industryComposition from './tab/industryComposition.vue';
  import service from '@/services/companyAndResource/infoServer';
  import {Tabs, TabPane} from 'element-ui';
  import {sendMessage} from '@/utils/iframeUtil';

  Vue.use(Tabs)
  Vue.use(TabPane)
  export default {
    props: {
      resourceInfo: {type: Object}
    },
    components: {
      baseInfo,
      industryComposition,
      companyList
    },
    data () {
      return {
        param: {
          type: '企业定位',
          pageName: '楼宇经济分析',
          /** 单个企业信息 */
          data: ''
        },
        activeName: '基本信息',
        positionBtn: true,
        exportBtn: false,
        resourceParam: {},
        url: hrefDownloadUrl,
        commonParam: []
      }
    },
    methods: {
      tabClick (value) {
        if (value === '基本信息') {
          this.positionBtn = true;
        } else {
          this.positionBtn = false;
        }
        if (value === '企业列表') {
          this.exportBtn = true;
        } else {
          this.exportBtn = false;
        }
      },
      getResourceInfo (params) {
        this.param.data = params;
        this.$store.state.spaceAnalysisSearch.currentYear;
        var paramData = {
          type: this.$store.state.spaceAnalysisSearch.buildType,
          zymc: params.name
        };
        this.resourceParam = paramData;
        service.getResourceInfoData(paramData).then(result => {
          this.commonParam = result;
          this.$refs.resourceBaseInfo.setData(params.name, this.commonParam);
        });
        service.getResourceIndustrytructureData(paramData).then(result => {
          this.$refs.industryStruct.setData(params.name, result);
        });
        service.getResourceCompaniesData(paramData).then(result => {
          this.$refs.Companies.setData(this.param, result);
          if (result && result.length > 0) {
            // this.exportBtn=true;
          } else {
            this.exportBtn = false;
          }
        });
      },
      position () {
        var mapFrame = this.$parent.$parent;
        this.$nextTick(function () {
          mapFrame.dialogResourceInfo = false;
          sendMessage(mapFrame.$refs.mapFrame, this.param);
        });
      },
      exportInfo () {
        window.location = this.url + 'EnterpriseBigData/a/api/bussiness/ebdZyhx/getExportQyData?type=' + this.resourceParam.type + '&zymc=' + this.resourceParam.zymc;
      }
    },
    created () {
    },
    mounted () {
    }
  }
</script>
