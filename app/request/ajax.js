import request from 'ajax-request';
import axios from 'axios';


export class Ajax {
    static async postRequest(url, data) {
        var result;
        await axios.post(url, data).then(response => {
            result = response;
        });
        return result;
    }

    static async getRequest(url) {
        var result;
        await axios.get(url).then(response => {
            result = response;
        });
        return result;
    }
};

