import excelToJson from 'convert-excel-to-json';
import dotenv from 'dotenv';
dotenv.config();

export class ExcelToJson {
    static convertExcelToJson(path,name,map){
        var excelData = excelToJson({
            sourceFile: path,
            sheets: [{
                name: name,
                header: {
                    rows: 1
                },
                columnToKey: map
            }]
        });
        return excelData;
    }

    static insertExcelDataInDb(data){
        var db_ms_url = process.env.DB_MICROSERVICE;
        
    }
};

