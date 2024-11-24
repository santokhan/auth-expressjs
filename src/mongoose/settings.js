import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_URL, DB_NAME } = process.env;

const connection_string = MONGO_URL + DB_NAME;

function connect_db() {
  mongoose
    .connect(connection_string)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
}

export default connect_db;
