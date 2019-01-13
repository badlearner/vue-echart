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
        <router-link class="back-to-bar po-z-index" :to="{path: '/MainIndex/ecoOperationMonitoring/industryMonitor'}"><img :src="chartLinkImage" /></router-link>
        <zone-chart ref="zone" @click="zoneChartClick" @goToChart="goToChart"/>
      </div>
      <div class="hot-map-page-right-bottom">
        <div class="search text-center">
          <ul>
            <li class="pull-left">
              <span class="zone-name">全区：</span>
            </li>
            <li class="pull-left" v-for="item in industryTypes" style="margin-left:10px;list-style:none">
              <label class="checkbox" style="margin: 0 0 5px 0">
                <input type="checkbox" v-model="item.selected"
                       @change="onSelectIndustryType">{{ item.name}}
              </label>
            </li>
            <li class="pull-left" style="margin-left: 10px;list-style:none;">
              <a href="javascript:void(0);" class="btn btn-primary" style="padding: 0 5px"
                 >反选</a><!--@click.stop="inverse"-->
            </li>
          </ul>
        </div>
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
  import zoneChart from './ZoneDataChart.vue';
  import mapChart from './haizhuMap.vue';
  import service from '@/services/economicTrendAnalysis/emphasisEnterprise';
  import indexServer from '@/services/index';
  import ZoneMonitorService from '@/services/ecoOperationMonitoring/ZoneMonitorService';

  import industryService from '@/services/ecoOperationMonitoring/industryMonitor';

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
        industryTypes: [
          {name: '工业', value: 0, selected: true},
          {name: '商业', value: 1, selected: true},
          {name: '服务业', value: 2, selected: true},
          {name: '建筑业', value: 3, selected: true},
          {name: '房地产', value: 4, selected: true}
        ],
        url: '/api/IndustryMonitor/StreetSpecializedMarketDetail',
        columnData3:[
          {prop: 'number',label: '排名', width:50},
          {prop: 'streetName',label: '街镇名称', width:90},
          {prop: 'companyNum',label: '企业户数', width:100},
          {prop: 'totalTax',label: '产值(亿元)', width:150},
          {prop: 'quankuTax',label: '全库税收（亿元）', width:170},
          {prop: 'qukuTax',label: '区库税收（亿元）', width: 'auto'}
        ],
        tableData3: [{
          number: 1,
          streetName: '琶洲街',
          companyNum: 1135,
          totalTax: 5002,
          quankuTax: 1100,
          qukuTax: 3436
        }, {
          number: 2,
          streetName: '南洲街',
          companyNum: 3332,
          totalTax: 4003,
          quankuTax: 3207,
          qukuTax: 8980
        }, {
          number: 3,
          streetName: '华洲街',
          companyNum: 2225,
          totalTax: 3500,
          quankuTax: 2080,
          qukuTax: 9878
        }, {
          number: 4,
          streetName: '官洲街',
          companyNum: 7524,
          totalTax: 4440,
          quankuTax: 1110,
          qukuTax: 2234
        }, {
          number: 5,
          streetName: '瑞宝街',
          companyNum: 2256,
          totalTax: 2803,
          quankuTax: 3200,
          qukuTax: 6544
        }, {
          number: 6,
          streetName: '江海街',
          companyNum: 6780,
          totalTax: 2502,
          quankuTax: 2345,
          qukuTax: 4533
        }, {
          number: 7,
          streetName: '赤港街',
          companyNum: 3315,
          totalTax: 4040,
          quankuTax: 3954,
          qukuTax: 8965
        }, {
          number: 8,
          streetName: '龙凤街',
          companyNum: 1225,
          totalTax: 3200,
          quankuTax: 4450,
          qukuTax: 4535
        }, {
          number: 9,
          streetName: '华洲街',
          companyNum: 3555,
          totalTax: 2230,
          quankuTax: 6640,
          qukuTax: 4782
        }, {
          number: 10,
          streetName: '昌岗街',
          companyNum: 1566,
          totalTax: 2040,
          quankuTax: 5430,
          qukuTax: 5652
        }],
        info:{
          text:'',
          type:0
        },
        columnData2:[
          {prop: 'no',label: '排名', width:50},
          {prop: 'name',label: '街镇名称', width:100},
          {prop: 'company',label: '企业名称', width:200},
          {prop: 'output',label: '产值(亿元)', width:140},
          {prop: 'revenue',label: '税收(亿元)', width:140},
          {prop: 'operate',label: '操作', width: 'auto'},
        ],
        tableData2: [{
          no: 1,
          name: '琶洲街',
          company: '供通云供应链有限公司',
          output: '279.56',
          revenue: '0.70',
          operate: '查看详情'
        }, {
          no: 2,
          name: '昌岗街',
          company: '华南蓝天航空油科有限公司',
          output: '229.51',
          revenue: '3.30',
          operate: '查看详情'
        }, {
          no: 3,
          name: '赤岗街',
          company: '欧派家居集团股份有限公司',
          output: '61.26',
          revenue: '4.87',
          operate: '查看详情'
        }, {
          no: 4,
          name: '南洲街',
          company: '供通云供应链有限公司',
          output: '279.56',
          revenue: '0.70',
          operate: '查看详情'
        }, {
          no: 5,
          name: '龙凤街',
          company: '广州市臻垒贸易有限公司',
          output: '40.51',
          revenue: '0.01',
          operate: '查看详情'
        }, {
          no: 6,
          name: '海幢街',
          company: '广州欧派集成家居有限公司',
          output: '34.54',
          revenue: '2.88',
          operate: '查看详情'
        }, {
          no: 7,
          name: '南石头街',
          company: '广东庆丰汽车集团有限公司',
          output: '33.84',
          revenue: '0.00',
          operate: '查看详情'
        }, {
          no: 8,
          name: '江南中街',
          company: '广州南菱汽车股份有限公司',
          output: '30.74',
          revenue: '0.03',
          operate: '查看详情'
        }, {
          no: 9,
          name: '江海街',
          company: '广州易初莲花连锁超市有限公司',
          output: '27.09',
          revenue: '0.91',
          operate: '查看详情'
        }, {
          no: 10,
          name: '新港街',
          company: '广州奥的斯电梯有限公司',
          output: '24.23',
          revenue: '1.11',
          operate: '查看详情'
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
        industryService.getIndustryZoneData().then(result => {
          if (result && result.ZoneData != null && result.ZoneData != '') {
            this.$refs.map.mergeOption(result.ZoneData, this.resultData);
            self.mapData1 = result.ZoneData;
          }
        });
        industryService.getIndustrySeriesData().then(result => {
          this.$refs.zone.setChartOption(result, '产值');
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
