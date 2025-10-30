function baseUrl(req) {
  const proto = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.headers['x-forwarded-host'] || req.get('host');
  return `${proto}://${host}`;
}

function extractVersion(req) {
  // Essaie d'extraire /api/vX/ depuis l'URL (originalUrl ou baseUrl)
  const url = req.originalUrl || req.url || '';
  const m = url.match(/\/api\/(v\d+)\b/);
  return m ? m[1] : 'v1';
}

function booksCollectionUrl(req, version) {
  const v = version || extractVersion(req);
  return `${baseUrl(req)}/api/${v}/books`;
}

function bookUrl(req, version, id) {
  const v = version || extractVersion(req);
  return `${baseUrl(req)}/api/${v}/books/${id}`;
}

module.exports = {
  baseUrl,
  extractVersion,
  booksCollectionUrl,
  bookUrl
};
