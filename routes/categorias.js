var Utils = require('./utils');

exports.get_categorias = function(options, callback) {
	var db = options.db;
	var collection = db.get('categorias');
	var categorias = collection.find({}, {
			fields: {
				productos: 0
			},
			sort: {
				id: 1
			}
		},
		function(err, data) {
			var array = [];
			for (var key in data) {
				var nombre = data[key].nombre;
				var imagen = data[key].imagen;

				if (options.is_en) {
					nombre = data[key].name;
					imagen = data[key].image;
				}

				array.push({
					categoria: data[key].categoria,
					nombre: nombre,
					imagen: imagen
				});
			}
			array = JSON.parse(JSON.stringify(array));
			options.array = array;
			return callback(options);
		});
};


exports.get_by_categoria = function(db) {
	return function(req, res) {
		var titulo = null;
		var is_en = Utils.get_lang(req);
		var categoria_id = req.params.categoria;
		var collection = db.get('categorias');
		var categorias = collection.find({
			categoria: categoria_id
		}, {}, function(err, data) {
			if (err || data.length === 0) {
				res.send(err || "No se encuentra esa categoria.");
			} else {
				if (is_en) {
					titulo = data[0].name;
				}else{
					titulo = data[0].nombre;	
				}
				
				var options = {
					titulo: titulo,
					productos: data[0].productos,
					is_en: is_en,
					db: db,
					res: res, 
					categoria_id: categoria_id
				};
				exports.get_categorias(options, exports.render_by_categoria);
				
			}
		});
	};
};

exports.render_by_categoria = function(options){
	var res = options.res;
	res.render('productos', {
		titulo: options.titulo,
		productos: options.productos,
		is_en: options.is_en,
		categorias: options.array,
		categoria_id: options.categoria_id
	});
};