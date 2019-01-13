'use strict';

import axios from 'axios';
import BaseService from './base';

class Login extends BaseService {
    /**登陆页面**/
    postLogin(params) {
        return this.processRequest(axios.get('/EnterpriseBigData/a/api/bussiness/loginAuthentication/login', {params: params}));
    }
    /**跳转smart页面**/
    smartUrl(params) {
        return this.processRequest(axios.post('/EnterpriseBigData/a/login', params));
    }
}
export default new Login();