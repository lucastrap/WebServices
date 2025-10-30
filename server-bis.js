const express = require("express");
const app = express();
const PORT = 3000;
const { default: rateLimit } = require("express-rate-limit");
// const bookRoutes = require("./api/books/routes");
// const registerApi = require('./api/index');
const requireAdminAccess = require('./middlewares/requireAdminAccess');
// Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// Middleware pour lire le JSON dans les requêtes (doit être avant les routes)
app.use(express.json());

const limiters = {
  One_sec: rateLimit({ limit: 1, windowMs: 1000, message: "Trop de requêtes, réessayez plus tard !" }),
  Five_sec: rateLimit({ limit: 5, windowMs: 5000, message: "Bon, c'est long là."}),
};

const v1Router = require('./api/v1/routes');
const v2Router = require('./api/v2/routes');

// Versioning explicite
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
app.use('/api/latest', v2Router); // Alias vers la dernière version

// Endpoint HATEOAS /api
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

// Monter Swagger UI à /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Handler d'erreur désactivé (inutile si non défini)

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
});

process.on('unhandledRejection', (reason, promise) => { 
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

