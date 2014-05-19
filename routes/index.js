var Categorias = require('./categorias');
var Utils = require('./utils');
var nodemailer = require("nodemailer");

exports.get_index = function(db) {
	return function(req, res) {
		var is_en = Utils.get_lang(req);
		options = {
			db: db,
			is_en: is_en,
			res: res
		};
		Categorias.get_categorias(options, exports.render_index);
	};
};

exports.render_index = function(options) {
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

exports.send_mail = function(req, res) {
	var first_name = req.body.nombre,
		last_name = req.body.apellido,
		email = req.body.email,
		body = req.body.mensaje;

	// create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport("SMTP", {
		service: "Gmail",
		auth: {
			user: "info@bachelorettesparty.com.mx",
			pass: "abril1990"
		}
	});

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: first_name + ' ' + last_name + '<' + email + '>', // sender address
		to: "info@bachelorettesparty.com.mx", // list of receivers
		subject: "Nuevo comentario", // Subject line
		text: body + 'Sent from: ' + first_name + ' ' + last_name+ ', email: ' + email,
		html: body + '<br><br>Sent from: ' + first_name + ' ' + last_name+ ', email: ' + email
	};

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent: " + response.message);
			res.send('success');
		}
		// if you don't want to use this transport object anymore, uncomment following line
		smtpTransport.close(); // shut down the connection pool, no more messages
	});

};