const get_books = require("./get_books");
const get_book = require("./get_book");
const post_book = require("./post_book");
const put_book = require("./put_book");
const delete_books = require("./delete_books");
const requireAdminAccess = require("../../middlewares/requireAdminAccess");

module.exports = function (app, limiters) {
  app.get("/api/books", limiters.One_sec, get_books);
  app.get("/api/books/:id", limiters.Five_sec, get_book);
  app.post("/api/books", limiters.One_sec, requireAdminAccess, post_book);
  app.put("/api/books/:id", limiters.One_sec, requireAdminAccess, put_book);
  app.delete("/api/books/:id", limiters.One_sec, requireAdminAccess, delete_books);
};