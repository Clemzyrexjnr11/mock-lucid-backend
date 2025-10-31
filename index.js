import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { db } from "./models/db.js";
import router from "./routes/routes.js";
// import User from './models/users.js';

const port = 4800;
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

dotenv.config();

app.use("/", router);

app.listen(port, () => {
  console.log(`Running at port: ${port}`);
});
