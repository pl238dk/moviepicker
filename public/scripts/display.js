for (var i=0; i<stored.movie.length; i++){
	var img = document.createElement('img');
	img.src = "images/" + stored.movie[i];
	document.body.appendChild(img);
}
