import express from 'express';
import cors from "cors";
import { router } from './app/routes/web.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/', router);

// set port, listen for requests
const PORT = process.env.SERVICE_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});