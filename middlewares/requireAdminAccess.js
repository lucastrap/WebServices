module.exports = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: "Token d'accès requis" });
  }
  
  // Vérification du token en dur
  if (token !== '2444666668888888') {
    return res.status(401).json({ message: "Token invalide" });
  }
  
  req.token = token;
  next();
};