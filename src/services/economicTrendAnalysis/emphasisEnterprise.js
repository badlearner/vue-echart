import Base from '../base';
import axios from "axios";

class EmphasisEnterpriseService extends Base {

    constructor() {
        super();
    }

    /**重点企业**/
    getEmphasisEnterpriseValuableCompany(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/emphasisEnterprise.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyjbxxlsbg/getValuableCompany', {params: params}));
    }

    getEmphasisEnterpriseIabCompany(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/emphasisEnterprise.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyjbxxlsbg/getIabCompany', {params: params}));
    }

    getEmphasisEnterpriseNemCompany(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/emphasisEnterprise.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyjbxxlsbg/getNemCompany', {params: params}));
    }

    getEmphasisEnterpriseTop5nemCompany(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/emphasisEnterprise.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyjbxxlsbg/getTop5NemCompany', {params: params}));
    }

    getEmphasisEnterpriseTop5ibaCompany(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/emphasisEnterprise.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyjbxxlsbg/getTop5IabCompany', {params: params}));
    }

    getEmphasisEnterpriseTop5ValuableCompany(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/emphasisEnterprise.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyjbxxlsbg/getTop5ValuableCompany', {params: params}));
    }

    getEmphasisEnterpriseValuableMap(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/emphasisEnterprise.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyjbxxlsbg/getEnterpriseDistributesValuable', {params: params}));
    }

    getEmphasisEnterpriseNemMap(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/emphasisEnterprise.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyjbxxlsbg/getEnterpriseDistributesNEM', {params: params}));
    }

    getEmphasisEnterpriseIabMap(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/emphasisEnterprise.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyjbxxlsbg/getEnterpriseDistributesIAB', {params: params}));
    }

    /**企业列表接口**/
    getCompaniesData(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/emphasisEnterprise.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyjbxxlsbg/getBglsLeftQyListRecord', {params: params}));
    }

    /**企业列表总数接口**/
    getCompaniesTotalData(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/emphasisEnterprise.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyjbxxlsbg/getBglsQyListCnt', {params: params}));
    }
}

export default new EmphasisEnterpriseService();
