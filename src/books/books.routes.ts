import express, { Request, Response } from "express";

//Dummy test for postman
let books = [
  { id: 1, title: "The Flowers of Buffonery", author: "Osamu Dazai", year: 2024 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
];

const router = express.Router();

// GET all books
export const getAll = (req: Request, res: Response) => {
  res.json(books);
};

// GET a book by ID
export const getById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
};

// POST a new book
export const create = (req: Request, res: Response) => {
  const newBook = {
    id: books.length + 1,
    ...req.body,
  };
  books.push(newBook);
  res.status(201).json(newBook);
};

// PUT (update) a book by ID
export const update = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);
  if (index !== -1) {
    books[index] = { ...books[index], ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
};

// DELETE a book by ID
export const remove = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  books = books.filter((b) => b.id !== id);
  res.status(204).send();
};

// Connect routes to controller functions
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export { router };