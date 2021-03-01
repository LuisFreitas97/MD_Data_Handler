import request from 'ajax-request';

export class Ajax {
    static async postRequest(url, data) {
        var result;
        await request({
            url: url,
            method: 'POST',
            data: data
        }, function (err, res, body) {
            result = { "err": err, "res": res, "body": body };
        });
        return result;
    }

    static async getRequest(url, query) {
        var result;
        await request({
            url: url,
            method: 'GET',
            data: query
        }, function (err, res, body) {
            result = { "err": err, "res": res, "body": body };
        });
        return result;
    }
};

