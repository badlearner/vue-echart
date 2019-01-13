'use strict';

import axios from 'axios';
import BaseService from './base';

class Service extends BaseService {
  /** 主页map迁入迁出**/
  getMapMain(params) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode === this.MOCK) {
        return this.processRequest(axios.get('mock/main.json'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTjSjzs/map', {params: params}));
  }

  /** 主页市场主体**/
  getMarketMainData(params) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode === this.MOCK) {
        return this.processRequest(axios.get('mock/main.json'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTjSjzs/market', {params: params}));
  }

  /** 主页市场主体echart**/
  getMarketMainEchartData(params) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode === this.MOCK) {
        return this.processRequest(axios.get('mock/main.json'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTjSjzs/cancellationOfEnterprise', {params: params}));
  }

  /** 主页重点企业**/
  getEmphasisData(params) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode === this.MOCK) {
        return this.processRequest(axios.get('mock/main.json'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTjSjzs/emphasisEnterprise', {params: params}));
  }

  /** 主页市场经营秩序**/
  getMarketRoleData(params) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode === this.MOCK) {
        return this.processRequest(axios.get('mock/main.json'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTjSjzs/marketBusinessOrder', {params: params}));
  }

  /** 主页企业活跃度**/
  getCompanyActiveData(params) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode === this.MOCK) {
        return this.processRequest(axios.get('mock/main.json'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTjSjzs/companiesActive', {params: params}));
  }

  /** 主页知识产权**/
  getIntellectualPropertyData(params) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode === this.MOCK) {
        return this.processRequest(axios.get('mock/main.json'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTjSjzs/intellectualProperty', {params: params}));
  }

  /** 主页经济资源**/
  getEcoResourceData(params) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode === this.MOCK) {
        return this.processRequest(axios.get('mock/main.json'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTjSjzs/economicResource', {params: params}));
  }

  /** 主页企业迁移统计**/
  getMainList(params) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode === this.MOCK) {
        return this.processRequest(axios.get('mock/mainList.json'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTjSjzs/moveInMoveOutEnterprise', {params: params}));
  }

  /** 主页迁移净流数据**/
  getBottomMigrateData(params) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode === this.MOCK) {
        return this.processRequest(axios.get('mock/mainList.json'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTjSjzs/enterpriseMoveInSort', {params: params}));
  }

  /** 查询条件中的行业数据**/
  getChooseInsutryData() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode === this.MOCK) {
        return this.processRequest(axios.get('mock/chooseIndustry.json'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/qyjjxxkz/ebdQyjbxxkz/getAllHydmInfo'));
  }

  /** 街镇名称坐标数据点**/
  getStreetPointData() {
    return axios.get('../../static/mapData/streetName.json');
  }

  /** 四上行业**/
  getTop4IndustryData() {
    return this.processRequest(axios.get('mock/top4Industry'));
  }

  /** 总体产值**/
  getTotalGDPData() {
    return this.processRequest(axios.get('mock/totalGDP'));
  }

  /** 总体税收**/
  getTotalTaxData() {
    return this.processRequest(axios.get('mock/totalTax'));
  }
}

export default new Service();
