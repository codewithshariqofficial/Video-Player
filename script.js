const videoContainer = document.querySelector("#video-container");
const clickOverlay = videoContainer.querySelector(".video-click-overlay");
const playPauseBtn = videoContainer.querySelector(".play-pause i");
const volumeBtn = videoContainer.querySelector(".volume-btn i");
const volumeSlider = videoContainer.querySelector(".volume-slider");
const progressBar = videoContainer.querySelector(".progress-bar");
const progressArea = videoContainer.querySelector(".progress-area");
const currentTime = videoContainer.querySelector(".current-time");
const videoDuration = videoContainer.querySelector(".duration");
const speedBtn = videoContainer.querySelector(".speed-btn");
const speedOptions = videoContainer.querySelector(".speed-options");
const speedList = speedOptions.querySelectorAll("li");
const fullscreenBtn = videoContainer.querySelector(".fullscreen-btn i");
const playlistList = document.querySelector("#playlist-list");

const playlist = [
    { id: "PkZNo7MFNFg", title: "Learn JavaScript - Full Course for Beginners", channel: "freeCodeCamp.org" },
    { id: "pQN-pnXPaVg", title: "HTML Full Course - Build a Website Tutorial", channel: "freeCodeCamp.org" },
    { id: "1Rs2ND1ryYc", title: "CSS Tutorial - Zero to Hero (Complete Course)", channel: "freeCodeCamp.org" },
];

let player;
let currentIndex = 0;
let hideTimer;
let isPlaying = false;

const formatTime = (time) => {
    if (isNaN(time) || !isFinite(time) || time < 0) return "0:00";
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if (hours == 0) {
        return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
}

// Auto-hide controls while playing
const hideControls = () => {
    if (!isPlaying) return;
    hideTimer = setTimeout(() => {
        videoContainer.classList.remove("show-controls");
    }, 3000);
}

const showControls = () => {
    videoContainer.classList.add("show-controls");
    clearTimeout(hideTimer);
    hideControls();
}

videoContainer.addEventListener("mousemove", showControls);

// Build the playlist UI
const buildPlaylist = () => {
    playlist.forEach((video, index) => {
        const li = document.createElement("li");
        li.className = "playlist-item";
        li.dataset.index = index;
        li.innerHTML = `
            <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" alt="${video.title}">
            <div class="playlist-item-info">
                <div class="video-title">${video.title}</div>
                <div class="video-channel">${video.channel}</div>
            </div>
        `;
        li.addEventListener("click", () => loadVideo(index));
        playlistList.appendChild(li);
    });
    playlistList.children[currentIndex].classList.add("active");
}

const setActiveItem = (index) => {
    playlistList.querySelector(".active")?.classList.remove("active");
    playlistList.children[index].classList.add("active");
}

const loadVideo = (index) => {
    if (!player) return;
    currentIndex = index;
    setActiveItem(index);
    player.loadVideoById(playlist[index].id);
    isPlaying = true;
    playPauseBtn.className = "fas fa-pause";
    showControls();
}

const playNext = () => {
    loadVideo((currentIndex + 1) % playlist.length);
}

// Load the YouTube IFrame API
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

// Called by the API once it's ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player("youtube-player", {
        videoId: playlist[0].id,
        playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError,
        },
    });
}

const onPlayerReady = () => {
    videoDuration.innerText = formatTime(player.getDuration());
    volumeSlider.addEventListener("input", (e) => {
        const volume = e.target.value;
        player.setVolume(Math.round(volume * 100));
        if (volume == 0) {
            volumeBtn.className = "fas fa-volume-mute";
        } else if (volume < 0.5) {
            volumeBtn.className = "fas fa-volume-down";
        } else {
            volumeBtn.className = "fas fa-volume-up";
        }
    });
}

const onPlayerStateChange = (event) => {
    switch (event.data) {
        case YT.PlayerState.PLAYING:
            isPlaying = true;
            playPauseBtn.className = "fas fa-pause";
            showControls();
            break;
        case YT.PlayerState.PAUSED:
            isPlaying = false;
            playPauseBtn.className = "fas fa-play";
            clearTimeout(hideTimer);
            videoContainer.classList.add("show-controls");
            break;
        case YT.PlayerState.ENDED:
            isPlaying = false;
            playPauseBtn.className = "fas fa-play";
            playNext();
            break;
    }
}

const onPlayerError = () => {
    playNext();
}

// Play/Pause Logic
const togglePlay = () => {
    if (!player) return;
    if (isPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

playPauseBtn.parentElement.addEventListener("click", togglePlay);
clickOverlay.addEventListener("click", togglePlay);

// Video Progress and Timer
setInterval(() => {
    if (!player) return;
    const current = player.getCurrentTime();
    const duration = player.getDuration();
    if (duration > 0) {
        const percent = (current / duration) * 100;
        progressBar.style.width = `${percent}%`;
        currentTime.innerText = formatTime(current);
        videoDuration.innerText = formatTime(duration);
    }
}, 250);

// Seek Logic
progressArea.addEventListener("click", (e) => {
    let timelineWidth = progressArea.clientWidth;
    player.seekTo((e.offsetX / timelineWidth) * player.getDuration(), true);
});

// Volume Logic
volumeBtn.parentElement.addEventListener("click", () => {
    if (!player) return;
    if (player.isMuted()) {
        player.unMute();
        volumeSlider.value = player.getVolume() / 100;
        volumeBtn.className = "fas fa-volume-up";
    } else {
        player.mute();
        volumeBtn.className = "fas fa-volume-mute";
    }
});

// Playback Speed
speedBtn.addEventListener("click", () => {
    speedOptions.classList.toggle("show");
});

speedList.forEach(option => {
    option.addEventListener("click", () => {
        player.setPlaybackRate(parseFloat(option.dataset.speed));
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        speedBtn.innerText = `${option.dataset.speed}x`;
        speedOptions.classList.remove("show");
    });
});

document.addEventListener("click", (e) => {
    if (e.target.className !== "speed-btn" && e.target.tagName !== "LI") {
        speedOptions.classList.remove("show");
    }
});

// Fullscreen Logic
fullscreenBtn.parentElement.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
        fullscreenBtn.className = "fas fa-compress";
    } else {
        document.exitFullscreen();
        fullscreenBtn.className = "fas fa-expand";
    }
});

// Keyboard Shortcuts
document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key === " ") {
        e.preventDefault();
        togglePlay();
    } else if (key === "f") {
        fullscreenBtn.parentElement.click();
    } else if (key === "m") {
        volumeBtn.parentElement.click();
    } else if (key === "n") {
        playNext();
    } else if (key === "arrowright") {
        player.seekTo(player.getCurrentTime() + 5, true);
    } else if (key === "arrowleft") {
        player.seekTo(player.getCurrentTime() - 5, true);
    }
});

buildPlaylist();
