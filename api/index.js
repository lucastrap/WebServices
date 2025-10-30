// Enregistre dynamiquement les routes books pour chaque version (v1, v2)
// Usage: require('./api/index')(app, limiters, requireAdminAccess)

module.exports = (app, limiters, requireAdminAccess) => {
	const bookroutes = {
		v1: {
			get: require('./v1/get_books'),
			post: require('./v1/post_book'),
			getBook: require('./v1/get_book')
		},
		v2: {
			get: require('./v2/get_books'),
			post: require('./v2/post_book'),
			getBook: require('./v2/get_book')
		}
	};

	// itérer sur chaque version et enregistrer les routes
	for (const version in bookroutes) {
		if (!Object.prototype.hasOwnProperty.call(bookroutes, version)) continue;
		const rc = bookroutes[version];
		const base = `/api/${version}/books`;

		// GET list
		if (rc.get) {
			app.get(base, limiters.One_sec, rc.get);
		}

		// POST create (protéger si middleware fourni)
		if (rc.post) {
			if (requireAdminAccess) {
				app.post(base, limiters.One_sec, requireAdminAccess, rc.post);
			} else {
				app.post(base, limiters.One_sec, rc.post);
			}
		}

		// GET by id (utilise limiter Five_sec)
		if (rc.getBook) {
			app.get(`${base}/:id`, limiters.Five_sec, rc.getBook);
		}
	}
};
