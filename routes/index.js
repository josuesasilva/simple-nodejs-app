module.exports = function(app) {
	var route = {};

	// index.html
	route.index = function (req, res) {
		res.render('index', {title: "Novo Teste!"});
	};

	app.get('/', route.index);
};