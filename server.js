const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// Configuration swagger-jsdoc
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WebServices API',
            version: '1.0.0',
        },
        servers: [
            { url: 'http://localhost:3000' }
        ],
    },
    apis: ['./api/v1/routes.js', './api/v2/routes.js'], // fichiers à scanner
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI à /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const express = require('express');

const v1Router = require('./api/v1/routes');
const v2Router = require('./api/v2/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Versioning explicite
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
app.use('/api/latest', v2Router); // Alias vers la dernière version

// Endpoint HATEOAS /api
app.get('/api', (req, res) => {
    res.json({
        links: [
            { rel: 'books', href: '/api/v2/books', method: 'GET' },
            { rel: 'books', href: '/api/v2/books', method: 'POST' },
            { rel: 'book', href: '/api/v2/books/{id}', method: 'GET' },
            { rel: 'book', href: '/api/v2/books/{id}', method: 'PUT' },
            { rel: 'book', href: '/api/v2/books/{id}', method: 'DELETE' }
        ],
        version: 'v2'
    });
});

app.get('/', (req, res) => {
        res.send('Hello, world!');
});

app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
});