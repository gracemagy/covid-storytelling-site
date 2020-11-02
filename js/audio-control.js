var audio = document.getElementById("hsk-speech-audio");
var isPlaying = false;

function togglePlay() {
	isPlaying ? audio.pause() : audio.play();
};

audio.onplaying = function() {
	isPlaying = true;
	document.getElementById("audio-button").src = "images/pause.svg";
};
audio.onpause = function() {
	isPlaying = false;
	document.getElementById("audio-button").src = "images/speaker.svg";
};