// Routes pour l'API v1
const express = require('express');
const router = express.Router();
/**


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

// POST /api/v1/books
router.post('/books', (req, res) => {
  /**
   * @swagger
   * /api/v1/books/{id}:
   *   get:
   *     summary: Obtenir un livre par id (v1)
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Livre
   *       404:
   *         description: Not found
   *   put:
   *     summary: Modifier un livre (v1)
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/BookInput'
   *     responses:
   *       200:
   *         description: Livre modifié
   *       404:
   *         description: Not found
   *   delete:
   *     summary: Supprimer un livre (v1)
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Livre supprimé
   *       404:
   *         description: Not found
   */
  // ...existing code...
