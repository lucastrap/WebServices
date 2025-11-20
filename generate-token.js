const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'lemotdepassequifaitpeur';

const token = jwt.sign(
  { 
    user: 'admin',
    role: 'admin' 
  },
  SECRET_KEY,
  { expiresIn: '365d' } 
);

console.log('Voici ton token JWT:');
console.log(token);
