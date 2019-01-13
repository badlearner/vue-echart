import Base from '../base';
import axios from 'axios';

class MigrateAnalysisService extends Base {

    constructor() {
        super();
    }

    getEnterpriseMoveIn(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/main.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyqc/enterpriseMoveIn', {params: params}));
    }

    getEnterpriseMoveOut(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/main.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyqc/enterpriseMoveOut', {params: params}));
    }

    getMoveInEnterpriseTotalCapital(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/main.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyqc/moveInTotalCapitalForStreetRanking', {params: params}));
    }

    getMoveOutEnterpriseTotalCapital(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/main.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyqc/moveOutTotalCapitalForStreetRanking', {params: params}));
    }

    getMigrateRankings(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/main.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyqc/migrateRankings', {params: params}));
    }

    getMap(params) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.devMode === this.MOCK) {
                return this.processRequest(axios.get('mock/main.json'));
            }
        }
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/ebdQyqc/moveInAndOutEnterpriseDistributes', {params: params}));
    }
}

export default new MigrateAnalysisService();