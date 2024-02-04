import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Post book
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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
router.patch("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

export default router;
