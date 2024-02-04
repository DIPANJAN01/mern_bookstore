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

//Post book
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

//Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).send({
      count: books.length,
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//Get a book by id
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send("Book with the given id not found!");
    }
    return res.status(200).send({ book });
  } catch (error) {
    console.log(error);

    res.status(500).send({ message: error.message });
  }
});

//Update book
app.patch("/books/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res
        .status(400)
        .send("Title, Author and PublishYear of book required!");
    }
    const updatedBook = { title, author, publishYear };
    const { id } = req.params;

    const savedBook = await Book.findByIdAndUpdate(id, updatedBook, {
      new: true,
    });
    if (!savedBook) {
      return res.status(404).send("Book with the given id not found!");
    }

    res.status(201).send(savedBook);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//Delete a book by id
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send("Book with the given id not found!");
    }
    return res.status(201).send("Book deleted successfully!");
  } catch (error) {
    console.log(error);

    res.status(500).send({ message: error.message });
  }
});
