import excelToJson from 'convert-excel-to-json';
import { Ajax } from '../../request/ajax.js';
import dotenv from 'dotenv';
dotenv.config();

export class ExcelToJson {
    static async convertExcelToJson(req) {
        var body = req.body;
        if(!body){
            return {"msg": "invalid body"};
        }
        var path = body.path;
        // var sheetName = body.sheetName;
        // var map = body.map;
        var headerRow = body.headerRow;
        var collName = body.collectionName;

        if(!path || !collName){
            return {"msg": "invalid input parameters"};
        }
       
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

        // insert in bd
        var result = await ExcelToJson.insertExcelDataInDb(excelData.Folha1, collName);
        console.log("depois do psotRequest");
        return result.data;
    }

    static async insertExcelDataInDb(data, collName) {
        var body = {"data": data, "collectionName": collName };
        var db_ms_url = process.env.DB_MICROSERVICE;
        console.log("antes do postRequest");
        var result = await Ajax.postRequest(db_ms_url + '/insertJsonData', body);
        return result;
    }
};

