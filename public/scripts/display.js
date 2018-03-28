for (var i=0; i<stored.movie.length; i++){
	var img = document.createElement('img');
	img.class = "poster";
	//img.src = "images/" + stored.movie[i];
	img.src = "images/" + stored.movie[i].poster;
	img.id = stored.movie[i].file;
	document.getElementById('container').appendChild(img);
}
