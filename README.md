# Modern Custom Video Player

A modern, custom YouTube video player with a playlist, built with pure HTML, CSS, and JavaScript. It replaces YouTube's default controls with a clean, responsive UI and adds handy features like playback speed, keyboard shortcuts, and auto-play next.

## ✨ Features

- 🎬 YouTube IFrame Player API integration
- ▶️ Custom play/pause, seek, volume, and fullscreen controls
- 🔊 Volume mute/unmute with slider
- ⏩ Playback speed control (0.5x, 0.75x, 1x, 1.5x, 2x)
- 🖱️ Click on the progress bar to seek
- 🙈 Auto-hide controls while playing
- 📋 Playlist with thumbnail, title, and channel name
- ⏭️ Auto-play next video when one ends (and on error)
- ⌨️ Keyboard shortcuts for quick control
- 📱 Responsive design (16:9 aspect ratio)
- 🎨 Dark, modern UI

## ⌨️ Keyboard Shortcuts

| Key | Action |
| --- | --- |
| Space | Play / Pause |
| F | Toggle fullscreen |
| M | Mute / Unmute |
| N | Next video |
| → | Seek forward 5s |
| ← | Seek backward 5s |

## 🛠️ Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla / ES6)
- YouTube IFrame Player API
- Font Awesome (CDN)

## 📁 Project Structure

```
Video-Player/
├── index.html          # Page structure
├── style.css           # Styling
├── script.js           # Player logic
├── README.md           # Documentation
├── LICENSE             # MIT License
└── assets/
    └── subtitles.vtt  # Sample subtitles file
```

## 🚀 Getting Started

No build tools or dependencies are required.

1. Clone the repository:

   ```bash
   git clone https://github.com/codewithshariqofficial/Video-Player.git
   cd Video-Player
   ```

2. Open `index.html` in any modern browser.

   > An internet connection is required because the player uses the YouTube IFrame API and Font Awesome (CDN).

### Customizing the playlist

The playlist is defined in `script.js`. Edit the `playlist` array to add your own YouTube video IDs:

```js
const playlist = [
  { id: "VIDEO_ID", title: "Video Title", channel: "Channel Name" },
];
```

## 🌐 Live Demo

Not currently deployed. You can enable **GitHub Pages** (Settings → Pages → Deploy from `main` branch) to host it for free.

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

## 👤 Author

**Code With Shariq Official**

- GitHub: [@codewithshariqofficial](https://github.com/codewithshariqofficial)
- Email: shariq.shahid.official@gmail.com