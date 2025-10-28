const dbBooks = require("../../proxy/db_books");

module.exports = async (req, res) => {
  const { title, author } = req.body;
  
  if (!title || !author) {
    return res.status(400).json({ message: "Titre et auteur sont requis." });
  }
  
  try {
    const newBook = await dbBooks.create({ title, author });
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};