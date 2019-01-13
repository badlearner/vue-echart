<template>
  <div>
    <div class="economic-nav-container">
      <div class="pull-left">
        <ul class="economic-rend-analysis-nav">
          <li v-for="page in analysisNavs" :class="{active: pageView === page.pageView}">
            <span  @click="onselectPage(page)" >{{ page.cnName }}</span>
            <div class="sub-menu" v-if="activeName===page.cnName">
              <span v-for="children in page.children" v-bind:key="children.cnName">
                <router-link :to="{path: children.to}">
                  {{ children.cnName }}
                </router-link>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="search-box">
        <ul class="search-bar">
          <li>
            <span>查询类型：</span>
            <select class="select" v-model="searchType">
              <option value="4">年</option>
              <!--<option value="3">半年</option>-->
              <!--<option value="2">季度</option>-->
              <option value="1">月</option>
            </select>
          </li>
          <li>
            <span>企业类型：</span>
            <select class="select" v-model="enterpriseType">
              <option value="0">全部</option>
              <option value="1">内资</option>
              <option value="2">外资</option>
            </select>
          </li>
          <li>
            <span>时间：</span>
            <el-date-picker v-model="startDate" :type="dataType" :value-format="format" :editable="false" :clearable="false" />
            <span>--</span>
            <el-date-picker v-model="endDate" :type="dataType" :value-format="format" :editable="false" :clearable="false" />
          </li>
          <li>
            <span>行业：</span>
            <a class="choose-insudtry" @click.stop="showIndustryContainer = !showIndustryContainer">行业选择</a>
            <i class="fa fa-unsorted" @click.stop="showIndustryContainer = !showIndustryContainer"
               aria-hidden="true"></i>
            <div class="choose-insudtry-container" v-show="showIndustryContainer"
                 @click.stop="showIndustryContainer = true">
              <ul>
                <li @click.stop="onselectIndutry(item)" v-for="item in industryData"
                    class="choose-insudtry-item" :class="{active: item.selected}">
                  <span>{{ item.HYMC }}</span>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="javascript:void(0);" class="btn btn-primary m-btn" @click="search()">
              <i aria-hidden="true" class="fa fa-search"></i>查询</a>
          </li>
        </ul>
      </div>
    </div>
    <router-view ref="routerView" class="economic-nav-content" :params="params"></router-view>
  </div>
</template>
<script>
  import service from '@/services/index';
  import * as types from '@/store/mutation-types';
  import localStorageUtil from '@/utils/localStorageUtil';
  export default {
    data() {
      return {
        industryType: null,
        industryData: null,
        showIndustryContainer: false,
        format:'yyyy',
        activeName: '总体监测',
        analysisNavs: [
          {
            pageView: '/MainIndex/ecoOperationMonitoring',
            to: '/MainIndex/ecoOperationMonitoring',
            cnName: '总体监测',
            children :[
              {
                pageView: '/MainIndex/ecoOperationMonitoring/totalMonitor/enterpriseGdp',
                to: '/MainIndex/ecoOperationMonitoring/totalMonitor/enterpriseGdp',
                cnName: '企业产值',
              },
              {
                pageView: '/MainIndex/ecoOperationMonitoring/totalMonitor/enterpriseTax',
                to: '/MainIndex/ecoOperationMonitoring/totalMonitor/enterpriseTax',
                cnName: '企业税收',
              },
              {
                pageView: '/MainIndex/ecoOperationMonitoring/totalMonitor/commonRevenue',
                to: '/MainIndex/ecoOperationMonitoring/totalMonitor/commonRevenue',
                cnName: '公共财政收入',
              },
              {
                pageView: '/MainIndex/ecoOperationMonitoring/totalMonitor/inputOutput',
                to: '/MainIndex/ecoOperationMonitoring/totalMonitor/inputOutput',
                cnName: '进出口总额',
              }
            ]
          },
          {
            pageView: '/MainIndex/ecoOperationMonitoring/industryMonitor',
            to: '/MainIndex/ecoOperationMonitoring/industryMonitor',
            cnName: '行业监测',
            children :[
              {
                pageView: '/MainIndex/ecoOperationMonitoring/industryMonitor',
                to: '/MainIndex/ecoOperationMonitoring/industryMonitor',
                cnName: '行业总体监测',
              },
              {
                pageView: '/MainIndex/ecoOperationMonitoring/industryMonitor/industry',
                to: '/MainIndex/ecoOperationMonitoring/industryMonitor/industry',
                cnName: '规模以上工业',
              },
              {
                pageView: '/MainIndex/ecoOperationMonitoring/industryMonitor/business',
                to: '/MainIndex/ecoOperationMonitoring/industryMonitor/business',
                cnName: '限额以上商业',
              },
              {
                pageView: '/MainIndex/ecoOperationMonitoring/industryMonitor/serviceIndustry',
                to: '/MainIndex/ecoOperationMonitoring/industryMonitor/serviceIndustry',
                cnName: '限额以上服务业',
              },
              {
                pageView: '/MainIndex/ecoOperationMonitoring/industryMonitor/buildingIndustry',
                to: '/MainIndex/ecoOperationMonitoring/industryMonitor/buildingIndustry',
                cnName: '资质以上建筑业',
              },
              {
                pageView: '/MainIndex/ecoOperationMonitoring/industryMonitor/realEstate',
                to: '/MainIndex/ecoOperationMonitoring/industryMonitor/realEstate',
                cnName: '房地产业',
              }]
          },
          {
            pageView: '/MainIndex/ecoOperationMonitoring/zoneMonitor',
            to: '/MainIndex/ecoOperationMonitoring/zoneMonitor',
            cnName: '园区监测',
            children :[
              {
                pageView: '/MainIndex/ecoOperationMonitoring/zoneMonitor/professionMarket',
                to: '/MainIndex/ecoOperationMonitoring/zoneMonitor/professionMarket',
                cnName: '专业市场监测',
              },
              {
                pageView: '/MainIndex/ecoOperationMonitoring/zoneMonitor/industrialArea',
                to: '/MainIndex/ecoOperationMonitoring/zoneMonitor/industrialArea',
                cnName: '工业园区监测',
              },
              {
                pageView: '/MainIndex/ecoOperationMonitoring/zoneMonitor/Incubator',
                to: '/MainIndex/ecoOperationMonitoring/zoneMonitor/Incubator',
                cnName: '孵化器监测',
              }]
          },
          {
            pageView: '/MainIndex/ecoOperationMonitoring/keyEnterpriseMonitor',
            to: '/MainIndex/ecoOperationMonitoring/keyEnterpriseMonitor',
            cnName: '重点企业监测',
            children :[]
          }
        ]
      }
    },
    computed: {
      pageView: {
        get() {
          let currentRouteName = this.$store.state.currentRouteName;
          if(currentRouteName.indexOf('industryMonitor')>-1){
             this.activeName='行业监测';
          }
          else if(currentRouteName.indexOf('zoneMonitor')>-1){
            this.activeName='园区监测';
          }
          else if(currentRouteName.indexOf('keyEnterpriseMonitor')>-1){
            this.activeName='重点企业监测';
          }else{
            this.activeName='总体监测';
          }
          return currentRouteName;
        },
        set() {
        }
      },
      startDate: {
        get() {
          return this.$store.state.search.startDate;
        },
        set(value) {
          if (this.dataType === 'year') {
            if(parseInt(value)>parseInt(this.endDate)){
              this.$message({
                showClose: true,
                type:'error',
                message:'开始时间不能晚于结束时间',
              });
              value='2012';
            }
          }else{
            if(parseInt(value.replace("-",""))>parseInt(this.endDate.replace("-",""))){
              this.$message({
                showClose: true,
                type:'error',
                message:'开始时间不能晚于结束时间',
              });
              value='';
            }
          }
          this.$store.commit(types.SET_SEARCH_START_DATE, value);
        }
      },
      endDate: {
        get() {
          return this.$store.state.search.endDate;
        },
        set(value) {
          if (this.dataType === 'year') {
            if (parseInt(value) < parseInt(this.startDate)) {
              this.$message({
                showClose: true,
                type: 'error',
                message: '结束时间不能早于开始时间',
              });
              value='2017';
            }
          }else{
            if(parseInt(value.replace("-",""))<parseInt(this.startDate.replace("-",""))){
              this.$message({
                showClose: true,
                type:'error',
                message:'结束时间不能早于开始时间',
              });
              value='';
            }
          }
          this.$store.commit(types.SET_SEARCH_END_DATE, value);
        }
      },
      enterpriseType: {
        get() {
          return this.$store.state.search.enterpriseType;
        },
        set(value) {
          this.$store.commit(types.SET_ENTERPRISE_TYPE, value);
        }
      },
      searchType: {
        get() {
          return this.$store.state.search.searchType;
        },
        set(value) {
          if(value==='4'){
            this.format='yyyy';
            this.$store.commit(types.SET_SEARCH_START_DATE, '2012');
            this.$store.commit(types.SET_SEARCH_END_DATE, '2017');
          }else{
            this.format='yyyy-MM';
            this.$store.commit(types.SET_SEARCH_START_DATE, '2012-01');
            this.$store.commit(types.SET_SEARCH_END_DATE, '2017-01');
          }
          this.$store.commit(types.SET_SEARCH_TYPE, value);
        }
      },
      dataType() {
        return this.searchType === '4' ? 'year' : 'month';
      },
      params() {
        return {
          startDate: this.startDate,
          endDate: this.endDate,
          searchType: this.searchType,
          enterpriseType: this.enterpriseType,
          industryType: this.industryType
        };
      }
    },
    methods: {
      search() {
        this.$refs.routerView.search();
      },
      onselectPage(page) {
        this.$router.push(page.to);
        this.activeName=page.cnName;
      },
      onselectIndutry(item) {
        let selecteds = [];
        item.selected = !item.selected;
        this.industryData.forEach(item => {
          item.selected && selecteds.push(item.HYDM);
        });

        this.industryType = selecteds.join(',');
      },
      closeIndustryContainer() {
        this.showIndustryContainer = false;
      }
    },
    mounted() {
      let INDUSTRY_DATA_KEY = 'INDUSTRY_DATA';

      let data = localStorageUtil.getItem(INDUSTRY_DATA_KEY);
      if (data) {
        this.industryData = data;
      } else {
        service.getChooseInsutryData().then(result => {
          localStorageUtil.setItem(INDUSTRY_DATA_KEY, result);
          this.industryData = result;
        })
      }

      document.addEventListener('click', this.closeIndustryContainer);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.closeIndustryContainer);
    }
  }
</script>
<style lang="less">
  .choose-insudtry {
    padding: 7px 25px 7px 5px;
    height: 32px;
    width: 80px;
    color: #858585;
    border: 1px solid #d5d5d5;
    cursor: pointer;
    border-radius: 3px;
    background: transparent;
    text-decoration: none !important;
  }

  .choose-insudtry-container {
    position: absolute;
    right: 0;
    margin-top: 4px;
    padding: 5px 5px 5px 20px;
    width: 260px;
    z-index: 9999;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);

    &::after {
      border: 8px solid transparent;
      border-bottom: 8px solid #fff;
      position: absolute;
      content: " ";
      top: 0;
      right: 30px;
      margin-top: -14px;
    }

    & > ul {
      margin: 0;
      padding: 0;
    }
  }

  .choose-insudtry-item {
    list-style: none;
    padding: 5px;
    line-height: 1.5;
    text-align: left;
    cursor: pointer;

    &.active {
      color: #51bcf0;
    }
  }

  .fa-unsorted {
    position: absolute;
    top: 50%;
    right: 8px;
    margin-top: -2px;
    color: #777;
  }

  .economic-nav-container {
    height: 42px;
    padding: 0 0 0 25px;
    font-size: 12px;
  }

  .economic-rend-analysis-nav {
    display: inline;
    list-style: none;

    & > li {
      position: relative;
      display: inline-block;
      margin: 0 6px;
      padding: 10px 0;
      color: #666;
      font-size: 13px;
      cursor: pointer;
    }

    & > li.active > span {
      padding-bottom: 12px;
      border-bottom: 2px solid #666;
    }
    & > li > .sub-menu {
      width: auto;
      display: inline;
      position: absolute;
      top: 36px;
      background: #fff;
      border: 1px solid #eee;
      box-shadow: 1px 1px 2px #ddd;
      z-index: 888;
    }
    & > li > .sub-menu a {
      color: #4d4d4d;
      padding: 8px 10px;
      white-space:nowrap;
    }
    & > li > .sub-menu a:active{
      font-weight: 600;
    }
  }

  .page-nav-title {
    padding: 8px 0 0 30px;
    font-size: 12px;
    color: #888;
  }

  .search-box {
    float: right;
    padding-right: 20px;
    font-size: 12px;
    line-height: 38px;
    text-align: right;
  }

  .search-bar {
    & > li {
      position: relative;
      list-style: none;
      float: left;
      height: 30px;
      margin-right: 5px;
    }

    & .el-input {
      width: 130px;

      & .el-input__inner {
        padding-right: 10px;
        height: 32px;
        font-size: 12px;
        border: 1px solid #d5d5d5;
        background: transparent;
      }
    }
  }

  .select {
    padding: 0 5px;
    height: 32px;
    width: 80px;
    color: #858585;
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    background: transparent;
  }

  .m-btn {
    position: relative;
    top: -1px;
    display: initial;
    padding: 6px 10px;
    font-size: 12px;
  }

</style>
