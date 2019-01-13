'use strict';

import axios from 'axios';
import Base from '../base';

class EcoOperationMonService extends Base {
  constructor() {
    super();
  }

  /** 企业产值**/
  getEnterpriseGdp() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/enterpriseGdp'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/qyjjxxkz/ebdQyjbxxkz/getAllJzInfo'));
  }

  /** 企业税收**/
  getEnterpriseTax() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/enterpriseTax'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/qyjjxxkz/ebdQyjbxxkz/getAllJzInfo'));
  }

  /** 公共财政收入**/
  getCommonReveData() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/commonRevenue'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/qyjjxxkz/ebdQyjbxxkz/getAllJzInfo'));
  }

  /** 进出口总额**/
  getInputOutData() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.devMode !== this.MOCK) {
        return this.processRequest(axios.get('mock/inputOut'));
      }
    }
    return this.processRequest(axios.get('/EnterpriseBigData/a/api/qyjjxxkz/ebdQyjbxxkz/getAllJzInfo'));
  }
}
export default new EcoOperationMonService();
