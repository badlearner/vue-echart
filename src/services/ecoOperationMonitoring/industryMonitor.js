'use strict';

import axios from 'axios';
import Base from '../base';

class IndustryMonitorService extends Base {
  constructor() {
    super();
  }

  /** 行业总体监测**/
  getEnterpriseDataByIndustry() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/getEnterpriseDataByIndustry'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/'));
  }

  /** 行业总体监测【地图】区域数据**/
  getIndustryZoneData() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/industryZoneData'));
      }
    }
    return null;
  }

  getIndustrySeriesData() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/industrySeriesData'));
      }
    }
    return null;
  }
  //规模以上工业
  getIndustryData() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/industryData'));
      }
    }
    return null;
  }
  //规模以上工业地图
  getIdustryMapData() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/idustryMapData'));
      }
    }
    return null;
  }
  //规模以上服务业
  getServerData() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/serviceData'));
      }
    }
    return null;
  }
  //规模以上服务业地图
  getServerMapData() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/serviceMapData'));
      }
    }
    return null;
  }
  //规模以上商业
  getBusinessData() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/businessData'));
      }
    }
    return null;
  }
  //规模以上商业地图
  getBusinessMapData() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/businessMapData'));
      }
    }
    return null;
  }
  //规模以上建筑业
  getBuildingData() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/buildingData'));
      }
    }
    return null;
  }
  //规模以上建筑业地图
  getBuildingMapData() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/buildingMapData'));
      }
    }
    return null;
  }
  //规模以上房地产业
  getRealEstateData() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/realEstateData'));
      }
    }
    return null;
  }
  //规模以上房地产业地图
  getRealEstateMapData() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/realEstateMapData'));
      }
    }
    return null;
  }
}
export default new IndustryMonitorService();
