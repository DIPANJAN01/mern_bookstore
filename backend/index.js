import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import { Book } from "./models/bookModel.js";

const PORT = process.env.PORT;

const app = express();

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

app.post("/books", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res
        .status(400)
        .send("Title, Author and PublishYear of book required!");
    }
    const newBook = { title, author, publishYear };
    const savedBook = await Book.create(newBook);
    res.status(201).send(savedBook);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
