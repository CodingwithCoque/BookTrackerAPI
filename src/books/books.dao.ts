import { Book } from "./books.model";
import { queries } from "./books.queries";
import pool from "../services/mysql.connection";

export const getAllBooks = async (): Promise<Book[]> => {
  const [rows] = await pool.query(queries.getAll);
  return rows as Book[];
};

export const getBookById = async (id: number): Promise<Book | null> => {
  const [rows] = await pool.query(queries.getById, [id]);
  const books = rows as Book[];
  return books[0] || null;
};

export const createBook = async (book: Book): Promise<void> => {
  const { title, author, genre, year_published } = book;
  await pool.query(queries.create, [title, author, genre, year_published]);
};

export const updateBook = async (id: number, book: Book): Promise<void> => {
  const { title, author, genre, year_published } = book;
  await pool.query(queries.update, [title, author, genre, year_published, id]);
};

export const deleteBook = async (id: number): Promise<void> => {
  await pool.query(queries.delete, [id]);
};
