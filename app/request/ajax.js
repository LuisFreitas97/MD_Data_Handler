import request from 'ajax-request';
import axios from 'axios';


export class Ajax {
    static async postRequest(url, data) {
        var result;
        await axios.post(url, data).then(response => {
            result = response;
            console.log("retorno do pedido");
        });
        return result;
    }

    static async getRequest(url) {
        var result;
        await axios.get(url).then(response => {
            result = response;
            console.log("retorno do pedido");
        });
        return result;
    }
    // static postRequest(url, data, error, success) {
    //     return request({
    //         url: url,
    //         method: 'POST',
    //         data: data
    //     }, function (err, res, body) {
    //         if(!err){
    //             success(body);
    //         }else{
    //             error(err,body);
    //         }
    //     });
    // }

    // static async getRequest(url, query) {
    //     var result;
    //     await request({
    //         url: url,
    //         method: 'GET',
    //         data: query
    //     }, function (err, res, body) {
    //         result = { "err": err, "body": body };
    //     });
    //     return result;
    // }
};

