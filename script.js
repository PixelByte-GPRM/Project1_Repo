
var searchTerm= "";
var title = "";
var newImage;
var newVideo;
var steamID;

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

$(".game-price").html("Online Store(s): | ");
for(var i=0; i<response.stores.length; i++)
{
	$(".game-price").append(response.stores[i].store.name + " | ");
	if(response.stores[i].store.name== "Steam")
	{
		var steamLink= response.stores[i].url;
		console.log(steamLink);
		steamID= steamLink.slice( 34,-1);
		console.log(steamID);
	}
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



var steamSettings = {
    
	"url": "store.steampowered.com/appreviews/"+steamID+"?json=1",
	"method": "GET"	
}
console.log(steamSettings.url);
$.ajax({
	method: "GET",
	url:"https://store.steampowered.com/appreviews/"+steamID+"?json=1"
}).done(function (response) {
 console.log(response);

});



$(".game-esrb").html("ESRB rating: "+response.esrb_rating.name);
});
});