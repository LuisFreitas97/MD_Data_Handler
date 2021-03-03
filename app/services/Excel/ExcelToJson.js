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
        console.log("antes do retorno final");
        return result;
    }

    static async insertExcelDataInDb(data, collName) {
        var body = {"data": data, "collectionName": collName };
        var db_ms_url = process.env.DB_MICROSERVICE;
        var result;
        console.log("fora");
        await Ajax.postRequest(db_ms_url + '/insertJsonData', body,
        function(err,body){
            console.log("fora do sucesso");
            result = {"msg": err} 
        },function(body){
            console.log("dentro do sucesso");
            result = {"msg": body};
        });
        return result;
    }
};

