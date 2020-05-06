
var searchTerm= "";
var title = "";
var newImage;



$("#button-search").on("click", function(){

searchTerm =$("#gameTitle") .val() .trim(); 
console.log(searchTerm)  
searchTerm= searchTerm.replace(/\s+/g,'-').toLowerCase();
searchTerm= searchTerm.replace(":",'').toLowerCase();
newImage = $("<img>");

var settings = {
    
	"async": true,
	"crossDomain": true,
	"url": "https://rawg-video-games-database.p.rapidapi.com/games/"+searchTerm,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
		"x-rapidapi-key": "167c3ce9f6msh8d7bb8fbc6d5f58p16260djsn0fddb96bb0f5"
	}
}
$.ajax(settings).done(function (response) {

}).then( function(response)
{
	$(".game-price").empty();
	$(".game-genre").empty();
	$(".image").remove();

	var image= response.background_image;
	
$(".game-name").html(response.name);

$(".game-genre").html("Game Genre(s): | ");
for(var j=0; j<response.genres.length; j++)
{
	$(".game-genre").append(response.genres[j].name+ " | ");
}

$(".game-price").html("Online Store(s): | ");
for(var i=0; i<response.stores.length; i++)
{
	$(".game-price").append(response.stores[i].store.name + " | ");
}

newImage.attr("src", image);
newImage.attr("class", "image");
newImage.attr("alt", "Image for the game");
newImage.attr("width", "400px");
newImage.attr("height", "300px");
$("#game-image").prepend(newImage);


$(".game-date").html("Release Date: "+response.released);
$(".game-desc").html("Description: "+response.description);
$(".game-esrb").html("ESRB rating: "+response.esrb_rating.name);



});
});
