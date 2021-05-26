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

        await Ajax.getRequest(process.env.DB_MICROSERVICE + '/drawAreas', {
            params: {
                keepOrder: true
            }}, function(data) {
                var drawAreas = data.data;

                if (drawAreas && drawAreas.length) {
                    drawAreas.forEach(function (value) {
                        //calculate centroid point 
                        center = polygonCenter(value.geometry);
                        center.BGRI11 = value.properties.BGRI11;
                        centers.push(center);
                        // Get weather data from API
                        apiBody.coord = center.coordinates[0] + "," + center.coordinates[1];
                        apiBody.vars = req.body.vars;
                        Ajax.postRequest(process.env.WEATHER_API, qs.stringify(apiBody), headers, function (data) {
                            data = JsonHelper.convertJson(data);
                            result = WeatherAPI.insertWeatherInDb(data,"weatherAPI");
                        }, function (error) {
                            // result = { 'msg': error.response.data, 'code': error.response.status };
                        });
                    });
                }
                result = { "msg": "success", "data": req.body, "code": 201 };
            }, function(error) {
                result = { 'msg': error.response.data, 'code': error.response.status };
            });
        return result;
    }
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

