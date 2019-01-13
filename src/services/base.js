'use strict';
import {Message} from 'element-ui';
export default class BaseService {

    constructor() {
        this.MOCK = 'mock';
        this.devMode = 'api';
    }


    processRequest(httpRuest) {
        return new Promise((resolve, reject) => {
            httpRuest.then(response => {
                if (response.status === 200 && response.data.status === 0) {
                    resolve(response.data.obj);
                } else if (response.status === 200 && response.data.status === 4) {
                    reject(response.data.message);
                }
            }, reason => {
                console.error(reason);
                Message({
                    showClose: true,
                    type:'error',
                    message:'服务异常!',
                });
                reject(requresFailed(reason));
            }).catch(reason => {
                console.error(reason);
                Message({
                    showClose: true,
                    type:'error',
                    message:'服务异常!',
                });
                reject(requresFailed(reason));
            })
        });
    }
}

const requresFailed = reason => {
    // alert('网络异常, 请稍后再试!');
    console.error(reason);

    return reason;
};