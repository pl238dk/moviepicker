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
                                                                                                                 
