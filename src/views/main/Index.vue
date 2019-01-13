<template>
  <div>
    <div class="main-left-container">
      <div class="left-top">
        <div class="market-total-count">
          <span class="count font-15">{{ maeketTotalCount }}</span>
          <span class="unit font-12">户</span>
        </div>
        <p class="title">市场主体</p>
        <div class="left-top-chart-container" style="position: relative">
          <div class="market-chart">
            <market class="height-inherit" ref="marketChart"/>
            <ul class="market-info-wrap">
              <li>
                <span class="count">{{ enterprises }}</span>
                <span class="unit font-12">户</span>
              </li>
              <li>
                <span class="count">{{ selfEmployed }}</span>
                <span class="unit font-12">户</span>
              </li>
            </ul>
            <p class="yearOrMonth-a">
              <span v-bind:class="{yearactive: timeType=== 'year'}" href="javascript:void(0)"
                    @click="yearOrMonth('year')">年度</span>
              <span v-bind:class="{yearactive: timeType=== 'month'}" href="javascript:void(0)"
                    @click="yearOrMonth('month')">月度</span>
            </p>
          </div>
          <div style="position: absolute;bottom: 0;height:60%;width:100%;" v-if="timeType=== 'year'">
            <cancellation-enterprise class="cancellationenterprise-chart" ref="ceChart"/>
          </div>
          <div style="position: absolute;bottom: 0;height:60%;width:100%;" v-if="timeType=== 'month'">
            <month-data class="cancellationenterprise-chart" ref="ceChartMonth"/>
          </div>
        </div>
      </div>
      <div class="left-middle">
        <p class="title">重点企业</p>
        <div class="emphasis-enterprise-container">
          <div class="item-left border-dashed">
            <div class="vertical-center" style="margin-top: -2px;">
              <div class="emphasis-enterprise-item-name">亿元企业</div>
              <div class="emphasis-enterprise-item-value billion-color">{{ billion }}</div>
              <div class="emphasis-enterprise-item-contrast">比增</div>
              <div class="emphasis-enterprise-item-contrast-value"
                   v-bind:class="[billionContrastValue > 0 ? 'red': 'green']">
                <i class="fa"
                   v-bind:class="[billionContrastValue > 0 ? 'fa-long-arrow-up': 'fa-long-arrow-down']"></i>
                {{ billionContrastValue }}%
              </div>
            </div>
          </div>
          <div class="item-center border-dashed">
            <div class="vertical-center" style="margin-top: -2px;">
              <div class="emphasis-enterprise-item-name">IAB企业</div>
              <div class="emphasis-enterprise-item-value IAB-color">{{ IAB }}</div>
              <div class="emphasis-enterprise-item-contrast">比增</div>
              <div class="emphasis-enterprise-item-contrast-value"
                   v-bind:class="[IABContrastValue > 0 ? 'red': 'green']">
                <i class="fa"
                   v-bind:class="[IABContrastValue > 0 ? 'fa-long-arrow-up': 'fa-long-arrow-down']"></i>
                {{ IABContrastValue }}%
              </div>
            </div>
          </div>
          <div class="item-right border-dashed">
            <div class="vertical-center" style="margin-top: -2px;">
              <div class="emphasis-enterprise-item-name">NEM企业</div>
              <div class="emphasis-enterprise-item-value NEM-color">{{ NEM }}</div>
              <div class="emphasis-enterprise-item-contrast">比增</div>
              <div class="emphasis-enterprise-item-contrast-value"
                   v-bind:class="[NEMContrastValue > 0 ? 'red': 'green']">
                <i class="fa"
                   v-bind:class="[NEMContrastValue > 0 ? 'fa-long-arrow-up': 'fa-long-arrow-down']"></i>
                {{ NEMContrastValue }}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="left-bottom">
        <p class="title">总体产值</p>
        <div class="market-business-container">
          <total-g-d-p ref="totalgdp"></total-g-d-p>
        </div>
      </div>
    </div>
    <div class="main-center-container">
      <ul class="map-tab text-center">
        <li @click="onselectMoveType('moveIn')">
          <span v-bind:class="{active: moveType === 'moveIn'}"><span>迁入企业</span></span>
          <p class="text-color" v-bind:class="{red: moveType === 'moveIn'}"><span class="font-22 mar-r-10">{{moveInTotalData}}</span><span
            v-bind:class="{whiteRight: moveType === 'moveIn'}">{{moveInPresence}}%</span><i class="i-icon"
                                                                                            v-bind:class="{downIcon: moveInPresence < 0,upIcon: moveInPresence > 0}"></i>
          </p>
        </li>
        <li @click="onselectMoveType('moveOut')">
          <span v-bind:class="{active: moveType === 'moveOut'}"><span>迁出企业</span></span>
          <p class="text-color" v-bind:class="{green: moveType === 'moveOut'}"><span class="font-22 mar-r-10">{{moveOutTotalData}}</span><span
            v-bind:class="{whiteRight: moveType === 'moveOut'}">{{moveOutPresence}}%</span><i class="i-icon"
                                                                                              v-bind:class="{downIcon: moveOutPresence < 0,upIcon: moveOutPresence > 0}"></i>
          </p>
        </li>
      </ul>
      <p style="text-align: center;font-size: 12px;margin:8px auto 0 auto;">{{dataDate}}</p>
      <map-chart class="map-chart" ref="map"></map-chart>
      <div class="middle-bottom">
        <div class="middle-f-l">
          <p class="title">企业迁移统计</p>
          <move-in-out-chart class="main-bottom-chart" ref="moveChart"></move-in-out-chart>
        </div>
        <div class="middle-f-r">
          <div class="title">
            <span class="tab-p" v-bind:class="{'is-active':isSelected}" @click="tabClick()">迁移</span><span class="tab-p"
                                                                                                           v-bind:class="{'is-active':!isSelected}"
                                                                                                           @click="tabClick()">净流</span>
          </div>
          <div class="move-content">
            <div class="top-content" v-show="isSelected">
              <div class="top-content-f">
                <h5 style="text-align: left;">企业迁入TOP5</h5>
                <p v-for="item in moveInsData"><span class="text-right" style="width:50%;">{{item.QY}}：</span><span
                  class="text-left">{{item.Count}}</span></p>
              </div>
              <div class="top-content-f">
                <h5 style="text-align: left;">企业迁出TOP5</h5>
                <p v-for="item in moveOutsData"><span class="text-right" style="width:50%;">{{item.QY}}：</span><span
                  class="text-left">{{item.Count}}</span></p>
              </div>
            </div>
            <div class="top-content" v-show="!isSelected">
              <h5 style="text-align: left;line-height: 20px;">企业净流入/净流出</h5>
              <div class="top-content-f">
                <p v-for="item in netMoveInsData"><span class="text-right">{{item.QY}}：</span><span
                  class="text-left">{{item.Count}}</span></p>
              </div>
              <div class="top-content-f">
                <p v-for="item in netMoveOutsData"><span class="text-right">{{item.QY}}：</span><span class="text-left">{{item.Count}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-right-container">
      <div class="right-top">
        <p class="title">总体税收</p>
        <!--<companies-active-chart class="main-right-chart" ref="caChart"/>-->
        <total-tax ref="totalTax"></total-tax>
      </div>
      <div class="right-middle">
        <p class="title">四上行业</p>
       <!-- <ul class="patent-type-nav">
          <li v-for="view in intellectualPropertyViews">
            <a @click="onselPatentType(view)"
               v-bind:class="{active: intellectualPropertyView === view.viewName}"><span>{{ view.cnName }}</span></a>
          </li>
        </ul>
        <intellectual-property-chart class="main-right-chart" ref="ipChart"/>-->
        <top4-industry ref="top4"></top4-industry>
      </div>
      <div class="right-bottom">
        <p class="title">经济资源</p>
        <economic-resource-chart class="main-right-chart" ref="erChart"/>
      </div>
    </div>
  </div>
</template>

<script>
  import service from '@/services/index';

  import EcoService from '@/services/economicTrendAnalysis/marketAnalysis';
  import Market from './MarketChart';
  import MapChart from './MapChart';
  import MonthData from './monthData.vue';
  import CompaniesActiveChart from './CompaniesActiveChart';
  import EconomicResourceChart from './EconomicResourceChart';
  import IntellectualPropertyChart from './IntellectualPropertyChart';
  import CancellationEnterprise from './CancellationOfEnterpriseChart';
  import MoveInOutChart from './MoveInMoveOutChart';
  import totalGDP from './totalGDP';
  import totalTax from './totalTax';
  import top4Industry from './top4Industry';
  export default {
    components: {
      Market,
      MapChart,
      CompaniesActiveChart,
      EconomicResourceChart,
      CancellationEnterprise,
      IntellectualPropertyChart,
      MonthData,
      MoveInOutChart,
      totalGDP,
      totalTax,
      top4Industry
    },
    data () {
      return {
        isSelected: true,
        IAB: 0,
        IABContrastValue: 0,
        NEM: 0,
        NEMContrastValue: 0,
        billion: 0,
        billionContrastValue: 0,
        abnormal: 55146,
        report: 12741,
        penalize: 0,
        selfEmployed: 0,
        enterprises: 0,
        maeketTotalCount: 0,
        moveType: 'moveIn',
        moveInTotalData: 0,
        moveInPresence: 0,
        moveOutTotalData: 0,
        moveOutPresence: 0,
        moveItme: null,
        timeType: 'year',
        intellectualPropertyItem: null,
        intellectualPropertyView: 'trademark',
        intellectualPropertyViews: [
          {viewName: 'trademark', cnName: '商标'},
          {viewName: 'invention', cnName: '发明'},
          {viewName: 'utilityModel', cnName: '实用新型'},
          {viewName: 'exterior', cnName: '外观'}
        ],
        netMoveInsData: '',
        netMoveOutsData: '',
        moveOutsData: '',
        moveInsData: '',
        dataDate: '',
        DatadatemoveIn: '',
        DatadatemoveOut: '',
        params: {
          startDate: this.getCurrentYear() - 5,
          endDate: this.getCurrentYear(),
          searchType: 4,
          enterpriseType: 0
        }
      }
    },
    methods: {
      getCurrentYear () {
        var myDate = new Date();
        var yearData = myDate.getFullYear();
        return parseInt(yearData);
      },
      getCurrentYearMonth () {
        var myDate = new Date();
        var yearData = myDate.getFullYear();
        var month = myDate.getMonth() + 1;
        var date = {
          beginDate: '',
          endDate: ''
        };
        month = (month < 10 ? '0' + month : month);
        date.endDate = (yearData.toString() + '-' + month.toString());
        if (month === 12) {
          date.beginDate = (yearData.toString() + '-' + (parseInt(month) - 11).toString());
        } else {
          date.beginDate = ((yearData - 1).toString() + '-' + ((parseInt(month) + 1) > 9 ? (parseInt(month) + 1) : '0' + (parseInt(month) + 1)).toString());
        }
        return date;
      },
      onselectMoveType (type) {
        if (this.moveType === type) {
          return false;
        }
        if (type === 'moveIn') {
          this.dataDate = this.DatadatemoveIn;
        } else {
          this.dataDate = this.DatadatemoveOut;
        }

        this.moveType = type;
        this.mergeDataToEnterpriseMoveChart(this.moveItme[this.moveType]);

      },
      tabClick () {
        this.isSelected = !this.isSelected;
      },
      yearOrMonth (type) {
        this.timeType = type;
        if (type == 'year') {
          this.params = {
            startDate: this.getCurrentYear() - 5,
            endDate: this.getCurrentYear(),
            searchType: 4,
            enterpriseType: 0
          };
        } else {
          this.params = {
            startDate: (this.getCurrentYearMonth()).beginDate,
            endDate: (this.getCurrentYearMonth()).endDate,
            searchType: 1,
            enterpriseType: 0
          };
        }
        this.getMainmarket();
      },
      onselPatentType (view) {
        if (this.intellectualPropertyView === view.viewName) {
          return false;
        }

        this.intellectualPropertyView = view.viewName;
        this.mergeDataToIntellectualPropertyChart(this.intellectualPropertyItem[this.intellectualPropertyView]);
      },
      setEmphasisEnterpriseItem (item) {
        this.IAB = item.IAB;
        this.IABContrastValue = item.IABContrastValue;
        this.NEM = item.NEM;
        this.NEMContrastValue = item.NEMContrastValue;
        this.billion = item.billion;
        this.billionContrastValue = item.billionContrastValue;
      },
      setMarketBusinessOrderItem (item) {
        this.abnormal = item.abnormal;
        this.report = item.report;
        this.penalize = item.penalize;
      },
      mergeDataToCancellationEnterpriseChart (item) {
        if (this.$refs.ceChart) {
          this.$refs.ceChart.mergeOption(item.xAxisData, item.seriesData);
        }
        if (this.$refs.ceChartMonth) {
          this.$refs.ceChartMonth.mergeOption(item.xAxisData, item.seriesData);
        }
      },
      mergeDataToMarketChart (item) {
        this.selfEmployed = item.selfEmployed.value;
        this.enterprises = item.enterprises.value;
        this.$refs.marketChart.mergeOption([item.selfEmployed, item.enterprises]);
      },
      mergeDataToCompaniesActiveChart (item) {
        this.$refs.caChart.mergeOption(item);
      },
      mergeDataToIntellectualPropertyChart (item) {
        this.$refs.ipChart.mergeOption(item.xAxisData, item.seriesData);
      },
      mergeDataToEconomicResourceChart (item) {
        this.$refs.erChart.mergeOption(item.xAxisData, item.series);
      },
      mergeDataToEnterpriseMoveChart (item) {
        this.$refs.map.mergeOption(item.linesData, item.valueData, this.moveType === 'moveOut');
      },
      mergeDataMoveInMoveOutChart (item) {
        if (item) {
          this.$refs.moveChart.mergeOption(item.xAxisData, item.seriesData);
        }
      },
      getMainmarket () {
        EcoService.getBusinessEnterprise(this.params).then(result => {
          this.mergeDataToCancellationEnterpriseChart(result);
        });
      },
      increaseFrequency() {
        this.loadingFrequency += 1;
        this.progressToByKey(this.loadingFrequency, this.progressDict);
      }
    },
    mounted () {
      const self = this;
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
      this.progressToByKey(this.loadingFrequency, this.progressDict);
      this.getMainmarket();
      service.getMapMain().then(result => {
        this.increaseFrequency();
        self.moveItme = result;
        self.mergeDataToEnterpriseMoveChart(self.moveItme[self.moveType]);
        self.dataDate = '(' + self.moveItme.moveIn.time + ')';
        self.DatadatemoveIn = '(' + self.moveItme.moveIn.time + ')';
        self.DatadatemoveOut = '(' + self.moveItme.moveOut.time + ')';
        self.moveInTotalData = self.moveItme.moveIn.totalData;
        self.moveInPresence = (self.moveItme.moveIn.presence) * 100;
        self.moveOutTotalData = self.moveItme.moveOut.totalData;
        self.moveOutPresence = (self.moveItme.moveOut.presence) * 100;
      });

      service.getMarketMainData().then(result => {
        this.increaseFrequency();
        self.mergeDataToMarketChart(result);
        self.maeketTotalCount = result.totalCount;
      });

      service.getEmphasisData().then(result => {
        this.increaseFrequency();
        self.setEmphasisEnterpriseItem(result);
      });

      service.getMarketRoleData().then(result => {
        this.increaseFrequency();
        self.setMarketBusinessOrderItem(result);
      });

      service.getCompanyActiveData().then(result => {
        this.increaseFrequency();
        // self.mergeDataToCompaniesActiveChart(result);
      });

      service.getIntellectualPropertyData().then(result => {
        this.increaseFrequency();
        self.intellectualPropertyItem = result;
        // self.mergeDataToIntellectualPropertyChart(result[self.intellectualPropertyView]);
      });

      service.getEcoResourceData().then(result => {
        this.increaseFrequency();
        self.mergeDataToEconomicResourceChart(result);
      });

      /*service.getMarketMainEchartData().then(result => {
          self.mergeDataToCancellationEnterpriseChart(result);
      });*/

      service.getMainList().then(result => {
        this.mergeDataMoveInMoveOutChart(result.moveInMoveOutEnterprise);
      });

      service.getTop4IndustryData().then(result => {
        let topData = [
          {name: '限上批发零售和住宿餐饮企业', value: result.businessData},
          {name: '规模以上服务业', value: result.serviceData},
          {name: '资质等级建筑业', value: result.buildingData},
          {name: '规模以上工业企业', value: result.industryData}
        ];
        this.$refs.top4.setChartOption(topData);
        //this.mergeDataMoveInMoveOutChart(result.moveInMoveOutEnterprise);
      });

      service.getTotalGDPData().then(result => {
        this.$refs.totalgdp.setChartOption(result);
        //this.mergeDataMoveInMoveOutChart(result.moveInMoveOutEnterprise);
      });

      service.getTotalTaxData().then(result => {
        this.$refs.totalTax.setChartOption(result);
        //this.mergeDataMoveInMoveOutChart(result.moveInMoveOutEnterprise);
      });

      service.getBottomMigrateData({year: 2017}).then(result => {
        this.netMoveInsData = result.netMoveOuts.slice(5, 10);
        this.netMoveOutsData = result.netMoveOuts.slice(0, 5);
        this.moveInsData = result.moveIns;
        this.moveOutsData = result.moveOuts;
      });
    }
  }
</script>

<style scoped>
  .patent-type-nav {
    position: absolute;
    top: 27%;
    left: 0;
    right: 0;
    z-index: 10;
    text-align: center;
  }

  .patent-type-nav > li {
    display: inline-block;
    margin: 0 10px;
  }

  .patent-type-nav > li > a {
    box-sizing: border-box;
    display: inline-block;
    padding: 0 5px;
    font-size: 12px;
    text-decoration: none;
    cursor: pointer;
  }

  .text-color {
    color: #afafaf;
    margin: 0;
  }

  .whiteRight {
    color: #333333;
  }

  .mar-r-10 {
    margin-right: 10px;
  }

  .map-chart {
    height: 60%;
  }

  .main-right-chart {
    height: calc(100% - 25px);
  }

  .main-bottom-chart {
    height: calc(100% - 25px);
  }

  .category-icon-container {
    height: 40%;
    text-align: center;
  }

  .market-business-value {
    font-size: 22px;
    font-weight: bold;
    text-align: center;
  }

  .market-business-title {
    font-size: 12px;
    text-align: center;
  }

  .i-icon {
    margin-left: 1px;
    display: inline-block;
    width: 8px;
    height: 12px;
  }

  .market-total-count {
    position: absolute;
    top: 10%;
    right: 0;
    left: 0;
    text-align: center;
  }

  .market-total-count .count {
    font-weight: 600;
  }

  .category-icon {
    height: 30px;
  }

  .red {
    color: #dc5156;
  }

  .red .fa-long-arrow-up {
    position: relative;
    top: -1px;
  }

  .green {
    color: #79cd37;
  }

  .billion-color {
    color: #ea4c4b;
  }

  .IAB-color {
    color: #9ae9f0;
  }

  .NEM-color {
    color: #fad56b;
  }

  .emphasis-enterprise-container {
    height: calc(100% - 23px);
    padding: 15px;
  }

  .market-business-container {
    height: calc(100% - 22px);
  }

  .vertical-center {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .item-left {
    float: left;
    height: 100%;
    width: calc(33.3% - 10px);
    margin-right: 15px;
  }

  .item-center {
    float: left;
    height: 100%;
    width: calc(33.4% - 10px);
    margin-right: 15px;
  }

  .item-right {
    float: left;
    height: 100%;
    width: calc(33.3% - 10px);
  }

  .emphasis-enterprise-item-name {
    margin: 0;
    padding-bottom: 5px;
    font-size: 13px;
    text-align: center;
  }

  .emphasis-enterprise-item-value {
    display: block;
    margin: 0;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
  }

  .emphasis-enterprise-item-contrast {
    margin: 0;
    font-size: 12px;
    text-align: center;
  }

  .emphasis-enterprise-item-contrast-value {
    margin: 0;
    font-size: 12px;
    text-align: center;
  }

  .market-info-wrap {
    position: absolute;
    top: 50%;
    left: 70%;
    margin-top: -21px;
    padding: 0;
    list-style: none;
  }

  .market-info-wrap .count {
    display: inline-block;
    padding-right: 5px;
    font-size: 14px;
    font-weight: 600;
    text-align: right;
  }

  .market-chart {
    position: relative;
    height: 35%;
  }

  .cancellationenterprise-chart {
    height: calc(100%);
    width: 100%;
  }

  .title {
    margin: 0;
    padding: 5px 0 0 15px;
    font-size: 14px;
  }

  .left-top-chart-container {
    height: calc(100% - 25px);
  }

  .left-top {
    position: relative;
    height: 42%;
  }

  .left-middle {
    margin-top: 5px;
    height: calc(28% - 5px);
  }

  .middle-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    height: calc(30% - 5px);
    width: 100%;
  }

  .middle-bottom .middle-f-l {
    width: 50%;
    height: 100%;
    float: left;
  }

  .middle-bottom .middle-f-r {
    width: 50%;
    height: 100%;
    float: right;
    position: relative;
  }

  .title .tab-p {
    cursor: pointer;
    font-size: 12px;
    padding: 2px 0;
    margin-right: 5px;
  }

  .middle-bottom .middle-f-r .move-content {
    width: 90%;
    height: 80%;
    margin: 10px auto;
  }

  .middle-bottom .middle-f-r .move-content .top-content {
    width: 100%;
    height: 100%;
  }

  .darkblue .middle-bottom .title .is-active {
    border-bottom: 2px solid #c6c8ca;
  }

  .move-content .top-content-f {
    width: 50%;
    height: 100%;
    float: right;
    padding-left: 10px;
  }

  .move-content .top-content-f p span {
    display: inline-block;
    width: 50%;
  }

  .middle-bottom .title .is-active {
    border-bottom: 2px solid #64778c;
  }

  .middle-f-l p {
    margin: 0 0 3px;
    font-size: 12px;
  }

  .left-bottom {
    margin-top: 5px;
    height: calc(30% - 5px);
  }

  .right-top {
    height: 33.3%;
  }

  .right-middle {
    position: relative;
    margin-top: 5px;
    height: calc(33.4% - 5px);
  }

  .right-bottom {
    margin-top: 5px;
    height: calc(33.3% - 5px);
  }

  .main-left-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 27.5%;
    height: 100%;
    padding: 5px 5px 0 5px;
  }

  .main-right-container {
    position: absolute;
    top: 0;
    left: 72.5%;
    bottom: 0;
    width: 27.5%;
    height: 100%;
    padding: 5px 5px 0 10px;
  }

  .main-center-container {
    position: absolute;
    top: 10px;
    bottom: 0;
    left: 27.5%;
    margin-left: 5px;
    padding: 5px 5px;
    width: calc(45% - 5px);
    border-radius: 5px;
  }

  .white .whiteRight {
    color: #333333;
  }

  .darkgray .whiteRight {
    color: #e1f4ff;
  }

  .darkblue .whiteRight {
    color: #a1cef7;
  }

  .yearOrMonth-a {
    position: absolute;
    left: 5px;
    bottom: -30px;
    z-index: 888;
  }

  .darkblue .yearOrMonth-a span {
    display: inline-block;
    margin: 0 5px;
    color: #f8fffd;
    font-size: 12px;
  }

  .yearOrMonth-a span {
    display: inline-block;
    margin: 0 5px;
    color: #333;
    font-size: 12px;
    cursor: pointer;
  }

  .yearOrMonth-a span:hover {
    text-decoration: none;
  }

  .darkgray .yearOrMonth-a span {
    display: inline-block;
    margin: 0 5px;
    color: #f8fffd;
    font-size: 12px;
  }

  .yearOrMonth-a .yearactive {
    border-bottom: 2px solid #424242;
  }

  .darkgray .yearOrMonth-a .yearactive {
    border-bottom: 2px solid #f8fffd;
  }

  .darkblue .yearOrMonth-a .yearactive {
    border-bottom: 2px solid #f8fffd;
  }
</style>
