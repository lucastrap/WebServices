const db_books = require("../../proxy/db_books");

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const deletedBook = await db_books.deleteById(id);
    return(res.json({ message: "Livre supprimé", deleted: deletedBook[0] }));
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la suppression du livre" });
  }

}