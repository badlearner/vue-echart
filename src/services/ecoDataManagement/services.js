'use strict';

import axios from 'axios';
import BaseService from '../base';

class EcoService extends BaseService {

  /** 套表管理-街镇数据**/
  getHaizhuStreetData() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode === this.MOCK) {
        return axios.get('api/tabledemo/GetStreetTowns');
      }
    }
    return axios.get('api/tabledemo/GetStreetTowns');
  }
  /** 套表管理-列表数据**/
  getTableListData(params) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode === this.MOCK) {
        return axios.get('api/tabledemo/GetExcelList', {params: params});
      }
    }
    return axios.get('api/tabledemo/GetExcelList', {params: params});
  }
  /** 套表管理-批量下载**/
  getDownData(params) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode === this.MOCK) {
        return axios({
          method:"post",
          headers:{
            'Content-type': 'application/x-www-form-urlencoded'
          },
          url:'api/tabledemo/NewExcelBatchGenerateFile',
          data:params
        });
      }
    }
    return axios({
      method:"post",
      headers:{
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url:'api/tabledemo/NewExcelBatchGenerateFile',
      data:params
    });
  }
  /** 套表管理-单个预览**/
  getLook(params) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode === this.MOCK) {
        return axios({
          method:"post",
          headers:{
            'Content-type': 'application/x-www-form-urlencoded'
          },
          url:'api/tabledemo/ExcelPreview',
          data:params
        });
      }
    }
    return axios({
      method:"post",
      headers:{
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url:'api/tabledemo/ExcelPreview',
      data:params
    });
  }
}
export default new EcoService();
