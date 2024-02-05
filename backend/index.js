import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import bookRouter from "./routes/bookRoutes.js";
import cors from "cors";

const PORT = process.env.PORT;

const app = express();

//setup
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

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
