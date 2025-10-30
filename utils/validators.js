
const Joi = require('joi');

// Sanitize une string (retire balises <script> et code potentiellement dangereux)
function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/<script.*?>.*?<\/script>/gi, '').replace(/[<>]/g, '');
}

// Schéma Joi pour un livre sécurisé
const bookSchema = Joi.object({
  title: Joi.string().min(1).max(100).required().custom((v) => sanitizeString(v)),
  author: Joi.string().min(1).max(100).required().custom((v) => sanitizeString(v)),
  preferences: Joi.object().pattern(/.*/, Joi.string().custom((v) => sanitizeString(v))).optional()
});

// Middleware de validation pour POST/PUT book
function validateBookInput(req, res, next) {
  const { error, value } = bookSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      error: 'Validation échouée',
      details: error.details.map(d => d.message)
    });
  }
  req.body = value;
  next();
}

// Validation d'un id
function validateBookId(req, res, next) {
  const id = req.params.id;
  if (!id || !/^[0-9a-fA-F]{1,24}$/.test(id)) {
    return res.status(400).json({ error: 'ID invalide' });
  }
  next();
}

module.exports = {
  sanitizeString,
  validateBookInput,
  validateBookId
};
