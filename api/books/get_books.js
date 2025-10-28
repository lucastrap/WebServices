const db_books = require("../../proxy/db_books");

module.exports = async (req, res) => {
  res.json(await db_books.getAll());
}