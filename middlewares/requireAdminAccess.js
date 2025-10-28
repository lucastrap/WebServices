const jwt = require('jsonwebtoken');

const SECRET_KEY = 'votre-secret-key-super-securisee'; // À mettre dans .env en prod

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: "Token d'accès requis" });
  }
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};