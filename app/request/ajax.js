import request from 'ajax-request';


export class Ajax {
    static postRequest(url, data, error, success) {
        return request({
            url: url,
            method: 'POST',
            data: data
        }, function (err, res, body) {
            if(!err){
                success(body);
            }else{
                error(err,body);
            }
        });
    }

    static async getRequest(url, query) {
        var result;
        await request({
            url: url,
            method: 'GET',
            data: query
        }, function (err, res, body) {
            result = { "err": err, "body": body };
        });
        return result;
    }
};

