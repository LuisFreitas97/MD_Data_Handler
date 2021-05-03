import { Ajax } from '../../request/ajax.js';
import dotenv from 'dotenv';
import qs from 'qs';
dotenv.config();

export class WeatherAPI {
    static async saveWeatherData(req) {
        var body = req.body;
        if (!body) {
            return { "msg": "invalid body", "code": 500 };
        }

        var coord = body.coord;
        var vars = body.vars;

        if (!coord || !vars) {
            return { "msg": "invalid input parameters", "code": 500 };
        }

        var result;
        var headers = { "auth": { "username": process.env.WEATHER_USER, "password": process.env.WEATHER_PASS }, "content-type": "application/x-www-form-urlencoded" };

        await Ajax.postRequest(process.env.WEATHER_API, qs.stringify(body), headers, function (data) {
            var array = [];
            array.push(data)
            result = WeatherAPI.insertWeatherInDb(array,"weatherAPI");
        }, function (error) {
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

