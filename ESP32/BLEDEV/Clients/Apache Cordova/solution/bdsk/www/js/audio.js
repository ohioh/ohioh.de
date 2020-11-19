var audio = {};
var media_object;
var playing_sound=0;

audio.play =function(audio_file) {
	console.log("audio.play("+audio_file+")");
	playing_sound=0;
    // Android requires a different format path to iOS
    var full_path = audio_file;
    if(device.platform.toLowerCase() === "android") {
        full_path = "/android_asset/www/" + audio_file;
    }
    media_object 
	  = new Media(full_path,
			// success callback
			function () {
				console.log("playAudio():Audio Success");
			},
			// error callback
			function (err) {
				console.log("playAudio():Audio Error: " + JSON.stringify(err));
			}
		);
    playing_sound=1;
    media_object.play();
}

audio.stop = function() {
	console.log("audio.stop() - playing_sound="+playing_sound);
    if (playing_sound == 1) {
		media_object.stop();
		playing_sound = 0;
	}
}
