<template>
  <div class="emphasis">
    <div class="f-l w-25 h-100 p-t-b-5">
      <div class="h-33 m-tt-5">
        <div class="bg-white e-chart">
          <valuable-company ref="valuableCompany" class="height-inherit"></valuable-company>
        </div>
      </div>
      <div class="h-33">
        <div class="bg-white e-chart m-t-5">
          <n-e-m-company ref="NEMCompany" class="height-inherit"></n-e-m-company>
        </div>
      </div>
      <div class="h-33">
        <div class="bg-white e-chart m-t-5">
          <i-a-b-company ref="IABCompany" class="height-inherit"></i-a-b-company>
        </div>
      </div>
    </div>
    <div class="f-l w-75 h-100 p-t-r-10">
      <div class="h-66 m-tt-5 position-r">
        <div class="position-a tab">
          <p class="font-16">
            <span @click="onClickPage(1)" :class="{'font-w' : tab===1 }">亿元企业街镇分布</span>
            <span @click="onClickPage(2)" :class="{'font-w' : tab===2 }">NEM企业街镇分布</span>
            <span @click="onClickPage(3)" :class="{'font-w' : tab===3 }">IAB企业街镇分布</span>
          </p>
        </div>
        <div class="position-a list">
          <h5 style="text-align: center;"><strong>街镇排名TOP5</strong></h5>
          <p v-for="item in streetTop5Default"><span class="top5-item-name text-right">{{item.name}}：</span><span
            class="text-left" style="width:40px;display: inline-block;">{{item.value}}</span></p>
        </div>
        <div class="bg-white e-chart">
          <mapChart ref="map" class="height-inherit"></mapChart>
        </div>
      </div>
      <div class="h-33">
        <div class="h-100 w-100 m-t-5">
          <div class="f-l w-33 h-100 p-r-5">
            <div class="bg-white e-chart">
              <top5valuable-company ref="top5ValuableCompany"
                                    class="height-inherit"></top5valuable-company>
            </div>
          </div>
          <div class="f-l w-33 h-100 p-r-5">
            <div class="bg-white e-chart">
              <top5-n-e-m-company ref="top5nemCompany" class="height-inherit"></top5-n-e-m-company>
            </div>
          </div>
          <div class="f-l w-33 h-100">
            <div class="bg-white e-chart">
              <top5-i-a-b-company ref="top5ibaCompany" class="height-inherit"></top5-i-a-b-company>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="企业列表" top="50px" width="600" :visible.sync="dialogCompanyInfo">
      <div v-loading="loading">
        <el-tabs v-model="activeName" type="card" @tab-click="tabClick(activeName)">
          <el-tab-pane label="内资" name="内资">
            <div style="width:100%;margin:3px;">
              <div style="width:200px;display: inline-block;margin:5px;">
                <el-input v-model="comparams.qymc" size="small" placeholder="企业名称" clearable></el-input>
              </div>
              <el-button size="small" type="primary" icon="el-icon-search" @click="companySearch">查询</el-button>
            </div>
            <div>
              <div class="com-list">
                <ul>
                  <li>
                    <span class="name-attr"><strong>企业名称</strong></span>
                    <span style="display: inline-block;width:15%;height: 26px;float:left;"><strong>所属街镇</strong></span>
                    <span style="display: inline-block;width:15%;height: 26px;float:left;"><strong>注册资本</strong></span>
                    <span class="act-attr"><strong>操作</strong></span>
                  </li>
                  <li v-for="item in companyList">
                    <span class="name-attr">{{item.QYMC}}</span>
                    <span style="display: inline-block;width:15%;height: 26px;float:left;">{{item.JZ}}</span>
                    <span style="display: inline-block;width:15%;height: 26px;float:left;">{{item.RMBZCZB}}</span>
                    <span class="act-attr"><a href="javascript:void(0)" @click="companyDetail(item)">画像</a></span>
                  </li>
                </ul>
                <p style="color:#9e9e9e;text-align: center;font-size: 16px;margin-top: 30px;" v-show="noData1">暂无数据</p>
              </div>
              <div>
                <el-pagination
                  @current-change="handleCurrentChange1"
                  :current-page="currentPage1"
                  :page-size="10"
                  layout="total, prev, pager, next"
                  :total="totalData1">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="外资" name="外资">
            <div style="width:100%;margin:3px;">
              <div style="width:200px;display: inline-block;margin:5px;">
                <el-input v-model="comparams.qymc" size="small" placeholder="企业名称" clearable></el-input>
              </div>
              <el-button size="small" type="primary" icon="el-icon-search" @click="companySearch">查询</el-button>
            </div>
            <div>
              <div class="com-list">
                <ul>
                  <li>
                    <span class="name-attr"><strong>企业名称</strong></span>
                    <span style="display: inline-block;width:15%;height: 26px;float:left;"><strong>所属街镇</strong></span>
                    <span style="display: inline-block;width:15%;height: 26px;float:left;"><strong>注册资本</strong></span>
                    <span class="act-attr"><strong>操作</strong></span>
                  </li>
                  <li v-for="item in companyList2">
                    <span class="name-attr">{{item.QYMC}}</span>
                    <span style="display: inline-block;width:15%;height: 26px;float:left;">{{item.JZ}}</span>
                    <span style="display: inline-block;width:15%;height: 26px;float:left;">{{item.RMBZCZB}}</span>
                    <span class="act-attr"><a href="javascript:void(0)" @click="companyDetail(item)">画像</a></span>
                  </li>
                </ul>
                <p style="color:#9e9e9e;text-align: center;font-size: 16px;margin-top: 30px;" v-show="noData2">暂无数据</p>
              </div>
              <div>
                <el-pagination
                  @current-change="handleCurrentChange2"
                  :current-page="currentPage2"
                  :page-size="10"
                  layout="total, prev, pager, next"
                  :total="totalData2">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
    <el-dialog title="企业画像信息" center width="600" :visible.sync="dialogCompanyDetialInfo">
      <company-info ref="baseInfo"></company-info>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
  import service from '@/services/economicTrendAnalysis/emphasisEnterprise';
  import indexServer from '@/services/index';
  import valuableCompany from './valuableCompany';
  import IABCompany from './IABCompany';
  import NEMCompany from './NEMCompany';
  import MapChart from './MapChart';
  import Top5IABCompany from './Top5IABCompany';
  import Top5valuableCompany from './Top5ValuableCompany';
  import Top5NEMCompany from './Top5NEMCompany.vue';
  import companyInfo from '../../spaceAnalysis/companyInfo/index';
  import {Tabs, TabPane, Dialog, Input, Button, Pagination} from 'element-ui';

  Vue.use(Input)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Dialog)
  Vue.use(Button)
  Vue.use(Pagination)
  export default {
    props: {
      params: {type: Object}
    },
    watch: {
      params: {
        handler: function (val, oldval) {
          this.comparams.searchType = val.searchType;
          this.comparams.enterpriseType = val.enterpriseType;
          this.comparams.industryType = val.industryType;
        },
        deep: true
      }
    },
    data() {
      return {
        comparams: {
          searchType: this.params.searchType,     //查询类型,年，月
          enterpriseType: this.params.enterpriseType, //内资为1,外资为2
          qyType: '',        //企业类型,亿元企业为1， nem为2， iab为3
          industryType: this.params.industryType,  //行业类型
          qymc: '',          //企业名称模糊匹配
          pageSize: 10,      //当前页数据行大小
          pageIndex: 1       //页码
        },
        currentPage1: 1,
        currentPage2: 1,
        totalData1: 0,
        totalData2: 0,
        activeName: '内资',
        companyList: [],
        companyList2: [],
        noData1: false,
        noData2: false,
        loading: true,
        dialogCompanyInfo: false,
        dialogCompanyDetialInfo: false,
        resultData: null,
        mapData1: '',
        mapData2: '',
        mapData3: '',
        streetTop5Default: [],
        streetTop51: '',
        streetTop52: '',
        streetTop53: '',
        tab: 1
      }
    },
    components: {
      valuableCompany,
      IABCompany,
      NEMCompany,
      Top5IABCompany,
      Top5valuableCompany,
      Top5NEMCompany,
      companyInfo,
      MapChart
    },
    methods: {
      tabClick(data) {
        this.activeName = data;
        if (data === "内资") {
          this.comparams.enterpriseType = 1;
          this.comparams.pageIndex = 1;
          this.currentPage1 = 1;
        } else if (data === "外资") {
          this.comparams.enterpriseType = 2;
          this.comparams.pageIndex = 1;
          this.currentPage2 = 1;
        }
        this.getCompaniesData(this.comparams);
      },
      mapSearch() {
      },
      handleCurrentChange1(val) {
        this.comparams.pageIndex = val;
        this.currentPage1 = val;
        this.getCompaniesData(this.comparams);
      },
      handleCurrentChange2(val) {
        this.comparams.pageIndex = val;
        this.currentPage2 = val;
        this.getCompaniesData(this.comparams);
      },
      companyDetail(item) {
        this.dialogCompanyDetialInfo = true;
        this.$nextTick(function () {
          this.$refs.baseInfo.getBaseInfo(item);
        });
      },
      companySearch() {
        this.comparams.pageIndex = 1;
        this.currentPage1 = 1;
        this.currentPage2 = 1;
        this.getCompaniesData(this.comparams);
      },
      getCompaniesData(params) {
        this.loading = true;
        service.getCompaniesTotalData(params).then(result => {
          if (result) {
            this.loading = false;
            this.totalData1 = result.nzTotal;
            this.totalData2 = result.wzTotal;
          }
        });
        service.getCompaniesData(params).then(result => {
          if (result && result.data) {
            this.loading = false;
            this.companyList = result.data[0].domesticFundednData;
            this.companyList2 = result.data[1].foreignData;
            if (this.companyList.length > 0) {
              this.noData1 = false;
            } else {
              this.noData1 = true;
            }
            if (this.companyList2.length > 0) {
              this.noData2 = false;
            } else {
              this.noData2 = true;
            }
          }
        });
      },
      onClickPage(value) {
        this.tab = value;
        if (value == 1) {
          this.mergeOptionToMapChart(this.mapData1);
          this.streetTop5Default = this.streetTop51;
        } else if (value == 2) {
          this.mergeOptionToMapChart(this.mapData2);
          this.streetTop5Default = this.streetTop52;
        } else {
          this.mergeOptionToMapChart(this.mapData3);
          this.streetTop5Default = this.streetTop53;
        }
      },
      ValuableCompany(item) {
        this.$refs.valuableCompany.mergeOption(item.xAxisData, item.seriesData);
      },
      NemCompany(item) {
        this.$refs.NEMCompany.mergeOption(item.xAxisData, item.seriesData);
      },
      IabCompany(item) {
        this.$refs.IABCompany.mergeOption(item.xAxisData, item.seriesData);
      },
      Top5ValuableCompany(item) {
        this.$refs.top5ValuableCompany.mergeOption(item.yAxisData, item.seriesData);
      },
      Top5nemCompany(item) {
        this.$refs.top5nemCompany.mergeOption(item.yAxisData, item.seriesData);
      },
      Top5ibaCompany(item) {
        this.$refs.top5ibaCompany.mergeOption(item.yAxisData, item.seriesData);
      },
      mergeOptionToMapChart(item) {
        this.$refs.map.mergeOption(item, this.resultData);
      },
      search() {
        const self = this;
        this.progressToByKey(this.loadingFrequency, this.progressDict);
        indexServer.getStreetPointData().then(result => {
          this.increaseFrequency();
          var data = result.data.features, res = [];
          for (var i = 0; i < data.length; i++) {
            var obj = {name: '', value: 15, coord: []}
            obj.name = data[i].properties.name;
            obj.coord = data[i].geometry.coordinates;
            res.push(obj);
          }
          this.resultData = res;
        });
        service.getEmphasisEnterpriseValuableCompany(self.params).then(result => {
          this.increaseFrequency();
          if (result.valuableCompany && result.valuableCompany != null && result.valuableCompany != '') {
            self.ValuableCompany(result.valuableCompany);
          }
        });
        service.getEmphasisEnterpriseIabCompany(self.params).then(result => {
          this.increaseFrequency();
          if (result.IabCompany && result.IabCompany != null && result.IabCompany != '') {
            self.IabCompany(result.IabCompany);
          }
        });
        service.getEmphasisEnterpriseNemCompany(self.params).then(result => {
          this.increaseFrequency();
          if (result.NemCompany && result.NemCompany != null && result.NemCompany != '') {
            self.NemCompany(result.NemCompany);
          }
        });
        service.getEmphasisEnterpriseTop5nemCompany(self.params).then(result => {
          this.increaseFrequency();
          if (result.Top5NemCompany && result.Top5NemCompany != null && result.Top5NemCompany != '') {
            self.Top5nemCompany(result.Top5NemCompany);
          }
        });
        service.getEmphasisEnterpriseTop5ibaCompany(self.params).then(result => {
          this.increaseFrequency();
          if (result.Top5IabCompany && result.Top5IabCompany != null && result.Top5IabCompany != '') {
            self.Top5ibaCompany(result.Top5IabCompany);
          }
        });
        service.getEmphasisEnterpriseTop5ValuableCompany(self.params).then(result => {
          this.increaseFrequency();
          if (result.Top5ValuableCompany && result.Top5ValuableCompany != null && result.Top5ValuableCompany != '') {
            self.Top5ValuableCompany(result.Top5ValuableCompany);
          }
        });

        service.getEmphasisEnterpriseValuableMap(self.params).then(result => {
          this.increaseFrequency();
          self.tab = 1;
          if (result.enterpriseDistributesValuable && result.enterpriseDistributesValuable != null && result.enterpriseDistributesValuable != '') {
            self.mergeOptionToMapChart(result.enterpriseDistributesValuable.data);
            this.streetTop5Default = result.enterpriseDistributesValuable.streetTOP5;
            self.mapData1 = result.enterpriseDistributesValuable.data;
            self.streetTop51 = result.enterpriseDistributesValuable.streetTOP5;
          }
        });
        service.getEmphasisEnterpriseIabMap(self.params).then(result => {
          this.increaseFrequency();
          if (result.enterpriseDistributesIAB && result.enterpriseDistributesIAB != null && result.enterpriseDistributesIAB != '') {
            self.mapData3 = result.enterpriseDistributesIAB.data;
            self.streetTop53 = result.enterpriseDistributesIAB.streetTOP5;
          }
        });
        service.getEmphasisEnterpriseNemMap(self.params).then(result => {
          this.increaseFrequency();
          if (result.enterpriseDistributesNEM && result.enterpriseDistributesNEM != null && result.enterpriseDistributesNEM != '') {
            self.mapData2 = result.enterpriseDistributesNEM.data;
            self.streetTop52 = result.enterpriseDistributesNEM.streetTOP5;
          }
        });
      },
      increaseFrequency() {
        this.loadingFrequency += 1;
        this.progressToByKey(this.loadingFrequency, this.progressDict);
      },
      paramData(type, param) {
        this.activeName = '内资';
        this.comparams.enterpriseType = 1;
        this.comparams.pageIndex = 1;
        this.currentPage1 = 1;
        this.currentPage2 = 1;
        if (type.qyType) {
          this.comparams.qyType = type.qyType;
        }
        if (typeof param.data === "object") {
          this.comparams.date = param.name;
          if (this.comparams.jz) {
            delete this.comparams.jz;
          }
          if (this.comparams.currentIndustryType) {
            delete this.comparams.currentIndustryType;
          }
        } else if (typeof param.data === "number") {
          if (param.name.indexOf('街') > -1) {
            this.comparams.jz = param.name;
            if (this.comparams.currentIndustryType) {
              delete this.comparams.currentIndustryType;
            }
          } else {
            this.comparams.currentIndustryType = param.name;
            if (this.comparams.jz) {
              delete this.comparams.jz;
            }
          }
          this.comparams.date = this.params.endDate;
        }
        this.dialogCompanyInfo = true;
        this.getCompaniesData(this.comparams);
      }
    },
    created() {
      this.loadingFrequency = 0;
      this.progressDict = {
        0: 10,
        1: 25,
        2: 40,
        3: 55,
        4: 70,
        5: 85,
        6: 100
      }
    },
    mounted() {
      this.search();
    }
  }
</script>

<style>
  .emphasis {
    position: relative;
    padding: 0 10px;
  }

  .emphasis .chart {
    padding: 0;
  }

  .emphasis .p-t-b-5 {
    padding: 5px 0 10px 0;
  }

  .emphasis .p-t-r-10 {
    padding: 5px 0px 5px 5px;
  }

  .emphasis .m-tt-5 {
    margin-top: -5px;
  }

  .emphasis .m-t-5 {
    margin-top: 5px;
  }

  .emphasis .p-r-5 {
    padding-right: 5px;
  }

  .emphasis .position-r {
    position: relative;
  }

  .emphasis .position-a {
    position: absolute;
  }

  .emphasis .position-r .tab {
    z-index: 66;
    top: 0;
    left: 0;
  }

  .emphasis .position-r .tab span {
    cursor: pointer;
    display: inline-block;
    margin: 5px 10px 5px 15px;
  }

  .emphasis .position-r .list {
    z-index: 66;
    right: 15px;
    bottom: 5px;
  }

  .emphasis .position-r .list p {
    text-align: right;
    margin: 0 0 6px 6px;
  }

  .emphasis .font-16 {
    font-size: 15px;
  }

  .emphasis .font-w {
    font-weight: 700;
  }

  .emphasis .position-r .height-inherit {
    padding: 0;
  }

  .emphasis .bg-white {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .emphasis .e-chart {
    width: 100%;
    height: 100%;
  }

  .emphasis .f-l {
    float: left;
  }

  .emphasis .w-25 {
    width: 25%;
  }

  .emphasis .w-33 {
    width: 33.3333%;
  }

  .emphasis .w-75 {
    width: 75%;
  }

  .emphasis .w-100 {
    width: 100%;
  }

  .emphasis .h-33 {
    height: 33.3333%;
  }

  .emphasis .h-66 {
    height: 66.6666%;
  }

  .emphasis .h-100 {
    height: 100%;
  }

  .darkgray .emphasis .f-l .bg-white {
    background: #313e4f;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .darkgray .emphasis .position-r .tab span {
    color: #fff;
  }

  .darkgray .emphasis .position-r .tab .font-w {
    font-weight: 700;
    color: #b0cef4;
  }

  .darkblue .emphasis .f-l .bg-white {
    background: #0f4271;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .darkblue .emphasis .position-r .tab span {
    color: #fff;
  }

  .darkblue .emphasis .position-r .tab .font-w {
    font-weight: 700;
    color: #b0cef4;
  }

  .emphasis .el-tabs__content .input-div .el-input__inner {
    color: #333;
  }

  .emphasis .el-tabs__content .el-button {
    height: 30px;
  }

  .darkblue .emphasis .el-tabs__content .input-div .el-input__inner {
    color: #333;
  }

  .darkgray .emphasis .el-tabs__content .el-pager li.btn-quickprev {
    color: #333;
  }

  .darkblue .emphasis .el-tabs__content .el-pager li.btn-quickprev {
    color: #333;
  }

  .emphasis .el-tabs__content .com-list {
    height: 310px;
    overflow: auto;
  }

  .emphasis .el-tabs__content .com-list ul {
    list-style-type: none;
  }

  .emphasis .el-tabs__content .com-list li {
    list-style-type: none;
    height: 26px;
  }

  .emphasis .el-tabs__content .com-list li:hover {
    background: #d2daec;
  }

  .emphasis .el-tabs__content .com-list li .name-attr {
    display: inline-block;
    width: 60%;
    overflow: hidden;
    height: 26px;
    white-space: nowrap;
    text-overflow: ellipsis;
    float: left;
  }

  .emphasis .el-tabs__content .com-list li .act-attr {
    display: inline-block;
    width: 8%;
    text-align: right;
    height: 26px;
  }
</style>
