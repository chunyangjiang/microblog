
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var util = require('util');

var app = express();


app.locals({
	inspect: function(obj){
		return util.inspect(obj, true);
	}
});

app.use(function(req, res, next){
	res.locals.headers = req.headers;
	next();
});


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/hello', routes.hello);
app.get('/list', function(req, res){
	res.render('list',{
		title: 'List',
		items: [1991, 'byvoid','express', 'node.js']
	});
});

app.get('/helper', function(req, res){
	res.render('helper', {
		title: 'Helpers'
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
