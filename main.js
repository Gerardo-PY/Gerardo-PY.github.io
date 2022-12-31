let playpause_btn = document.querySelector('.playpause-track');
let copyright = document.querySelector('.copyAnio');
let wave = document.getElementById('wave');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let updateTimer;

/*get year and copyrigth data*/
var anio;
anio = new Date().getFullYear();
document.getElementById("anio").innerHTML = "&copy " + anio + " | Radio Siete Villarrica";

const stream_list = [
    {
        music : "http://freeuk27.listen2myradio.com:10914/;stream"
    }
];

loadTrack(track_index);
showYear();

function loadTrack(track_index){
    clearInterval(updateTimer);

    curr_track.src = stream_list[track_index].music;
    curr_track.load();
    setVolume();

    updateTimer = setInterval(setUpdate, 1000);
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
    sessionStorage.clear();
    localStorage.clear();
}

function playTrack(){
    curr_track.play();
    isPlaying = true;
    wave.classList.add('loader');
    //playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    playpause_btn.innerHTML = '<i class="bi bi-pause-circle"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    wave.classList.remove('loader');
    //playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    playpause_btn.innerHTML = '<i class="bi bi-play-circle"></i>';
}
function setVolume(){
    curr_track.volume = 100;
}
function showStatus(text) {
    document.getElementById("playing").innerHTML = text;
}
