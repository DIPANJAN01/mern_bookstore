import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import bookRouter from "./routes/bookRoutes.js";

const PORT = process.env.PORT;

const app = express();

//setup

app.use(express.json());
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");
    if (!PORT) {
      throw Error("Undefined PORT");
    }
    app.listen(PORT, () => {
      console.log("Server started at Port:" + PORT);
    });
  })
  .catch(console.error);

app.use("/books", bookRouter);
