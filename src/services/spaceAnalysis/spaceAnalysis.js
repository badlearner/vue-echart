import Base from '../base';
import axios from "axios";

class SpaceAnalysisService extends Base {

    constructor() {
        super();
    }
    /**查询条件中的行业数据**/
    getChooseInsutryData() {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('../../../mock/chooseIndustry.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/qyjjxxkz/ebdQyjbxxkz/getAllHydmInfo'));
    }
    /**产业类型**/
    getIndustryTypeData() {
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/sysZjSq/getIndustryTypeList'));
    }

    /**企业类型**/
    getCompanyTypeData(){
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/sysZjSq/getEnterpriseTypeList'));
    }
    /**街镇数据**/
    getStreetData() {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/street'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/qyjjxxkz/ebdQyjbxxkz/getAllJzInfo'));
    }
    /**年份时间段数据**/
    getYearData() {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode !== this.MOCK) {
                return this.processRequest(axios.get('mock/year'));
            }
        }
        //return this.processRequest(axios.get('/EnterpriseBigData/a/api/qyjjxxkz/ebdQyjbxxkz/getAllHydmInfo'));
    }
}
export default new SpaceAnalysisService();
