const musicBtn = document.querySelector('.button.music');
const songsContainer = document.querySelector('.songs-container');
const songs = document.querySelector('.songs');
const audioContainer = document.querySelector('.audio-container');
const audio = document.querySelector('.audio');
const audioSrc = document.querySelector('.audio > source');
const audioContainerCssTransition = 300;
let showSongs = false;
let isSongPlaying = false;

const audioList = [
    {
        name: 'Nature Sounds',
        src: './assets/audio/nature-sounds.mp3'
    },
    {
        name: 'Our Future',
        src: './assets/audio/our-future.mp3'
    },
    {
        name: 'Anti Stress',
        src: './assets/audio/anti-stress-music.mp3'
    },
    {
        name: 'Memories',
        src: './assets/audio/memories.mp3'
    }
];

musicBtn.addEventListener('click', () => {
    if (!showSongs) {
        // Show songs
        buildSongsHTML(audioList);
    } else {
        // Hide songs
        removeSongsHTML();
    }
});

songs.addEventListener('click', (e) => {
    if (e.target.dataset.src !== undefined) {
        playAudio(e.target.dataset.src)
    }
});

function playAudio(url) {
    const currentAudioSrc = audioSrc.getAttribute('src');

    // First time is loaded
    if (currentAudioSrc === undefined) {
        playSong(url);
    } else if (currentAudioSrc !== url) {
        // If there was song playing stop and play the new one
        stopSong();
        playSong(url);
    }
}

function playSong(url) {
    audioSrc.setAttribute('src', url);
    audio.load();
    audio.play();
    isSongPlaying = true;
    removeSongsHTML();
}

function stopSong() {
    audio.pause();
    isSongPlaying = false;
}

function buildSongsHTML(audioList) {
    // Hide the audio controls if a song was playing
    if (isSongPlaying) {
        audioContainer.style.display = 'none';
    }
    showSongs = true;
    songs.style.minHeight = '40px';
    setTimeout(() => {
        audioList.forEach(audio => {
            songs.innerHTML += /*html */`
                <span data-src="${audio.src}">${audio.name}</span>
            `
        });
    }, 100);
}

function removeSongsHTML() {
    // Show the audio controls if a song was playing
    showSongs = false;
    songs.innerHTML = '';
    songs.style.minHeight = '0';
    setTimeout(() => {
        if (isSongPlaying) {
            audioContainer.style.display = 'block';
        }
    }, audioContainerCssTransition);
}
