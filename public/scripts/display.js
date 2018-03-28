for (var i=0; i<stored.movie.length; i++){
	var img = document.createElement('img');
	img.class = "poster";
	//img.src = "images/" + stored.movie[i];
	img.src = "images/" + stored.movie[i].poster;
	img.id = stored.movie[i].file;
	img.addEventListener('click', function(){
		window.open(window.location.href + 'play/' + this.id, "_self")
	});
	document.getElementById('container').appendChild(img);
}
