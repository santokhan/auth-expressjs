import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect_db from "./src/mongoose/settings.js";
import * as auth from './src/routes/auth.js'
import * as root from './src/routes/root.js'
import * as swagger from './src/routes/swagger.js'

dotenv.config();

const { PORT } = process.env;
if (!PORT) {
    throw new Error('PORT must be defined in environment variables')
}

const app = express();

connect_db();

app.use(cors());
app.use(express.json());

app.use(root.router);
app.use(auth.router);
app.use(swagger.router);

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
})