/*Dependencies*/
var express = require('express');
var hbs = require('hbs');
var path = require('path');
var index = require('./routes');
var categorias = require('./routes/categorias');
var mongo = require('mongodb');
var monk = require('monk');
var env = process.env.NODE_ENV || 'dev';

var mongouri = 'mongodb://bach_barbara:barbara@ds039487.mongolab.com:39487/bachelorette';
if(env === 'dev'){
	mongouri = 'localhost:27017/bachelorette';
}
var db = monk(mongouri);


var app = express();

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.favicon(path.join(__dirname,'public/images/favicon.ico')));
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

/*needed for sessions*/
app.use(express.cookieParser());
app.use(express.session({secret: 'bachelorettepartymx'}));


/*Routes*/
app.get('/', index.get_index(db));
app.post('/contacto', index.send_mail);
app.get('/categorias/:categoria', categorias.get_by_categoria(db));

/*Lang*/
app.get('/:lang', index.set_lang);

var port = process.env.PORT || 5000;
app.listen(port, function(){
	console.log("Listening on port.." + port);
});