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
        var result;
        Object.keys(excelData).forEach(async function(key) {
            result = await ExcelToJson.insertExcelDataInDb(excelData[key], key);
        });

        // insert in bd
        //var result = await ExcelToJson.insertExcelDataInDb(excelData.Folha1, collName);
        //return result.data;
        return { "msg": "Data inserted with success", "code": 201 };
    }

    static async insertExcelDataInDb(data, collName) {
        var body = { "data": data, "collectionName": collName };
        var db_ms_url = process.env.DB_MICROSERVICE;
        var result = await Ajax.postRequest(db_ms_url + '/insertJsonData', body);
        return result;
    }
};

