<template>
  <div class="i-frame">
    <div class="map-search">
      <el-tabs v-model="activeName" type="card" @tab-click="tabClick(activeName)">
       <!-- <el-tab-pane label="市场主体分析" name="市场主体分析">
          <market-search :subdata="commonParam"></market-search>
        </el-tab-pane>
        <el-tab-pane label="企业迁移分析" name="企业迁移分析">
          <company-moving-search :subdata="commonParam"></company-moving-search>
        </el-tab-pane>
        <el-tab-pane label="企业活跃度分析" name="企业活跃度分析">
          <active-company-search :subdata="commonParam"></active-company-search>
        </el-tab-pane>-->
        <el-tab-pane label="重点关注企业产业分析" name="重点关注企业产业分析">
          <emphasis-company-search ref="emphasis" :subdata="commonParam"></emphasis-company-search>
        </el-tab-pane>
       <!-- <el-tab-pane label="市场经营秩序分析" name="市场经营秩序分析">
          <market-management-analysis-search :subdata="commonParam"></market-management-analysis-search>
        </el-tab-pane>-->
        <el-tab-pane label="楼宇经济分析" name="楼宇经济分析">
          <building-eco-search ref="buildingEco" :subdata="commonParam"></building-eco-search>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="map-right">
      <iframe ref="mapFrame" class="frame" :src="iframeSrc"></iframe>
      <year-change ref="yearChange" :subData="commonParam"></year-change>
    </div>
    <button class="draw-map" @click="drawing(isDraw)" :class="{'selected':isDraw}"><i class="fa fa-globe"></i>地图绘图
    </button>
    <div class="left-menu">
      <button class="border-bottom" @click="compared()"><i class="fa fa-exchange"></i>{{comparedtext}}</button>
      <button class="border-bottom" @click="thermogram({text:'注册资本',isSingle:false})"><i
        class="fa fa-stop color-red"></i>注册资本
      </button>
      <button @click="thermogram({text:'空间聚集',isSingle:false})"><i class="fa fa-eercast color-red"></i>空间聚集</button>
    </div>
    <search-result-data ref="resultData" :resultData="resultData"></search-result-data>
    <el-dialog title="企业画像信息" center width="600" :visible.sync="dialogCompanyInfo">
      <company-info ref="baseInfo"></company-info>
    </el-dialog>
    <el-dialog title="资源画像信息" center width="500" :visible.sync="dialogResourceInfo">
      <resource-info ref="resourceInfo"></resource-info>
    </el-dialog>
  </div>
</template>
<script>
  import Vue from 'vue';
  import service from '@/services/spaceAnalysis/spaceAnalysis';
  import * as types from '@/store/mutation-types';
  import localStorageUtil from '@/utils/localStorageUtil';
  import {addHandler, removeHandler, sendMessage} from '@/utils/iframeUtil';
  import emphasisCompanySearch from './searchType/emphasisCompanySearch';
  import marketSearch from './searchType/marketSearch';
  import companyMovingSearch from './searchType/companyMovingSearch';
  import activeCompanySearch from './searchType/activeCompanySearch';
  import marketManagementAnalysisSearch from './searchType/marketManagementAnalysisSearch';
  import buildingEcoSearch from './searchType/buildingEcoSearch';
  import yearChange from './yearChange/yearChange';
  import searchResultData from './searchResultData/index';
  import companyInfo from './companyInfo/index';
  import resourceInfo from './resourceInfo/index';
  import {Tabs, TabPane, Steps, Step, Tooltip, Message, Dialog, Loading} from 'element-ui';

  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Steps)
  Vue.use(Step)
  Vue.use(Tooltip)
  Vue.use(Dialog)
  Vue.use(Loading.directive);

  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$message = Message
  export default {
    components: {
      emphasisCompanySearch,
      marketSearch,
      companyMovingSearch,
      activeCompanySearch,
      marketManagementAnalysisSearch,
      buildingEcoSearch,
      searchResultData,
      companyInfo,
      resourceInfo,
      yearChange
    },
    data() {
      return {
        // iframeSrc:'http://localhost:3000/#/重点关注企业产业分析/',
        iframeSrc: '../../../static/arcgis/index.html#/重点关注企业产业分析/',
        activeName: '重点关注企业产业分析',
        comparedtext: '双屏对比',
        loading: null,
        isDraw: false,
        isSelected: false,
        dialogCompanyInfo: false,
        dialogResourceInfo: false,
        options: [{
          value: '市场主体分析',
          label: '市场主体分析'
        }, {
          value: '企业迁移分析',
          label: '企业迁移分析'
        }, {
          value: '企业活跃度分析',
          label: '企业活跃度分析'
        }, {
          value: '重点关注企业产业分析',
          label: '重点关注企业产业分析'
        }, {
          value: '市场经营秩序分析',
          label: '市场经营秩序分析'
        }, {
          value: '楼宇经济分析',
          label: '楼宇经济分析'
        }],
        ThermogramParam: {
          type: '热力图',
          /**当前页面 ='重点企业产业分析' */
          pageName: '重点企业产业分析',
          data: {
            field: '', //位置、注册资本
            isDouble: false, //单双屏
            show: false,    //是否显示
          }
        },
        commonParam: {
          streetData: null,
          industryData: null,
          companyTypeData: null,
          data: {
            enterpriseName: '',//企业名称或资源名称
            timeRange: [this.$store.state.spaceAnalysisSearch.startYear, this.$store.state.spaceAnalysisSearch.endYear],//时间范围
            street: [],//街镇（多选）
            managementOrderType: 0,//秩序类型
            industryType: '',//产业类型
            companyType: '',//企业类型
            customArea: '', //自定义区域
            capitalRange: ['', ''],//注册资本范围
            capitalRangeUnit: '万',//注册资本单位
            HY: [],//行业类型多选（多选）
            currentYear: this.$store.state.spaceAnalysisSearch.currentYear //当前年份
          }
        },
        heatMap: {field: '', show: false},//field:'注册资本' 或者''
        resultData: {
          isShow: false,
          isBuilding: true,
          analysisType: '重点关注企业产业分析',
          currentYear: '',
          companyStatistical: {
            top5Data: null,
            companyNum: null,
            totalCapital: null,
            numStreetCompaniesData: null
          },
          companyListData: null,
          buildingEcoStatistical: {
            barData: '',
            pieData: ''
          },
          buildingEcoListData: null
        },
        baseInfo: {},
        resourceInfo: {}
      }
    },
    methods: {
      businessTypeChange(type) {

      },
      showIndustryContainer() {

      },
      compared() {
        if (this.isSelected) {
          this.comparedtext = '双屏对比';
        } else {
          this.comparedtext = '单屏展示';
          this.$refs.resultData.arrowRight = false;
        }
        this.isSelected = !this.isSelected;
        this.ThermogramParam.data.isDouble = this.isSelected;
        this.ThermogramParam.data.show = this.isSelected;
        this.ThermogramParam.data.field = '';
        sendMessage(this.$refs.mapFrame, this.ThermogramParam);
      },
      drawing() {
        this.isDraw = !this.isDraw;
        let draw = {
          type: '绘图'
        }
        sendMessage(this.$refs.mapFrame, draw);
      },
      thermogram(param) {
        this.ThermogramParam = {
          type: '热力图',
          /**当前页面 ='重点企业产业分析' */
          pageName: '重点企业产业分析',
          data: {
            field: param.text, //位置、注册资本
            isDouble: param.isSingle, //单双屏
            show: true,    //是否显示
          }
        };
        sendMessage(this.$refs.mapFrame, this.ThermogramParam);
      },
      openCompanyInfoDialog(val) {
        this.dialogCompanyInfo = true;
        this.$nextTick(function () {
          this.$refs.baseInfo.getBaseInfo(val);
        });
      },
      openResourceInfoDialog(val) {
        this.dialogResourceInfo = true;
        this.$nextTick(function () {
          this.$refs.resourceInfo.getResourceInfo(val);
        });
      },
      tabClick(tab) {
        this.resultData.analysisType = tab;
        //let pUrl="http://localhost:3000/#/"
        let pUrl = "../../../static/arcgis/index.html#/"

        if (tab === "市场主体分析") {
          this.commonParam.data.marketMainType = 1;
        } else if (tab === "重点关注企业分析") {
        } else if (tab === "企业迁移分析") {
          this.commonParam.data.movingType = 1;
        } else if (tab === "企业活跃度分析") {
          this.commonParam.data.activeType = 0;
        } else if (tab === "楼宇经济分析") {
          this.commonParam.data.resourceType = '孵化器';
        } else if (tab === "市场经营秩序分析") {
          this.commonParam.data.managementOrderType = 0
        }
        this.iframeSrc = pUrl + tab + "/" + JSON.stringify(this.commonParam.data);
      },
      getStreetData() {
        let STREET_DATA = 'STREET_DATA';

        let data = localStorageUtil.getItem(STREET_DATA);
        window.localStorage.removeItem('STREET_DATA');
        if (data) {
          this.commonParam.streetData = data;
        } else {
          service.getStreetData().then(result => {
            this.commonParam.streetData = result;
            localStorageUtil.setItem(STREET_DATA, result);
          });
        }
      },
      getYearData() {
        service.getYearData().then(result => {
          this.commonParam.data.timeRange[0] = result.startYear;
          this.commonParam.data.timeRange[1] = result.endYear;
          this.commonParam.data.currentYear = result.currentYear;
          this.resultData.currentYear = result.currentYear;
          this.$store.commit(types.SET_CURRENT_YEAR, result.currentYear);
          this.$refs.yearChange.yearChange(this.commonParam.data.currentYear);
        });
      },
      getIndustryData() {
        let INDUSTRY_DATA_KEY = 'INDUSTRY_DATA';

        let data = localStorageUtil.getItem(INDUSTRY_DATA_KEY);
        window.localStorage.removeItem('INDUSTRY_DATA_KEY');
        if (data) {
          this.commonParam.industryData = data;
        } else {
          service.getChooseInsutryData().then(result => {
            localStorageUtil.setItem(INDUSTRY_DATA_KEY, result);
            this.commonParam.industryData = result;
          });
        }
      },
      sendMessage(param) {
        let defaultParam = param;
        this.loading = this.$loading({
          lock: true,
          text: '正在加载..',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)'
        });
        sendMessage(this.$refs.mapFrame, defaultParam);
      },
      _receiveMessage(event) {
        if (event.data && event.data.type === "企业列表") {
          this.resultData.companyListData = event.data.data;
          if (this.resultData.companyListData.count) {
            this.resultData.companyStatistical.companyNum = this.resultData.companyListData.count;
            this.resultData.isShow = true;
          } else {
            this.resultData.isShow = false;
            this.$message({
              showClose: true,
              type: 'warning',
              message: '暂无数据!',
            });
          }
        }
        if (event.data && event.data.type === "企业注册资本总数") {
          this.resultData.companyStatistical.totalCapital = event.data.data;
        }
        if (event.data && event.data.type === "行业top5") {
          this.resultData.companyStatistical.top5Data = event.data.data;
          var result = [];
          for (var j = 0; j < this.commonParam.industryData.length; j++) {
            var isExist = false;
            for (var i = 0; i < event.data.data.length; i++) {
              if (event.data.data[i].HYDMPARENT == this.commonParam.industryData[j].HYDM) {
                isExist = true;
                break;
              }
            }
            if (!isExist) {
              result.push(this.commonParam.industryData[j]);
            }
          }
          if (result.length > 0) {
            for (var n = 0; n < result.length; n++) {
              var object = {
                count: 0,
                HYALIAS: result[n].ALIAS,
                HYDMPARENT: result[n].HYDM
              };
              this.resultData.companyStatistical.top5Data.push(object);
            }
          }
          for (var m = 0; m < this.resultData.companyStatistical.top5Data.length; m++) {
            if (this.resultData.companyStatistical.top5Data[m].HYALIAS == null || this.resultData.companyStatistical.top5Data[m].HYALIAS == "") {
              this.resultData.companyStatistical.top5Data.splice(m, 1);
            }
          }
        }
        if (event.data && event.data.type === "街镇企业数量排名") {
          this.resultData.companyStatistical.numStreetCompaniesData = event.data.data;
          var results = [];
          for (var j = 0; j < this.commonParam.streetData.length; j++) {
            var isExists = false;
            for (var i = 0; i < event.data.data.length; i++) {
              if (event.data.data[i].STREET == this.commonParam.streetData[j].ZJ) {
                isExists = true;
                break;
              }
            }
            if (!isExists) {
              results.push(this.commonParam.streetData[j]);
            }
          }
          if (results.length > 0) {
            for (var n = 0; n < results.length; n++) {
              var object = {
                count: 0,
                STREET: results[n].ZJ,
              };
              this.resultData.companyStatistical.numStreetCompaniesData.push(object);
            }
          }
        }
        if (event.data && event.data.type === "企业列表楼宇经济") {
          if (event.data.data) {
            this.resultData.isShow = true;
            this.resultData.buildingEcoListData = event.data.data;
          } else {
            this.resultData.isShow = false;
            this.resultData.buildingEcoListData = [];
            this.$message({
              showClose: true,
              type: 'warning',
              message: '暂无数据!',
            });
          }
        }
        if (event.data && event.data.type === "资源注册资本排名") {
          if (event.data.data) {
            this.resultData.buildingEcoStatistical.barData = event.data.data;
          } else {
            this.resultData.buildingEcoStatistical.barData = [];
          }
        }
        if (event.data && event.data.type === "资源面积统计") {
          if (event.data.data) {
            this.resultData.buildingEcoStatistical.pieData = event.data.data;
          }
        }
        //楼宇经济列表
        if (event.data && event.data.type === "企业列表分页结果") {
          if (event.data.data) {
            this.resultData.buildingEcoListData = event.data.data;
            if (this.resultData.buildingEcoListData.list) {
              this.resultData.buildingEcoListData = event.data.data;
            } else {
              this.resultData.buildingEcoListData = [];
            }
          }
        }
        if (event.data && event.data.type === "Identify地图企业") {
          if (event.data.data && event.data.pageName == "企业产业分析") {
            this.openCompanyInfoDialog(event.data.data);
          }
          if (event.data.data && event.data.pageName == "楼宇经济分析") {
            var paramData = {
              type: this.$store.state.spaceAnalysisSearch.buildType,
              geometry: event.data.data.geometry,
              name: event.data.data.name
            };
            this.openResourceInfoDialog(paramData);
          }
        }
        if (event.data && event.data.type === "企业列表-模糊查询") {
          this.resultData.companyListData = event.data.data;
          if (this.resultData.companyListData.count) {
            this.resultData.isShow = true;
            this.$refs.resultData.activeName = "企业列表";
          }
        }
        if (this.loading) {
          this.loading.close();
        }
      }
    },
    created() {
      addHandler(window, 'message', this._receiveMessage);
      this.getStreetData();
      this.getYearData();
      this.getIndustryData();
    },
    mounted() {
      this.iframeSrc = this.iframeSrc + JSON.stringify(this.commonParam.data);
    },
    deactivated() {
      removeHandler(window, 'message', this._receiveMessage);
    }
  }
</script>
<style>
  .i-frame {
    height: calc(100% - 56px);
    width: 100%;
  }

  .i-frame .map-search {
    padding: 0 0 0 25px;
    height: 39px;
    margin: 0 5px;
  }

  .map-search .el-tabs--card .el-tabs__header {
    margin: 0;
    height: 39px;
    border-bottom: none;
  }

  .map-search .el-tabs--card .el-tabs__header .el-tabs__nav {
    border: none;
  }

  .map-search .el-tabs--card .el-tabs__header .el-tabs__item {
    margin-right: 12px;
    padding: 0 0;
    color: #666;
    font-size: 13px;
    height: 39px;
    line-height: 39px;
    border: none;
    box-shadow: none;
  }

  .el-tabs__header .el-tabs__item:focus.is-active.is-focus:not(:active) {
    box-shadow: none;
    border-radius: inherit;
  }

  .map-search .el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2) {
    padding-left: 0;
  }

  .map-search .el-tabs--top.el-tabs--card .el-tabs__item:last-child {
    padding-right: 0;
  }

  .map-search .el-tabs--card .el-tabs__active-bar {
    background: #666666;
  }

  .map-search .el-tabs__content {
    margin-left: -25px;
    overflow: visible;
  }

  .map-search .el-tabs__item:hover {
    color: #666;
  }

  .map-search .el-tabs__item .is-active {
    color: #333333;
  }

  .darkblue .map-search .el-tabs--card .el-tabs__header .el-tabs__item {
    color: #f8fffd;
  }

  .darkblue .map-search .el-tabs--card .el-tabs__header .el-tabs__item.is-active {
    color: #ffffff;
    border-bottom: 2px solid #f8fffd;
  }

  .darkgray .map-search .el-tabs--card .el-tabs__header .el-tabs__item {
    color: #d4d4d4;
  }

  .darkgray .map-search .el-tabs--card .el-tabs__header .el-tabs__item.is-active {
    color: #ffffff;
    border-bottom: 2px solid #d4d4d4;
  }

  .map-search .el-tabs--card .el-tabs__header .el-tabs__item.is-active {
    border-bottom: 2px solid #666;
  }

  .i-frame .map-right {
    margin: 0px 5px 0 5px;
    height: calc(100% - 40px);
    padding: 41px 0 0 0;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid #e0e0e0;
  }

  .i-frame .frame {
    border: none;
    margin-top: 2px;
    height: 100%;
    width: 100%;
  }

  .search-list {
    width: 100%;
    height: 42px;
    padding: 4px 5px 5px 0;
    box-shadow: 0px 2px 2px #eeeeee;
    text-align: right;
    background: #fff;
  }

  .darkgray .search-list {
    box-shadow: 0px 0px 2px #e3e5e6;
    background: #313e4f;
  }

  .darkblue .search-list {
    box-shadow: 0px 0px 2px #e3e5e6;
    background: #0f4271;
  }

  .darkblue .search-list .span-block {
    color: #e0e0e0;
  }

  .search-list .input-div {
    display: inline-block;
    font-size: 12px;
  }

  .darkgray .search-list .input-div {
    color: #d4d4d4;
  }

  .industry-type .el-select {
    width: 90px;
  }

  .company-type .el-select {
    width: 90px;
  }

  .zone-type .el-select {
    width: 150px;
  }

  .moving-type .el-select {
    width: 90px;
  }

  .register-type .span-w {
    width: 70px;
  }

  .search-list .register-type .span-w .el-input__inner {
    padding: 0 3px;
  }

  .active-type .el-select {
    width: 90px;
  }

  .provide-type .el-select {
    width: 85px;
  }

  .search-list .span-block {
    display: inline-block;
  }

  .search-list .input-div .el-select .el-input__inner {
    padding: 0 20px 0 5px;
  }

  .darkgray .search-list .input-div .el-input__inner {
    background: #313e4f;
  }

  .darkblue .search-list .input-div .el-input__inner {
    background: #0f4271;
  }

  .industry-s {
    position: relative;
    border: 1px solid #dcdfe6;
    color: #807e7e;
    border-radius: 3px;
    padding: 5px 18px 5px 5px;
    height: 31px;
    cursor: pointer;
  }

  .darkgray .industry-s {
    color: #d4d4d4;
  }

  .darkblue .industry-s {
    color: #313e4f;
  }

  .industry-s .fa-unsorted {
    top: 36%;
    color: #aba8a8;
  }

  .search-list .input-div .el-input__inner {
    padding: 0 10px 0 10px;
  }

  .search-list .input-div .el-date-editor .el-input__inner {
    padding: 0 10px 0 30px;
  }

  .span-w {
    width: 90px;
    display: inline-block;
  }

  .search-list .data-year .span-w {
    width: 75px;
  }

  .search-list .span-w .el-date-editor {
    width: 75px;
    cursor: pointer;
  }

  .search-list .input-div .choose-industry-container {
    position: absolute;
    left: auto;
    right: 0;
    margin-top: 4px;
    padding: 5px 5px 5px 20px;
    width: 260px;
    z-index: 100;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }

  .search-list .input-div .choose-industry-container::after {
    right: 30px;
    border: 8px solid transparent;
    border-bottom: 8px solid #fff;
    position: absolute;
    content: "";
    top: 0;
    margin-top: -14px;
  }

  .darkblue .search-list .input-div .choose-industry-container {
    background: #0f4271;
    box-shadow: 0 0 4px #eee;
  }

  .darkblue .search-list .input-div .choose-industry-container::after {
    border-bottom: 8px solid #0f4271;
  }

  .darkgray .search-list .input-div .choose-industry-container {
    background: #313e4f;
    box-shadow: 0 0 4px #eee;
  }

  .darkgray .search-list .input-div .choose-industry-container::after {
    border-bottom: 8px solid #313e4f;
  }

  .search-list .input-div .choose-street-container {
    position: absolute;
    left: auto;
    right: 0;
    margin-top: 4px;
    padding: 5px 5px 5px 20px;
    width: 110px;
    z-index: 100;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }

  .search-list .input-div .choose-street-container::after {
    left: 80px;
    border: 8px solid transparent;
    border-bottom: 8px solid #fff;
    position: absolute;
    content: "";
    top: 0;
    margin-top: -14px;
  }

  .darkblue .search-list .input-div .choose-street-container {
    background: #0f4271;
    box-shadow: 0 0 4px #eee;
  }

  .darkblue .search-list .input-div .choose-street-container::after {
    border-bottom: 8px solid #0f4271;
  }

  .darkgray .search-list .input-div .choose-street-container {
    background: #313e4f;
    box-shadow: 0 0 4px #eee;
  }

  .darkgray .search-list .input-div .choose-street-container::after {
    border-bottom: 8px solid #313e4f;
  }

  .search-list .input-div .choose-street-container .active {
    color: #51bcf0;
  }

  .search-btn .el-button {
    background-color: #fbdd7c;
    border-color: #fbdd7c;
    color: #333333;
    padding: 9px 5px 7px 5px;
    font-size: 13px;
  }

  .search-btn .el-button:hover {
    background-color: #fbdd7c;
    border-color: #fbdd7c;
    color: #333333;
  }

  .search-btn .el-button:focus {
    background-color: #fbdd7c;
    border-color: #fbdd7c;
    color: #333333;
  }

  .darkgray .search-btn .el-button {
    background-color: #fbdd7c;
    border-color: #fbdd7c;
    color: #333333;
    padding: 9px 5px 7px 5px;
    font-size: 13px;
  }

  .darkgray .search-btn .el-button:hover {
    background-color: #fbdd7c;
    border-color: #fbdd7c;
    color: #333333;
  }

  .darkgray .search-btn .el-button:focus {
    background-color: #fbdd7c;
    border-color: #fbdd7c;
    color: #333333;
  }

  .darkblue .search-btn .el-button {
    background-color: #3276b1;
    border-color: #3276b1;
    color: #fff;
    padding: 9px 5px 7px 5px;
    font-size: 13px;
  }

  .darkblue .search-btn .el-button:hover {
    background-color: #3276b1;
    border-color: #3276b1;
    color: #fff;
  }

  .darkblue .search-btn .el-button:focus {
    background-color: #3276b1;
    border-color: #3276b1;
    color: #fff;
  }

  .choose-industry-container .choose-insudtry-item {
    line-height: 1.1;
    list-style: none;
    padding: 5px;
    text-align: left;
    cursor: pointer;
  }

  .choose-street-container .choose-insudtry-item {
    line-height: 1.1;
    list-style: none;
    padding: 5px;
    text-align: left;
    cursor: pointer;
  }

  .white .el-popper .popper__arrow {
    border-width: 0px;
  }

  .white .map-search .el-select .el-input .el-select__caret {
    color: #848586;
  }

  .darkgray .map-search .el-select .el-input .el-select__caret {
    color: #d4d4d4;
  }

  .darkblue .map-search .el-select .el-input .el-select__caret {
    color: #d4d4d4;
  }

  .draw-map {
    position: absolute;
    z-index: 100;
    left: 0px;
    top: 120px;
    width: 96px;
    height: 30px;
    box-shadow: 0px 0px 3px #bbbbbb;
    font-size: 13px;
    background: #fff;
    margin: 0px;
    padding: 5px;
    border: none;
    outline: none;
    color: #666;
  }

  .draw-map i {
    margin-right: 5px;
  }

  .darkgray .draw-map {
    background: #26272c;
    color: #eee;
  }

  .darkblue .draw-map {
    background: #0b375e;
    color: #fff;
  }

  .i-frame .left-menu {
    position: absolute;
    z-index: 100;
    left: 0px;
    top: 160px;
    width: 96px;
    height: 89px;
    box-shadow: 0px 0px 5px #bbbbbb;
  }

  .left-menu button {
    font-size: 13px;
    background: #fff;
    margin: 0px;
    padding: 5px;
    width: 100%;
    border: none;
    outline: none;
    color: #666;
  }

  .darkgray .left-menu button {
    background: #26272c;
    color: #eee;
  }

  .darkblue .left-menu button {
    background: #0b375e;
    color: #fff;
  }

  .left-menu button i {
    margin-right: 5px;
  }

  .left-menu button .color-red {
    color: #ff0000;
  }

  .left-menu .border-bottom {
    border-bottom: 1px solid #dddddd;
  }

  .left-menu .selected {
    color: #1e6ec3;
  }

  .darkgray .left-menu .selected {
    color: #98bfe8;
  }

  .darkblue .left-menu .selected {
    color: #98bfe8;
  }

  .input-div .el-input__suffix {
    right: 1px;
  }

  .main-container .el-dialog__wrapper .el-dialog__header {
    padding-top: 10px;
    background: #e8f4ff;
  }

  .main-container .el-dialog__wrapper .el-dialog__header .el-dialog__title {
    font-size: 15px;
    font-weight: 700;
  }

  .main-container .el-dialog__wrapper .el-dialog__header .el-dialog__headerbtn {
    top: 5px;
    font-size: 20px;
  }

  .white .search-result-data .el-pager li.btn-quicknext {
    color: #333;
  }

  .white .search-result-data .el-pager li.btn-quickprev {
    color: #333;
  }

  .darkgray .search-result-data .el-pager li.btn-quicknext {
    color: #eee;
  }

  .darkblue .search-result-data .el-pager li.btn-quicknext {
    color: #eee;
  }

  .darkgray .search-result-data .el-pager li.btn-quickprev {
    color: #eee;
  }

  .darkblue .search-result-data .el-pager li.btn-quickprev {
    color: #eee;
  }

  .darkblue .result-company-data .el-pagination__total {
    color: #eee;
  }

  .white .el-pagination__total {
    color: #333;
  }

  .darkgray .result-company-data .el-pagination__total {
    color: #eee;
  }

  .cursor-p {
    cursor: pointer;
    display: inline-block;
    color: #80bcfd;
  }

  .search-list-com {
    position: absolute;
    top: 34px;
    left: 0;
    height: 140px;
    overflow: auto;
    width: 100%;
    z-index: 9999;
    background: #fff;
    box-shadow: 0 0 2px #ddd;
  }

  .search-list-com .list-item {
    margin: 6px 0;
    padding: 0 5px;
    color: #373737;
    text-align: left;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  .search-list-com .list-item:hover {
    color: #1e6ec3;
  }
</style>
