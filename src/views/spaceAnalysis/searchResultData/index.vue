<template>
  <div class="search-result-data"
       :class="{'result-tranform': resultData.isShow,'result-tranform-show-bar': !arrowRight&&resultData.isShow}">
    <div class="o-click-btn"><i :class="{'el-icon-d-arrow-left':!arrowRight,'el-icon-d-arrow-right':arrowRight}"
                                @click="panelArrow"></i></div>
    <span class="export-info" @click="exportData">导出信息</span>
    <div class="tab-list">
      <el-tabs v-show="isNoBuild" v-model="activeName" type="card" @tab-click="tabClick(activeName)">
        <el-tab-pane label="企业统计" name="企业统计">
          <company-statistical ref="setYear" :statistical="resultData.companyStatistical"></company-statistical>
        </el-tab-pane>
        <el-tab-pane label="企业列表" name="企业列表">
          <company-list :companylist="resultData.companyListData"></company-list>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-show="!isNoBuild" v-model="activeName2" type="card" @tab-click="tabClick(activeName2)">
        <el-tab-pane label="楼宇经济统计" name="楼宇经济统计">
          <building-eco-statistics ref="building"
                                   :buildingEcoStatistical="resultData.buildingEcoStatistical"></building-eco-statistics>
        </el-tab-pane>
        <el-tab-pane label="楼宇经济列表" name="楼宇经济列表">
          <building-eco-list :buildingecolist="resultData.buildingEcoListData"></building-eco-list>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import {Tabs, TabPane} from 'element-ui';
  import {addHandler, removeHandler, sendMessage} from '@/utils/iframeUtil';
  import companyList from './resultTab/companyList';
  import companyStatistical from './resultTab/companyStatistical';
  import buildingEcoList from './resultTab/buildingEcoList';
  import buildingEcoStatistics from './resultTab/buildingEcoStatistics';

  Vue.use(Tabs)
  Vue.use(TabPane)
  export default {
    props: {
      resultData: {type: Object}
    },
    components: {
      companyList,
      companyStatistical,
      buildingEcoList,
      buildingEcoStatistics
    },
    watch: {
      resultData: {
        handler: function (val, oldval) {
          this.analysisType = val.analysisType;
          if (this.analysisType == "楼宇经济分析") {
            this.isNoBuild = false;
            if (this.activeName2 == '楼宇经济列表') {
              this.activeName2 == '楼宇经济列表';
            } else {
              this.activeName2 == '楼宇经济统计';
            }
            this.activeName2 == '楼宇经济统计';
          } else {
            this.isNoBuild = true;
            if (this.activeName == '企业统计') {
              this.activeName == '企业统计';
            } else {
              this.activeName == '企业列表';
            }
          }
        },
        deep: true
      }
    },
    data() {
      return {
        isNoBuild: true,
        arrowRight: true,
        activeName: '企业统计',
        activeName2: '楼宇经济统计',
        analysisType: '',
        param: {
          /**type ='企业列表导出' */
          type: '企业列表导出',
          /**当前页面 ='重点企业产业分析' */
          pageName: '重点企业产业分析',
          /**导出成功与否*/
          data: {
            /** 企业标识，所有数据key */
            ids: [],
            /** 后台下载地址 */
            url: ''
          }
        }

      }
    },
    methods: {
      panelArrow() {
        this.arrowRight = !this.arrowRight;
      },
      tabClick(tab) {
        this.activeName = tab;
        if(this.activeName==='企业统计'){
          setTimeout(() => {
            this.$refs.setYear.$refs.top5Industry.mergeOption(this.resultData.companyStatistical.top5Data);
            this.$refs.setYear.$refs.top5Street.mergeOption(this.resultData.companyStatistical.numStreetCompaniesData);
          }, 500);
        }
        if(this.activeName==='楼宇经济统计'){
          setTimeout(() => {
            this.$refs.building.$refs.pieEchart.mergeOption(this.resultData.buildingEcoStatistical.pieData);
            this.$refs.building.barData();
          }, 500);
        }
      },
      exportData() {
        var mapFrame = this.$parent;
        this.param.pageName = this.resultData.analysisType;
        if (this.resultData.analysisType != '楼宇经济分析') {
          this.param.data.ids = this.resultData.companyListData.ids;
        } else {
          this.param.data.ids = this.resultData.buildingEcoListData.ids;
        }
        sendMessage(mapFrame.$refs.mapFrame, this.param);
      }
    },
    created() {
      addHandler(window, 'message', this._receiveMessage);
    },
    mounted() {

    },
    beforeDestroy() {
      removeHandler(window, 'message', this._receiveMessage);
    }

  }
</script>
<style>
  .search-result-data {
    display: block;
    position: absolute;
    right: 5px;
    top: 110px;
    z-index: 100;
    background: #fff;
    width: 400px;
    height: calc(100% - 110px);
    box-shadow: -1px -1px 1px #dddddd;
    -webkit-transform: translateX(460px);
    transform: translateX(460px);
    transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
  }

  .tab-list {
    height: calc(100% - 5px);
    width: 100%;
  }

  .tab-list .el-tabs__content {
    height: calc(100% - 35px);
    width: 100%;
  }

  .tab-list .el-tabs {
    height: 100%;
    width: 100%;
  }

  .tab-list .el-tabs__content .el-tab-pane {
    height: 100%;
    width: 100%;
  }

  .darkgray .search-result-data {
    background: #313e4f;
  }

  .darkblue .search-result-data {
    background: #0f4271;
  }

  .search-result-data .o-click-btn {
    position: absolute;
    top: 5px;
    left: -23px;
    font-size: 18px;
    padding: 0px;
    color: #4d4d4d;
    background: #fff;
    width: 23px;
    border-right: none;
    box-shadow: -1px 0px 1px #dddddd;
  }

  .darkgray .search-result-data .o-click-btn {
    color: #eee;
    background: #313e4f;
  }

  .darkblue .search-result-data .o-click-btn {
    color: #fff;
    background: #0f4271;
  }

  .darkgray .o-click-btn .el-icon-close {
    color: #eee;
  }

  .darkblue .o-click-btn .el-icon-close {
    color: #fff;
  }

  .search-result-data .o-click-btn i {
    padding: 2px;
    cursor: pointer;
  }

  .o-click-btn .el-icon-close {
    color: #1e6ec3;
    border-right: 1px solid #dddddd;
  }

  .search-result-data .o-click-btn .border-i {
    color: #1e6ec3;
    border-right: 1px solid #dddddd;
  }

  .search-result-data .export-info {
    cursor: pointer;
    color: #00c0f3;
    font-size: 13px;
  }

  .main-container .i-frame .result-tranform-show-bar {
    -webkit-transform: translateX(405px);
    transform: translateX(405px);
  }

  .i-frame .result-tranform {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }

  .search-result-data .el-tabs--card .el-tabs__header {
    margin: 0;
    height: 35px;
  }

  .search-result-data .el-tabs--card .el-tabs__header .el-tabs__nav {
    border: none;
  }

  .search-result-data .el-tabs--card .el-tabs__header .el-tabs__item {
    margin: 0 6px;
    padding: 0 0;
    color: #666;
    font-size: 12px;
    height: 35px;
    line-height: 35px;
    border: none;
  }

  .darkblue .search-result-data .el-tabs--card .el-tabs__header .el-tabs__item {
    color: #f8fffd;
  }

  .darkblue .search-result-data .el-tabs--card .el-tabs__header .el-tabs__item.is-active {
    color: #ffffff;
    border-bottom: 2px solid #f8fffd;
  }

  .darkgray .search-result-data .el-tabs--card .el-tabs__header .el-tabs__item {
    color: #d4d4d4;
  }

  .darkgray .search-result-data .el-tabs--card .el-tabs__header .el-tabs__item.is-active {
    color: #ffffff;
    border-bottom: 2px solid #d4d4d4;
  }

  .search-result-data .el-tabs--top .el-tabs--card .el-tabs__item:nth-child(2) {
    padding-left: 0;
  }

  .search-result-data .el-tabs--top .el-tabs--card .el-tabs__item:last-child {
    padding-right: 0;
  }

  .search-result-data .el-tabs--card .el-tabs__active-bar {
    background: #666666;
  }

  .search-result-data .el-tabs--card .el-tabs__header .el-tabs__item.is-active {
    border-bottom: 2px solid #666;
  }

  .export-info {
    position: absolute;
    top: 9px;
    right: 10px;
    cursor: pointer;
    z-index: 55;
  }
</style>
