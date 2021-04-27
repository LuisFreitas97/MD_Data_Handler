import excelToJson from 'convert-excel-to-json';
import { Ajax } from '../../request/ajax.js';
import dotenv from 'dotenv';
dotenv.config();

export class ExcelToJson {
    static async convertExcelToJson(req) {
        var body = req.body;
        if (!body) {
            return { "msg": "invalid body" };
        }
        // var path = body.path;
        var fileName = req.file.filename;
        // var sheetName = body.sheetName;
        // var map = body.map;
        var headerRow = body.headerRow;
        // var collName = body.collectionName;

        if (!fileName) {
            return { "msg": "invalid input parameters" };
        }

        var path = 'uploads/excel/' + fileName;

        var excelData = excelToJson({
            sourceFile: path,
            header: {
                rows: headerRow
            }
            // sheets: [{
            //     name: name,
            //     header: {
            //         rows: headerRow
            //     },
            //     columnToKey: map
            // }]
        });

        //return excelData;
        //create a collection peer sheet
        var err;
        var db_ms_url = process.env.DB_MICROSERVICE + '/insertJsonData';
        for (const property in excelData) {
            var body = { "data": excelData[property], "collectionName": property };
            await Ajax.postRequest(db_ms_url, body, {}, function (data) {

            }, function (error) {
                err = { 'msg': error.response.data, 'code': error.response.status };
            });
        }
        if (err) {
            return err;
        } else {
            return { 'msg': 'data inserted', 'code': 201 };
        }
    }
};

