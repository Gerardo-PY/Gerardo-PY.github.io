let playpause_btn = document.querySelector('.playpause-track');
let copyright = document.querySelector('.copyAnio');
let wave = document.getElementById('wave');
let curr_track = document.createElement('audio');
let titleNowPlaying =document.getElementById('titleNowPlaying');
let songInfo = document.getElementById('song-info');

let track_index = 0;
let isPlaying = false;
let updateTimer;
let metadataInterval;

/*get year and copyrigth data*/ 
var anio;
anio = new Date().getFullYear();
document.getElementById("anio").innerHTML = "&copy " + anio + " | Radio Siete Villarrica";

const stream_list = [
    {
        //music : "https://s2.free-shoutcast.com/stream/18044/;"
        music: "https://glory-drove-modern-periodically.trycloudflare.com",
        mountPoint: "/stream"
    }
];

loadTrack(track_index);
showYear();

function loadTrack(track_index){
    clearInterval(updateTimer);

    curr_track.src = stream_list[track_index].music + stream_list[track_index].mountPoint;
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
    getNowPlaying();
    setInterval(getNowPlaying, 10000);
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    wave.classList.remove('loader');
    //playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    playpause_btn.innerHTML = '<i class="bi bi-play-circle"></i>';
    titleNowPlaying.textContent = "";
    songInfo.textContent = "";
}
function setVolume(){
    curr_track.volume = 1;
}
function showStatus(text) {
    document.getElementById("playing").innerHTML = text;
}

function getNowPlaying(){
    fetch(stream_list[0].music + "/status-json.xsl")
    .then(response => response.json())
    .then(data => {
        const title = data.icestats.source.title;
        titleNowPlaying.textContent = "Estás escuchando:";
        songInfo.textContent = formatSongTitle(title) || "Información de la canción no disponible";
    })
    .catch(error => {
        console.error("Error al obtener los metadatos:", error);
    });
}

function formatSongTitle(title){
    var accents = 'ÁÉÍÓÚáéíóú';
    var noAccents = 'AEIOUaeiou';
    for (var i = 0; i < accents.length; i++) {
        title = title.replace(new RegExp(accents[i], 'g'), noAccents[i]);
    }
    return title;
}
