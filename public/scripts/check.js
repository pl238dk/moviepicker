var movies = document.getElementsByClassName('moviecheckbox');

// lazy check, doesn't work if only one movie is selected
if (stored.movie.length > 1){
	for (var i=0; i<movies.length; i++){
		if (stored.movie.indexOf(movies[i].value) > -1){
			movies[i].checked = 1;
		} else {
			movies[i].checked = 0;
		}
	}
} else {
	console.log("stored.movie not found or blank");
}
