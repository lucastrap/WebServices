const jwt = require('jsonwebtoken');

const SECRET_KEY = 'votre-secret-key-super-securisee';

const token = jwt.sign(
  { 
    user: 'admin',
    role: 'admin' 
  },
  SECRET_KEY,
  { expiresIn: '365d' } // Token valide 1 an
);

console.log('Voici ton token JWT:');
console.log(token);
