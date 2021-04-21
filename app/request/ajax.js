import request from 'ajax-request';
import axios from 'axios';


export class Ajax {
    static async postRequest(url, data, headers={}, success, err) {
        var result;
        await axios.post(url, data, headers).then(response => {
            result = response;
            success(result.data);
        }).catch(error => {
            err(error);
        });
    }

    static async getRequest(url, success, err) {
        var result;
        await axios.get(url).then(response => {
            result = response;
            success(result.data);
        }).catch(error => {
            err(error);
        });
    }
};

