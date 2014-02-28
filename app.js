
/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');

// db connection
var config = require('./config/config');
var mongoose = require('mongoose');
var db = mongoose.connect(config.db);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

app.configure('development', function() {
  app.use(express.logger('dev'));
  app.use(express.errorHandler({
    dumpExceptions: true , showStack: true
  }));
  app.set('view options', { pretty: true });
});

app.configure('test', function() {
  app.use(express.logger('test'));
  app.set('view options', { pretty: true });
});

app.configure('production', function() {
  app.use(express.logger());
  app.use(express.errorHandler());
});

// models
var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// routes
var routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(function(file) {
  require(routesPath + '/' + file)(app);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// expose app
exports = module.exports = app;	