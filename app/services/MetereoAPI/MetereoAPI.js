import { Ajax } from '../../request/ajax.js';
import dotenv from 'dotenv';
dotenv.config();

export class MetereoAPI {
    static async saveMetereoData(req) {
        var body = req.body;
        if (!body) {
            return { "msg": "invalid body" };
        }

        var coord = body.coord;
        var vars = body.vars;

        if (!coord || !vars) {
            return { "msg": "invalid input parameters" };
        }

        //create a collection for json file
        var err;

        var body = { "data": data };
        var headers = {"auth": { "username": process.env.METEREO_USER, "password": process.env.METEREO_PASS }};
        await Ajax.postRequest(process.env.METEREO_API, body, headers, function (data) {

        }, function (error) {
            err = { 'msg': error.response.data, 'code': error.response.status };
        });
        if (err) {
            return err;
        } else {
            return { 'msg': 'data inserted', 'code': 201 };
        }
    }
};

