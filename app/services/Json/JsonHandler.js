import { Ajax } from '../../request/ajax.js';
import dotenv from 'dotenv';
import fs from "fs";

dotenv.config();

export class JsonHandler {
    static async storeJson(req) {
        var body = req.body;
        if (!body) {
            return { "msg": "invalid body", "code": 500 };
        }

        var fileName = req.file.filename;

        if (!fileName) {
            return { "msg": "invalid input parameters", "code": 500 };
        }

        var path = 'uploads/json/' + fileName;

        //create a collection for json file
        var err;
        var db_ms_url = process.env.DB_MICROSERVICE + '/insertJsonData';

        var data = JSON.parse(fs.readFileSync(path, 'utf8'));

        var body = { "data": data, "collectionName": 'property' };
        await Ajax.postRequest(db_ms_url, body, {}, function (data) {

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

