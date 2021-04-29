import { Ajax } from '../../request/ajax.js';
import dotenv from 'dotenv';
// import FormData from "form-data";
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

        //create a collection for json file
        var err;

        // var body = { "coord": coord, "vars": vars };
        // var form = new FormData();
        // form.append('coord', coord);
        // form.append('vars', vars);

        var headers = { "auth": { "username": process.env.WEATHER_USER, "password": process.env.WEATHER_PASS }, "content-type": "application/x-www-form-urlencoded" };

        // var formDataHeaders = form.getHeaders(headers);

        // console.log(formDataHeaders);


        await Ajax.postRequest(process.env.WEATHER_API, qs.stringify(body), headers, function (data) {

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

