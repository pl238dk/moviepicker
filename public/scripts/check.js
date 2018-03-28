var movies = document.getElementsByClassName('moviecheckbox');

// uncheck all movies prior to start
for (var i=0; i<movies.length; i++){
	movies[i].checked = 0;
}

// lazy check, doesn't work if only one movie is selected
for (var s=0; s<stored.movie.length; s++){
	for (var m=0; m<movies.length; m++){
		if (stored.movie[s].poster.indexOf(JSON.parse(movies[m].value).poster) > -1){
			movies[m].checked = 1;
			break;
		}
	}
}
