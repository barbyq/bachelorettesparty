var Categorias = require('./categorias');
var Utils = require('./utils');

exports.get_index = function(db) {
	return function(req, res) {
		var is_en = Utils.get_lang(req);
		options = {
			db : db,
			is_en: is_en,
			res: res
		};
		Categorias.get_categorias(options, exports.render_index);
	};
};

exports.render_index = function(options){
	var is_en = options.is_en,
		array = options.array,
		res = options.res;

	res.render('index', {
		is_en: is_en,
		categorias: array
	});
};

exports.set_lang = function(req, res) {
	req.session.lang = req.params.lang;
	res.redirect('/');
};