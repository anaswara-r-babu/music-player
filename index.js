const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// song titles 
const songs = ['hey', 'summer' , 'ukulele'];

// keep track of songs 
let songIndex =2;

// initially load song details into DOM 
loadSong(songs[songIndex]);

// update song details 
function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;

}

// play song 
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();

}

// pause song 
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();

}

// prev song 
function prevSong(){
    songIndex--;
    if (songIndex < 0){
        songIndex=songs.length - 1;
    }
    loadSong(songs[songIndex]);

    playSong();
}

// prev song 
function nextSong(){
    songIndex++;
    if (songIndex > songs.length -1){
        songIndex= 0;
    }
    loadSong(songs[songIndex]);

    playSong();
}

// update progress bar
function updateProgress(e) {
    const { duration,currentTime } = e.srcElement;
    const progressPercent = (currentTime/duration)*100;
    progress.style.width = `${progressPercent}%`;   
}

// set preogress 
function setProgress(e) {
    const width=  this.clientWidth;
    const clickX=e.offsetX;
    const duration = audio.duration;
    audio.currentTime= (clickX / width) * duration;
}


// event listner 
playBtn.addEventListener('click',() => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    } else {
        playSong();
    }
});


// change song 
prev.addEventListener('click',prevSong);
next.addEventListener('click',nextSong);


// time/song update event
audio.addEventListener('timeupdate',updateProgress);

// click on progress bar
progressContainer.addEventListener('click',setProgress);

// song ends
audio.addEventListener('ended',nextSong);
























