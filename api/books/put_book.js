const dbBooks = require("../../proxy/db_books");

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  
  if (!title || !author) {
    return res.status(400).json({ message: "Titre et auteur sont requis." });
  }
  
  try {
    const updatedBook = await dbBooks.put(id, { title, author });
    res.json(updatedBook);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};