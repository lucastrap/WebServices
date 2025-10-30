// Routes pour l'API v1
const express = require('express');
const router = express.Router();


// Endpoints v1 RESTful pour books
const books = require('../../mockDB/books');

// GET /api/v1/books (pagination)
router.get('/books', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedBooks = books.slice(start, end);
  res.status(200).json({
    version: 'v1',
    books: paginatedBooks,
    meta: {
      total: books.length,
      page,
      limit
    }
  });
});

// GET /api/v1/books/:id
router.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.status(200).json(book);
});


// Middleware de validation
const { validateBookInput } = require('../../utils/validators');


router.post('/books', validateBookInput, (req, res) => {
  const newBook = { ...req.body, id: String(Date.now()) };
  books.push(newBook);
  res.status(201).json(newBook);
});

module.exports = router;
