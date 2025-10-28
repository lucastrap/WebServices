const db_books = require("../../proxy/db_books");

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);
  res.json(await db_books.getById(id));
}