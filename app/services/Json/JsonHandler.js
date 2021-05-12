import { Ajax } from '../../request/ajax.js';
import dotenv from 'dotenv';
import fs from "fs";
import { JsonHelper } from '../../Helpers/JsonHelper.js';

dotenv.config();

export class JsonHandler {
    static async storeJson(req) {
        var body = req.body;
        if (!body) {
            return { "msg": "invalid body", "code": 500 };
        }

        var fileName = req.file.filename;
        var collectionName = body.name;

        if (!fileName || ! collectionName) {
            return { "msg": "invalid input parameters", "code": 500 };
        }

        var path = 'uploads/json/' + fileName;

        //create a collection for json file
        var db_ms_url = process.env.DB_MICROSERVICE + '/insertJsonData';

        var data = JSON.parse(fs.readFileSync(path, 'utf8'));

        data = JsonHelper.convertJson(data);

        if(!data){
            return { "msg": "invalid input parameters", "code": 500 };
        }

        var result;

        var body = { "data": data, "collectionName": collectionName };
        await Ajax.postRequest(db_ms_url, body, {}, function (data) {
            result = { 'msg': data, 'code': 201 };
        }, function (error) {
            result = { 'msg': error.response.data, 'code': error.response.status };
        });
        return result;
    }
};

