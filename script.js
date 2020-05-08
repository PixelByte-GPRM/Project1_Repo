
var searchTerm= "";
var title = "";
var newImage;
var newVideo;
var lastSearch= localStorage.getItem("term")
console.log(localStorage.getItem("term"))
$(".last-search").html("Your last search: "+localStorage.getItem("term"));
var input = document.getElementById("gameTitle");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("button-search").click();
  }
});

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$("#button-search").on("click", function(){

searchTerm =$("#gameTitle") .val() .trim(); 
localStorage.setItem("term",searchTerm);
console.log(searchTerm)  
searchTerm= searchTerm.replace(/\s+/g,'-').toLowerCase();
searchTerm= searchTerm.replace(":",'').toLowerCase();

newImage = $("<img>");
newVideo = $("<iframe>");

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
    console.log(response);
	console.log(settings.url);

}).then( function(response)
{
	$(".game-price").empty();
	$(".game-genre").empty();
	$(".image").remove();
	$(".videoImage").remove();

	var image= response.background_image;
	
$(".game-name").html(response.name);

$(".game-genre").html("Game Genre(s): | ");
for(var j=0; j<response.genres.length; j++)
{
	$(".game-genre").append(response.genres[j].name+ " | ");
}

$(".game-stores").html("Online Store(s): | ");
for(var i=0; i<response.stores.length; i++)
{
	$(".game-stores").append(response.stores[i].store.name + " | ");

	var link = $("<a>");
link.attr("href", response.stores[i].url);
link.text(response.stores[i].store.name);
link.addClass("link");
$(".game-buy-info").html("Price and reviews for the game:");
$(".game-price").html(link);

}

newImage.attr("src", image);
newImage.attr("class", "image");
newImage.attr("alt", "Image for the game");
newImage.attr("width", "400px");
newImage.attr("height", "300px");
$("#game-image").prepend(newImage);


$(".game-date").html("Release Date: "+response.released);
$(".game-desc").html("Description: "+response.description);

if((response.clip)!= null){
newVideo.attr("class", "videoImage")
$("#game-videos").show();
newVideo.attr("id", "ytplayer");
newVideo.attr("type", "text/html");
newVideo.attr("width", "400");
newVideo.attr("height", "300");
newVideo.attr("src", "https://www.youtube.com/embed/"+response.clip.video+"?enablejsapi=1&color=white");
$("#video-player").prepend(newVideo);
}
else{
	$("#game-videos").hide();
}
$(".game-esrb").html("ESRB rating: "+response.esrb_rating.name);
});
});
