import Base from '../base';
import axios from "axios";

class InfoService extends Base {

    constructor() {
        super();
    }
    /**企业基本信息**/
    getCompanyInfoData(params) {
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyhx/getQyjbxxData', {params: params}));
    }
    /**企业标签和关联公司**/
    getCompanyLabel(params) {
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyhx/getQybqData', {params: params}));
    }
    /**企业数据展示-企业活跃度&& 趋势分析-企业活跃度**/
    getCompanyActive(params) {
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyhx/getQyhydData', {params: params}));
    }

    /**企业画像企业风险分析雷达图接口**/
    getCompanyRisk(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/companyRisk/companyRisk.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/result/ebdResultFxyj/getEjqzValue', {params: params}));
    }

    /**资源基本信息**/
    getResourceInfoData(params) {
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdZyhx/getQyjbxxData', {params: params}));
    }

    /**资源行业结构**/
    getResourceIndustrytructureData(params) {
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdZyhx/getHyData', {params: params}));
    }

    /**楼栋资源下的企业列表**/
    getResourceCompaniesData(params) {
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdZyhx/getQyData', {params: params}));
    }

    /**楼栋资源信息导出**/
    getResourceExportData(params) {
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdZyhx/getExportQyData', {params: params}));
    }

}
export default new InfoService();