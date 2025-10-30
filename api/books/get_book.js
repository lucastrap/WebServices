const db_books = require("../../proxy/db_books");
const { booksCollectionUrl, bookUrl, extractVersion } = require('../../utils/hateoas');

module.exports = async (req, res) => {
  const version = extractVersion(req);
  const id = parseInt(req.params.id, 10);
  const book = await db_books.getById(id);

  if (!book) return res.status(404).json({ message: 'Not found' });

  const response = {
    id: book.id,
    title: book.title,
    author: book.author,
    _links: {
      self: { href: bookUrl(req, version, id) },
      collection: { href: booksCollectionUrl(req, version) }
    }
  };

  res.type('application/hal+json').json(response);
}