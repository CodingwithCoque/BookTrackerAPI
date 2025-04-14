import { Request, Response } from "express";
import * as BookDAO from "./books.dao";

export const getAll = async (req: Request, res: Response) => {
  const books = await BookDAO.getAllBooks();
  res.json(books);
};

export const getById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const book = await BookDAO.getBookById(id);
  if (book) res.json(book);
  else res.status(404).json({ message: "Book not found" });
};

export const create = async (req: Request, res: Response) => {
  const newBook = req.body;
  await BookDAO.createBook(newBook);
  res.status(201).json({ message: "Book created" });
};

export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedBook = req.body;
  await BookDAO.updateBook(id, updatedBook);
  res.json({ message: "Book updated" });
};

export const remove = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await BookDAO.deleteBook(id);
  res.json({ message: "Book deleted" });
};
