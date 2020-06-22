const musicBtn = document.querySelector('.button.music');
const songsContainer = document.querySelector('.songs-container');
const songs = document.querySelector('.songs');
const audioContainer = document.querySelector('.audio-container');
const audio = document.querySelector('.audio');
const audioSrc = document.querySelector('.audio > source');

const audioList = [
    {
        name: 'Nature Sounds',
        src: './assets/audio/nature-sounds.mp3'
    },
    {
        name: 'Anti Stress',
        src: './assets/audio/anti-stress-music.mp3'
    },
    {
        name: 'Memories',
        src: './assets/audio/memories.mp3'
    },
    {
        name: 'Namaste',
        src: './assets/audio/namaste.mp3'
    }
];

let showSongs = false;
musicBtn.addEventListener('click', () => {
    if (!showSongs) {
        // Show songs
        buildSongsHTML(audioList);
        audioContainer.style.opacity = '1';
    } else {
        // Hide songs
        removeSongsHTML();
        audioContainer.style.opacity = '0';
    }
});

songs.addEventListener('click', (e) => {
    if (e.target.dataset.src !== undefined) {
        playAudio(e.target.dataset.src)
    }
});

function playAudio(url) {
    const currentAudioSrc = audioSrc.getAttribute('src');

    if (url === 'noMusic') {
        return stopSong();
    }

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
    removeSongsHTML();
}

function stopSong() {
    audio.pause();
}

function buildSongsHTML(audioList) {
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
    showSongs = false;
    songs.innerHTML = '';
    songs.style.minHeight = '0';
    window.scrollTo(0, 0);
}
