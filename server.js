const express = require('express');

// /home/atm-hippolyte/Documents/Cours/M2/web_service/server.js

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});