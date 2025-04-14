export const queries = {
    getAll: "SELECT * FROM books",
    getById: "SELECT * FROM books WHERE id = ?",
    create: "INSERT INTO books (title, author, genre, year_published) VALUES (?, ?, ?, ?)",
    update: "UPDATE books SET title = ?, author = ?, genre = ?, year_published = ? WHERE id = ?",
    delete: "DELETE FROM books WHERE id = ?",
  };
  