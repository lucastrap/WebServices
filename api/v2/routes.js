// Routes pour l'API v2
const express = require('express');
const router = express.Router();
const books = require('../../mockDB/books');


// Endpoints v2 RESTful pour books
// Amélioration : pagination, codes de statut, GET/POST/PUT/DELETE

// GET /api/v2/books (pagination)
router.get('/books', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedBooks = books.slice(start, end);
  res.status(200).json({
    version: 'v2',
    books: paginatedBooks,
    meta: {
      total: books.length,
      page,
      limit
    }
  });
});

// GET /api/v2/books/:id
router.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.status(200).json(book);
});

// POST /api/v2/books
router.post('/books', (req, res) => {
  const newBook = { ...req.body, id: String(Date.now()) };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /api/v2/books/:id
router.put('/books/:id', (req, res) => {
  const idx = books.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });
  books[idx] = { ...books[idx], ...req.body };
  res.status(200).json(books[idx]);
});

// DELETE /api/v2/books/:id
router.delete('/books/:id', (req, res) => {
  const idx = books.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });
  books.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;
