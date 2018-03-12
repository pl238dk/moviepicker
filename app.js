var express = require('express');
var app = express();
var fs = require('fs');
var jade = require('jade');
var bodyParser = require('body-parser');

/* instantiate server */
var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;
});

/* default directory when server receives connections */
app.use('/',
	express.static(__dirname + '/public')
);

/* read POST data */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* set default directories for views and images */
app.set('views', __dirname + '/public/views');
app.set('images', __dirname + '/public/images');

/* jade/pug as templating engine */
app.set('view engine','jade');

/* when 'GET / http/1.1', read directory of posters and send to templating engine */
app.get('/', function(req, res){
	fs.readdir('posters', function(err, items){
		/* TODO : check Titles directory for supported chrome extensions (mp4/avi/mov) */
		/* TODO : better yet, get rid of all avi/mov/mkv/m4a and convert all stored movies to mp4, kthxbye */
		res.render('index',{ movies: items });
	});
});

/* when 'POST / http/1.1', write received data to variable inside 'stored.js' and repeat 'GET /' */
app.post('/', function(req, res){
	console.log(req.body);
	fs.writeFile(__dirname + '/public/scripts/stored.js',"var stored = " + JSON.stringify(req.body));
	fs.readdir('posters', function(err, items){
		res.render('index',{ movies: items });
	});
});
