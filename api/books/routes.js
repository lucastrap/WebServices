const get_books = require("./get_books");
const get_book = require("./get_book");
const post_book = require("./post_book");
const put_book = require("./put_book");
const delete_books = require("./delete_books");
const requireAdminAccess = require("../../middlewares/requireAdminAccess");


// Ce fichier est obsolète si la logique est migrée dans /api/v1/books et /api/v2/books
// À migrer ou supprimer après vérification de la duplication
module.exports = function (app, limiters) {
  // ...existing code...
};