const axios = require('axios');

axios.get('http://localhost:3000/api/v1/books', {
  headers: { Origin: 'https://malicious-site.com' }
})
.then(res => console.log('Réponse:', res.data))
.catch(err => {
  if (err.response) {
    console.log('Erreur CORS:', err.response.status, err.response.data);
  } else {
    console.log('Erreur réseau:', err.message);
  }
});