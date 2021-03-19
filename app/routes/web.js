import express from 'express';
import { ExcelToJson } from '../services/Excel/ExcelToJson.js'
import asyncHandler  from 'express-async-handler';
import { uploadFile } from '../services/Excel/UploadExcel.js'


export const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

router.post("/insertExcelData", asyncHandler(async (req, res, next) => {
  var result = await ExcelToJson.convertExcelToJson(req);
  res.json(result);
}));

// router.post("/upload", upload.single("file"), excelController.upload);
router.post("/upload", uploadFile.single("file"), function (req, res) {
  res.json(req.file.filename);
});