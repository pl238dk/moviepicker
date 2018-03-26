var express = require('express');
var app = express();
var fs = require('fs');
var jade = require('jade');
var bodyParser = require('body-parser');
var glob = require('glob');

// instantiate server
var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;
});

// default directory when server receives connections
app.use('/',
	express.static(__dirname + '/public')
);

// set default directories for views and images
app.set('views', __dirname + '/public/views');
app.set('images', __dirname + '/public/images');

// jade/pug as templating engine
app.set('view engine','jade');

// ## MGMT ###################################### //

// read POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// when 'GET /mgmt http/1.1', read directory of posters and send to templating engine
app.get('/mgmt', function(req, res){
	fs.readdir('posters', function(err, items){
		// TODO : check Titles directory for supported chrome extensions (mp4/avi/mov)
		// TODO : better yet, get rid of all avi/mov/mkv/m4a and convert all stored movies to mp4, kthxbye
		res.render('mgmt',{ movies: items });
	});
});

// when 'POST /mgmt http/1.1', write received data to variable inside 'stored.js' and repeat 'GET /mgmt'
app.post('/mgmt', function(req, res){
	console.log(req.body);
	fs.writeFile(__dirname + '/public/scripts/stored.js',"var stored = " + JSON.stringify(req.body));
	fs.readdir('posters', function(err, items){
		res.render('mgmt',{ movies: items });
	});
});

// ## end MGMT ################################# //

var populateJSON = function(err, callback){
	var results = {'posters':[],'titles':[]};
	
	results['titles'] = glob.sync('**/*.*', options={cwd:'titles'});
	results['posters'] = glob.sync('*.jpg', options={cwd:'posters'});

	callback(results);
};

// when 'GET / http/1.1', display data from 'stored.js'
app.get('/', function(req, res){
	populateJSON(null, function(data){
		var combo = [];
		for (var i=0; i<data['posters'].length; i++){
			for (var j=0; j<data['titles'].length; j++){
				var t = data['titles'][j];
				var p = data['posters'][i]
				if (t.indexOf(p.split('.jpg')[0]) > -1){
					combine.push({'poster':p,'title':t});
				}
			}
		};
		res.render('index', { movies : combo });
	});
});
