const fs = require('fs');
const yaml = require('js-yaml');

const swaggerJson = JSON.parse(fs.readFileSync('swagger.json', 'utf8'));
const yamlStr = yaml.dump(swaggerJson);

fs.writeFileSync('openapi.yaml', yamlStr, 'utf8');
console.log('Conversion terminée : openapi.yaml généré.');