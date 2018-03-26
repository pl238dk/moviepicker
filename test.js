var g = require('glob');

var both = function(err, callback){
	var results = {'posters':[],'titles':[]};
	
	results['titles'] = g.sync('**/*.*', options={cwd:'titles'});
	results['posters'] = g.sync('*.jpg', options={cwd:'posters'});

	callback(results);
};

both(null, function(data){
	var combine = [];
	for (var i=0; i<data['posters'].length; i++){
		for (var j=0; j<data['titles'].length; j++){
			var t = data['titles'][j];
			var p = data['posters'][i]
			if (t.indexOf(p.split('.jpg')[0]) > -1){
				combine.push({'poster':p,'title':t});
			}
		}
	};
	console.log(combine);
});
