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
        var name = body.name;
        var map = body.map;
        var headerRow = body.headerRow;

        if(!path || !name || !map || !headerRow ){
            return {"msg": "invalid body parameters"};
        }
       
        var excelData = excelToJson({
            sourceFile: path,
            sheets: [{
                name: name,
                header: {
                    rows: headerRow
                },
                columnToKey: map
            }]
        });

        return excelData;

        // insert in bd
        return await this.insertExcelDataInDb(excelData, name);
    }

    static async insertExcelDataInDb(data, collName) {
        var body = {"data": data, "collectionName": collName };
        var db_ms_url = process.env.DB_MICROSERVICE;
        return await Ajax.postRequest(db_ms_url + '/insertJsonData', body);
    }
};

