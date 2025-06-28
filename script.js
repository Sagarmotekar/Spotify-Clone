console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/Ve Kamleya.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Ve Kamleya", filePath: "songs/Ve Kamleya.mp3", coverPath: "covers/1.jpg"},
    {songName: "Bulleya", filePath: "songs/bulleya.mp3", coverPath: "covers/2.jpg"},
    {songName: "Kabira", filePath: "songs/kabira.mp3", coverPath: "covers/3.jpg"},
    {songName: "Rang Sharbaton Ka", filePath: "songs/Rang Sharbaton ka.mp3", coverPath: "covers/4.jpg"},
    {songName: "Sajdaa", filePath: "songs/sajdaa.mp3", coverPath: "covers/5.jpg"},
    {songName: "Soch Na Sake", filePath: "songs/soch na sake.mp3", coverPath: "covers/6.jpg"},
    {songName: "Tera Hone Laga Hoon", filePath: "songs/Tera Hone Laga Hoon.mp3", coverPath: "covers/7.jpg"},
    {songName: "Tum Hi Ho", filePath: "songs/Tum Hi Ho.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tujhe Kitna Chahne Lage", filePath: "songs/tujhe kitna chahne lage.mp3", coverPath: "covers/9.jpg"},
    {songName: "Rabtaa", filePath: "songs/Rabtaa.mp3", coverPath: "covers/10.jpg"},
];

// Set cover images and song names in the list
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// Handle master play/pause
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Update progress bar as song plays
audioElement.addEventListener('timeupdate', () => { 
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
});

// Seek functionality
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset all play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Handle individual song play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

// Next song button
document.getElementById('next').addEventListener('click', () => {
    if(songIndex >= songs.length - 1){
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

// Previous song button
document.getElementById('previous').addEventListener('click', () => {
    if(songIndex <= 0){
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
