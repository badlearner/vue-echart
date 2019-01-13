import Base from '../base';
import axios from "axios";

class MarketAnalysisService extends Base {

    constructor() {
        super();
    }

    getBusinessEnterprise(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketAnalysis.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdScztfx/businessEnterprise', {params: params}));
    }

    getCancelEnterprise(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketAnalysis.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdScztfx/calcelEnterprise', {params: params}));
    }

    getRegisterAmount(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/main.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdScztfx/registerAmountForStreetRanking', {params: params}));
    }

    getRegisterEnterprise(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/main.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdScztfx/registerEnterpriseForStreetRanking', {params: params}));
    }

    getEnterpriseDistributes(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/main.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdScztfx/enterpriseDistributes', {params: params}));
    }

    /**新增企业街镇分布**/
    getNewEnterpriseDistributes(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/main.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdScztfx/enterpriseDistributesXz', {params: params}));
    }

    getIndustryRankings(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/main.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdScztfx/industryRankings', {params: params}));
    }
}

export default new MarketAnalysisService();