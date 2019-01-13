import Base from '../base';
import axios from "axios";

class complaintsCaseAnalysis extends Base {

    constructor() {
        super();
    }
    /**投诉举报案件涉及金额展示**/
    getcomplaintsCaseSum(params) {
/*        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode !== this.MOCK) {*/
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/complaintsCaseAnalysis/complaintsCaseSum.json'));
/*            }
        }*/
        //return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTsjb/getRightTSJBJZCount', {params: params}));
    }
    /**投诉举报案件宗数展示**/
    getGoodsAndServerNum(params) {
/*        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode !== this.MOCK) {*/
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/complaintsCaseAnalysis/GoodsAndServerNum.json'));
/*            }
        }*/
        //return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTsjb/getRightTSJBJZCount', {params: params}));
    }
    /**统计汇总表数据**/
    getTotalTable(params) {
/*        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode !== this.MOCK) {*/
                return this.processRequest(axios.get('mock/marketManageOrderAnalysis/complaintsCaseAnalysis/totalTable.json'));
/*            }
        }*/
        //return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdTsjb/getRightTSJBJZCount', {params: params}));
    }
}
export default new complaintsCaseAnalysis();