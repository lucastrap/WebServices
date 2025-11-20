const express = require("express");
const app = express();
const { default: rateLimit } = require("express-rate-limit");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

app.use(express.json());

const limiters = {
  One_sec: rateLimit({ limit: 1, windowMs: 1000, message: "Trop de requêtes, réessayez plus tard !" }),
  Five_sec: rateLimit({ limit: 5, windowMs: 5000, message: "Bon, c'est long là."}),
};

const v1Router = require('../api/v1/routes');
const v2Router = require('../api/v2/routes');

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
app.use('/api/latest', v2Router);

app.get('/api', (req, res) => {
  res.json({
    links: [
      { rel: 'books', href: '/api/v2/books', method: 'GET' },
      { rel: 'books', href: '/api/v2/books', method: 'POST' },
      { rel: 'book', href: '/api/v2/books/{id}', method: 'GET' },
      { rel: 'book', href: '/api/v2/books/{id}', method: 'PUT' },
      { rel: 'book', href: '/api/v2/books/{id}', method: 'DELETE' }
    ],
    version: 'v2'
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
