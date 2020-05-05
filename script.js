
var searchTerm= "";
var title = "";
$("#button-search").on("click", function(){

searchTerm =$("#gameTitle") .val() .trim(); 
console.log(searchTerm)  
searchTerm= searchTerm.replace(/\s+/g,'-').toLowerCase();
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
}).then(); 
});
// var settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://rawg-video-games-database.p.rapidapi.com/developers/%7Bid%7D",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
// 		"x-rapidapi-key": "167c3ce9f6msh8d7bb8fbc6d5f58p16260djsn0fddb96bb0f5"
// 	}
// }

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });
