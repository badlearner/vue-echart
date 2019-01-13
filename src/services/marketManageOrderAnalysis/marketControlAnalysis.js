import Base from '../base';
import axios from "axios";

class MarketControlAnalysis extends Base {

    constructor() {
        super();
    }

    /**经营异常分析**/
    getBusinessException(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/marketControlAnalysis/businessException.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdJyycfs/getJyycfsData', {params: params}));
    }

    /**经营异常分析柱状图**/
    getBarLineBusinessExc(params){
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/marketControlAnalysis/businessExcBarLine.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdJyycfs/getYCCountForYear', {params: params}));
    }

    /**行政处罚分析**/
    getAdministrationPunishment(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/marketControlAnalysis/administrationPunishment.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdJyycfs/administrationPunishment', {params: params}));
    }

    /**经营异常空间分布**/
    getBusinessExcAnalysis(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/marketControlAnalysis/businessExcAnalysis.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdJyycfs/getJyyckjfbData', {params: params}));
    }

    /**行政处罚空间分布**/
    getAdministrationPunishmentAnalysis(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/marketControlAnalysis/administrationPunishmentAnalysis.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdJyycfs/administrationPunishmentDistribution', {params: params}));
    }

    /**经营异常行业排名TOP10**/
    getexcIndustryTop10(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/marketControlAnalysis/excIndustryTop10.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdJyycfs/getJyycTopNumData', {params: params}));
    }

    /**行政处罚行业排名TOP10**/
    getadministrationPunishmentTop10(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/marketControlAnalysis/administrationPunishmentTop10.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdJyycfs/administrationPunishmentTop10', {params: params}));
    }
}

export default new MarketControlAnalysis();