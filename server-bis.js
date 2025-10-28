const express = require("express");
const app = express();
const PORT = 3000;
const bookRoutes = require("./api/books/routes");
const { default: rateLimit } = require("express-rate-limit");
// Middleware pour lire le JSON dans les requêtes (doit être avant les routes)
app.use(express.json());


const limiters = {
  One_sec: rateLimit({ limit: 1, windowMs: 1000, message: "Trop de requêtes, réessayez plus tard !" }),
  Five_sec: rateLimit({ limit: 5, windowMs: 5000, message: "Bon, c'est long là."}),
};
// Initialiser les routes pour les livres
bookRoutes(app, limiters);

function errorHandler(err, req, res, next) {
  console.error("Erreur:", err.stack);
  res.send('Something broke!' + err.message);
}
app.use(errorHandler);

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
});

process.on('unhandledRejection', (reason, promise) => { 
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

