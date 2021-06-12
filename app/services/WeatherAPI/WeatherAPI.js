import { Ajax } from '../../request/ajax.js';
import dotenv from 'dotenv';
import qs from 'qs';
dotenv.config();
import { JsonHelper } from '../../Helpers/JsonHelper.js';
import polygonCenter from 'geojson-polygon-center';

export class WeatherAPI {
    static async saveWeatherData(req) {
        var result;
        var centers = [];
        var center = {};
        var apiBody = {};
        var headers = { "auth": { "username": process.env.WEATHER_USER, "password": process.env.WEATHER_PASS }, "content-type": "application/x-www-form-urlencoded" };
        var error = false;

        await Ajax.getRequest(process.env.DB_MICROSERVICE + '/drawAreas', {
            params: {
                keepOrder: true
            }
        }, async function (data) {
            var drawAreas = data.data;
            
            if (drawAreas && drawAreas.length) {
                // drawAreas.forEach(function (value) {
                    for(const value of drawAreas ){
                    //calculate centroid point 
                    center = polygonCenter(value.geometry);
                    center.BGRI11 = value.properties.BGRI11;
                    centers.push(center);
                    // Get weather data from API
                    apiBody.coord = center.coordinates[0] + "," + center.coordinates[1];
                    apiBody.vars = req.body.vars;
                    await Ajax.postRequest(process.env.WEATHER_API, qs.stringify(apiBody), headers, function (data) {
                        data.BGRI11 = center.BGRI11;
                        data = JsonHelper.convertJson(data);
                        WeatherAPI.insertWeatherInDb(data, "weatherAPI");
                    }, function (error) {
                        // result = { 'msg': error.response.data, 'code': error.response.status };
                    });
                };
            }
        }, function (error) {
            error = true;
        });
        if(error){
            result = { 'msg': "internal error", 'code': 500 };
        }else{
            result = { "msg": "success", "data": "success", "code": 201 };
        }
        return result;
    }

    // await Promise.all(files.map(async (file) => {
    //     const contents = await fs.readFile(file, 'utf8')
    //     console.log(contents)
    // }));
      
    static async insertWeatherInDb(data, collectionName) {
    var result;
    var db_ms_url = process.env.DB_MICROSERVICE + '/insertJsonData';
    var body = { "data": data, "collectionName": collectionName };

    await Ajax.postRequest(db_ms_url, body, {}, function (data) {
        result = { 'msg': data, 'code': 201 };
    }, function (error) {
        result = { 'msg': error.response.data, 'code': error.response.status };
    });
    return result;
}
};

