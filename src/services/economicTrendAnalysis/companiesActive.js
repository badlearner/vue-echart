import Base from '../base';
import axios from "axios";

class CompaniesActiveService extends Base {
    constructor() {
        super();
    }

    /**企业活跃度**/
    companiesActiveYearMap(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/companiesActive.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyhyd/getEnterpriseDistributesYear', {params: params}));
    }

    companiesActiveZombieMap(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/companiesActive.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyhyd/getEnterpriseDistributesZombie', {params: params}));
    }

    companiesActiveYearCompany(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/companiesActive.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyhyd/getYearCompany', {params: params}));
    }

    companiesActiveZombieCompany(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/companiesActive.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyhyd/getZombieCompany', {params: params}));
    }

    companiesActiveInvestmentInfoCompany(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/companiesActive.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyhyd/getInvestmentInfoCompany', {params: params}));
    }

    top5YearCompany(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/companiesActive.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyhyd/getTop5YearCompany', {params: params}));
    }

    top5ZombieCompany(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/companiesActive.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyhyd/getTop5ZombieCompany', {params: params}));
    }

    top5InvestmentInfoCompany(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/companiesActive.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyhyd/getTop5InvestmentInfoCompany', {params: params}));
    }
}

export default new CompaniesActiveService();