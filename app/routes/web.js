import express from 'express';
import { ExcelToJson } from '../services/Excel/ExcelToJson.js'
import asyncHandler  from 'express-async-handler';

export const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

router.post("/insertExcelData", asyncHandler(async (req, res, next) => {
  var result = await ExcelToJson.convertExcelToJson(req);
  res.json(result);
}));