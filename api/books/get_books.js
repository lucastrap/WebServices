const db_books = require("../../proxy/db_books");
const { booksCollectionUrl, bookUrl, extractVersion } = require('../../utils/hateoas');

module.exports = async (req, res) => {
  const version = extractVersion(req);
  const books = await db_books.getAll();

  const items = books.map(b => ({
    id: b.id,
    title: b.title,
    author: b.author,
    _links: {
      self: { href: bookUrl(req, version, b.id) }
    }
  }));

  const response = {
    _links: {
      self: { href: booksCollectionUrl(req, version) },
      create: { href: booksCollectionUrl(req, version), method: 'POST' }
    },
    count: items.length,
    _embedded: { books: items }
  };

  res.type('application/hal+json').json(response);
}