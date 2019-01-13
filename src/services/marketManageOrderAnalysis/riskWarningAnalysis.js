import Base from '../base';
import axios from "axios";

class RiskWarningAnalysis extends Base {

    constructor() {
        super();
    }

    /**高风险**/
    gethighRiskData(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/riskWarningAnalysis/highRisk.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/result/ebdResultFxyj/HighRisk', {params: params}));
    }

    /**中等风险**/
    getmediumRiskData(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/riskWarningAnalysis/mediumRisk.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/result/ebdResultFxyj/MighRisk', {params: params}));
    }

    /**低风险**/
    getLowRiskData(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/riskWarningAnalysis/lowRisk.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/result/ebdResultFxyj/LighRisk', {params: params}));
    }

    /**行业低风险空间分布**/
    getLowRiskSpace(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/riskWarningAnalysis/lowRiskSpace.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/result/ebdResultFxyj/lowRiskSpace', {params: params}));
    }

    /**行业中等风险空间分布**/
    getMediumRiskSpace(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/riskWarningAnalysis/mediumRiskSpace.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/result/ebdResultFxyj/mediumRiskSpace', {params: params}));
    }

    /**行业高风险空间分布**/
    getHighRiskSpace(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/riskWarningAnalysis/highRiskSpace.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/result/ebdResultFxyj/highRiskSpace', {params: params}));
    }

    /**高风险企业行业排名top5**/
    getHighRiskIndustryTop5(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/riskWarningAnalysis/highRiskIndustryTop5.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/result/ebdResultFxyj/highRiskIndustryTop5', {params: params}));
    }

    /**高风险企业注册资本总额行业排名top5**/
    getHighRiskTotalCapitalTop5(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/riskWarningAnalysis/highRiskTotalCapitalTop5.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/result/ebdResultFxyj/highRiskTotalCapitalTop5', {params: params}));
    }
}

export default new RiskWarningAnalysis();