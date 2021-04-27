import express from 'express';
import { ExcelToJson } from '../services/Excel/ExcelToJson.js'
import asyncHandler  from 'express-async-handler';
import { uploadFile } from '../services/Excel/UploadExcel.js'
import { uploadJsonFile } from '../services/Json/UploadJson.js'
import { JsonHandler } from '../services/Json/JsonHandler.js'
import { WeatherAPI } from '../services/WeatherAPI/WeatherAPI.js'


export const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

router.post("/insertExcelData", asyncHandler(async (req, res, next) => {
  var result = await ExcelToJson.convertExcelToJson(req);
  res.json(result);
}));

//Upload excel/csv file
router.post("/uploadExcel", uploadFile.single("file"), asyncHandler(async (req, res, next) => {
  var result = await ExcelToJson.convertExcelToJson(req);
  res.status(result.code).json(result.msg);
}));

//Upload json file
router.post("/uploadJson", uploadJsonFile.single("file"), asyncHandler(async (req, res, next) => {
  var result = await JsonHandler.storeJson(req);
  res.status(result.code).json(result.msg);
}));

//Save weather data from API
router.post("/weatherData", asyncHandler(async (req, res, next) => {
  var result = await WeatherAPI.saveWeatherData(req);
  res.status(result.code).json(result.msg);
}));