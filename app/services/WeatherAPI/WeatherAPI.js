import { Ajax } from '../../request/ajax.js';
import dotenv from 'dotenv';
dotenv.config();

export class WeatherAPI {
    static async saveWeatherData(req) {
        var body = req.body;
        if (!body) {
            return { "msg": "invalid body" };
        }

        var coord = body.coord;
        var vars = body.vars;

        if (!coord || !vars) {
            return { "msg": "invalid input parameters" };
        }

        //create a collection for json file
        var err;

        var body = { "data": data };
        var headers = {"auth": { "username": process.env.WEATHER_USER, "password": process.env.WEATHER_PASS }};
        await Ajax.postRequest(process.env.WEATHER_API, body, headers, function (data) {

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

