import Base from '../base';
import axios from "axios";

class ComplaintsAnalysis extends Base {

    constructor() {
        super();
    }

    /**投诉类案件宗数排名top8**/
    getComplaintsGoodsAndServerTop8(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/complaintsAnalysis/complaintsGoodsAndServerTop8.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTsjb/getLeftTSSPFWCount', {params: params}));
    }

    /**投诉举报宗数展示**/
    getcomplaintsReportingNum(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/complaintsAnalysis/complaintsReportingNum.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTsjb/getLeftTSJBZSCount', {params: params}));
    }

    /**投诉类举报类**/
    getComplaintsReporting(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/complaintsAnalysis/complaintsReporting.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTsjb/getLeftTSJBCount', {params: params}));
    }

    /**举报类案件宗数排名top8**/
    getReportingNumTop8(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/complaintsAnalysis/reportingNumTop8.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTsjb/getLeftJBAJCount', {params: params}));
    }

    /**投诉类内容以案件宗数排名top8**/
    getComplaintsNumTop8(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/complaintsAnalysis/complaintsNumTop8.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTsjb/getLeftTSAJCount', {params: params}));
    }

    /**投诉举报案件镇街分布**/
    getComplaintsSpace(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/complaintsAnalysis/complaintsSpace.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTsjb/getRightTSJBJZCount', {params: params}));
    }

    /**投诉类行业top10**/
    getComplaintsTop10(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/complaintsAnalysis/complaintsTop10.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTsjb/getDownTSHYCount', {params: params}));
    }

    /**举报类行业top10**/
    getReportingTop10(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/complaintsAnalysis/reportingTop10.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTsjb/getDownJBHYCount', {params: params}));
    }
}

export default new ComplaintsAnalysis();