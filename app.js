import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect_db from "./src/mongoose/settings.js";
import * as auth from './src/routes/auth.js'

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

connect_db();

app.use(cors());
app.use(express.json());

app.use(auth.router);

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})