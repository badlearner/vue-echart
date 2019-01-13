<template>
  <div style="height: 100%;">
    <div class="hot-map-page-left dropdown">
      <div class="hot-map-page-right-top">
        <map-chart ref="map"></map-chart>
      </div>
      <div class="hot-map-page-right-bottom">
        <el-table
          :data="tableData3"
          height="91%"
          border
          style="width: 100%">
          <el-table-column
            v-for="item in columnData3"
            v-bind:key="item.label"
            :prop=item.prop
            :label=item.label
            :width=item.width>
          </el-table-column>
        </el-table>
        <a style="margin-top: 2px;display: block;margin-left: 5px;">更多排行</a>
      </div>
    </div>
    <div class="hot-map-page-right">
      <div class="hot-map-page-right-top">
        <zone-chart ref="zone" @click="zoneChartClick" @goToChart="goToChart"/>
      </div>
      <div class="hot-map-page-right-bottom">
       <!-- <div>
          <el-input placeholder="园区搜索" style="width:160px;margin-right: 5px;margin-left: 5px;" v-model="info.text" size="mini" clearable/>
            <el-select v-model="info.type" style="width:130px;margin-right: 5px;" placeholder="请选择" size="mini" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
        </div>-->
        <el-table
          :data="tableData2"
          height="85%"
          border
          style="width: 100%">
          <el-table-column
            v-for="item in columnData2"
            v-bind:key="item.label"
            :prop=item.prop
            :label=item.label
            :width=item.width>
          </el-table-column>
          <el-table-column
            label='操作'
            width='70'
          ><template slot-scope="scope">
            <el-button type="text" size="small">详情</el-button>
          </template>
          </el-table-column>
        </el-table>
        <div class="text-center">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="100">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {iFrame, info} from '@/utils/iframeUtil';
  import zoneChart from '@/components/SingleZoneDataChart.vue';
  import mapChart from './haizhuMap.vue';
  import service from '@/services/economicTrendAnalysis/emphasisEnterprise';
  import indexServer from '@/services/index';
  import ZoneMonitorService from '@/services/ecoOperationMonitoring/ZoneMonitorService';
  export default {
    data() {
      return {
        chartLinkImage: require('@/assets/image/chartlink.png'),
        resultData:[],
        isLoad: false,
        show: true,
        data: null,
        gdpUnit: null,
        taxUnit: null,
        showLoading: false,
        currViewZoneId: null,
        param: {
          marketName: null,
          fourTopStatus: null,
          zoneId: null
        },
        url: '/api/IndustryMonitor/StreetSpecializedMarketDetail',
        columnData3:[
          {prop: 'number',label: '排名', width:50},
          {prop: 'streetName',label: '街镇名称', width:90},
          {prop: 'professionalNum',label: '孵化器数', width:100},
          {prop: 'totalTax',label: '入驻企业数', width:150},
          {prop: 'quankuTax',label: '全库税收总额（亿元）', width:170},
          {prop: 'qukuTax',label: '区库税收总额（亿元）', width:170}
        ],
        tableData3: [{
          number: 1,
          streetName: '琶洲街',
          professionalNum: 35,
          totalTax: 500,
          quankuTax: 200,
          qukuTax: 300
        }, {
          number: 2,
          streetName: '南洲街',
          professionalNum: 32,
          totalTax: 400,
          quankuTax: 200,
          qukuTax: 200
        }, {
          number: 3,
          streetName: '华洲街',
          professionalNum: 25,
          totalTax: 500,
          quankuTax: 200,
          qukuTax: 300
        }, {
          number: 4,
          streetName: '官洲街',
          professionalNum: 24,
          totalTax: 300,
          quankuTax: 200,
          qukuTax: 100
        }, {
          number: 5,
          streetName: '瑞宝街',
          professionalNum: 22,
          totalTax: 280,
          quankuTax: 100,
          qukuTax: 400
        }, {
          number: 6,
          streetName: '江海街',
          professionalNum: 20,
          totalTax: 250,
          quankuTax: 200,
          qukuTax: 50
        }, {
          number: 7,
          streetName: '赤港街',
          professionalNum: 15,
          totalTax: 200,
          quankuTax: 100,
          qukuTax: 100
        }],
        info:{
          text:'',
          type:0
        },
        columnData2:[
          {prop: 'professionName',label: '名称', width:200},
          {prop: 'level',label: '级别', width:140},
          {prop: 'djTime',label: '登记时间', width:140},
          {prop: 'street',label: '街镇', width:140},
          {prop: 'areas',label: '面积', width:140},
          {prop: 'companyNum',label: '入驻企业（项目）', width:140}
        ],
        tableData2: [{
          professionName: '广州市汽车市场',
          level:'市级',
          djTime: '2016-6-12',
          street: '琶洲街',
          areas: 100,
          companyNum: 43
        }, {
          professionName: '广州市汽车市场',
          level:'市级',
          djTime: '2016-6-12',
          street: '琶洲街',
          areas: 100,
          companyNum: 43
        }, {
          professionName: '广州市汽车市场',
          level:'市级',
          djTime: '2016-6-12',
          street: '琶洲街',
          areas: 100,
          companyNum: 43
        }, {
          professionName: '广州市汽车市场',
          level:'市级',
          djTime: '2016-6-12',
          street: '琶洲街',
          areas: 100,
          companyNum: 43
        }, {
          professionName: '广州市汽车市场',
          level:'市级',
          djTime: '2016-6-12',
          street: '琶洲街',
          areas: 100,
          companyNum: 43
        }, {
          professionName: '广大鞋业商贸城',
          GDP: 500,
          Tax: 200
        }, {
          professionName: '广州市汽车市场',
          level:'市级',
          djTime: '2016-6-12',
          street: '琶洲街',
          areas: 100,
          companyNum: 43
        }],
        options: [{
          value: 0,
          label: '全部'
        }, {
          value: 1,
          label: '四上企业'
        }, {
          value: 2,
          label: '中小微企业'
        }],
      }
    },
    components: {
      zoneChart,
      mapChart
    },
    methods: {
      setDataByPage(data, other) {
        this.gdpUnit = data.gdpunit;
        this.taxUnit = data.taxunit;
        this.data = data.data;
      },
      search(condition) {
        this.param.marketName = condition.name;
        this.param.fourTopStatus = condition.fourTopStatus;
        this._setProfessionalWholesaleList();
      },
      zoneChartClick(param) {
        var zoneName=window.localStorage.getItem('zoneName') ? window.localStorage.getItem('zoneName') : this.$store.state.zoneName;
        if(param.data.name==zoneName||zoneName=="全区"){
          this._showZoneData(param.data.streetId, param.data.name);
        }else{
          alert("您暂无权限查看其他街镇数据。");
        }
      },
      mapChartClick(param) {
        var zoneName=window.localStorage.getItem('zoneName') ? window.localStorage.getItem('zoneName') : this.$store.state.zoneName;
        if(param.data.name==zoneName||zoneName=="全区"){
          this._showZoneData(param.data.streetId, param.data.name);
        }else{
          alert("您暂无权限查看其他街镇数据。");
        }
      },
      mapPositioning(item) {
        this.show = false;
        info.XZQID = null;
        info.XZQMC = null;
        info.enterpriseName = item.name;
        info.enterpriseId = item.id;
        info.pageName = '专业批发市场';
        this._showArcGis(info, 'mapPosition');
      },
      goToChart() {
        this.$router.push('/professionalWholesale');
      },
      loadStateChange(state) {
        this.showLoading = state;
      },
      echartLocateToMap(info, type) {
        let self = this;
        return function () {
          setTimeout(function () {
            self.$Progress.finish();
          }, 500);
          return {
            info: info,
            click: type
          }
        }
      },
      _showArcGis(info, click) {
        if (this.isLoad) {
          iFrame.iFrameFunction({info: info, click: click});
        } else {
          window.echartLocateToMap = this.echartLocateToMap(info, click);
          this.isLoad = true;
          this.$Progress.start();
        }
      },
      _showZoneData(zoneId, zonenName) {
        this.show = false;
        this.currViewZoneId = zoneId;
        info.XZQID = zoneId;
        info.XZQMC = zonenName;
        info.pageName = '专业批发市场';

        this._setProfessionalWholesaleList();
        this._showArcGis(info, 'streetChart');
      },
      _setProfessionalMapData() {
        indexServer.getStreetPointData().then(result => {
          var data = result.data.features, res = [];
          for (var i = 0; i < data.length; i++) {
            var obj = {name: '', value: 15, coord: []}
            obj.name = data[i].properties.name;
            obj.coord = data[i].geometry.coordinates;
            res.push(obj);
          }
          this.resultData = res;
        });
        service.getEmphasisEnterpriseValuableMap(self.params).then(result => {
          if (result.enterpriseDistributesValuable && result.enterpriseDistributesValuable != null && result.enterpriseDistributesValuable != '') {
            this.$refs.map.mergeOption(result.enterpriseDistributesValuable.data,this.resultData);
            self.mapData1 = result.enterpriseDistributesValuable.data;
          }
        });
        ZoneMonitorService.getProMarketMapData().then(result => {
          this.$refs.zone.setChartOption(result.yAxisData,'个',result.seriesData,'孵化器街道排名');
        });
      },
      _setProfessionalWholesaleList() {
        this.param.zoneId = this._getCurrentViewZoneId();
        Vue.nextTick(() => {
          this.$refs.ranking.initPage();
        })
      },
      _setMapChartData(seriesData) {
        this.$refs.map.setMapChartData(seriesData, '个');
      },
      _setStreetChartData(yAxisData, seriesData) {
        this.$refs.zone.setChartOption(yAxisData, '个', seriesData, '工业园区数量');
      },
      _backToChartMap() {
        this.show = true;
      },
      _getCurrentViewZoneId() {
        return this.currViewZoneId || this.$store.state.zoneId;
      }
    },
    mounted() {
      //window.backToChartMap = this._backToChartMap;
      //new Optiscroll(this.$refs.container, {scrollStopDelay: 50});
      //this._setProfessionalWholesaleData();
      this._setProfessionalMapData();
    },
    beforeDestroy() {
      window.backToChartMap = null;
    }
  }
</script>
<style>
  .hot-map-page-left {
    float: left;
    height: 100%;
    width: 55%;
    padding-right: 5px;
  }
  .hot-map-page-right {
    float: right;
    height: 100%;
    width: 45%;
  }
  .hot-map-page-right-top {
    position: relative;
    height: 50%;
    padding: 0 0 2.5px;
    background: #fff;
  }
  .hot-map-page-right-bottom {
    margin-top: 5px;
    height: 50%;
    padding: 2.5px 0 0;
    background: #fff;
  }
  .back-to-bar {
    position: absolute;
    right: 0;
    top: 0;
  }
  .po-z-index {
    z-index: 9999;
  }
  .hot-map-page-right-bottom .el-table th{
    padding: 2px 0;
    background: #3398db;
    color: #fff;
  }
  .hot-map-page-right-bottom .el-table td{
    padding: 3px 0;
  }
</style>
