
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

}).then( function(response)
{
    var image= response.background_image;
$(".game-name").html(response.name);
$(".game-genre").html(response.genres);
$(".game-price").html(response.stores[0].store.name);
$(".game-desc").html(response.description);
$(".game-date").html(response.released);

  // Load the IFrame Player API code asynchronously.
//   var tag = document.createElement('script');
//   tag.src = "https://www.youtube.com/player_api";
//   var firstScriptTag = document.getElementsByTagName('script')[0];
//   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  var player;
  function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
      height: '360',
      width: '640',
      videoId: response.clip.video,  
    });
    console.log(videoId);
  }

   // 4. The API will call this function when the video player is ready.
   function onPlayerReady(event) {
     event.target.playVideo();
   }

   // 5. The API calls this function when the player's state changes.
   //    The function indicates that when playing a video (state=1),
   //    the player should play for six seconds and then stop.
   var done = false;
   function onPlayerStateChange(event) {
     if (event.data == YT.PlayerState.PLAYING && !done) {
       setTimeout(stopVideo, 6000);
       done = true;
     }
   }
   function stopVideo() {
     player.stopVideo();
   }

});
});



