# Modern Custom Video Player

A custom YouTube video player with a playlist, built with HTML, CSS, and JavaScript.

## Features

- Custom controls (play/pause, volume, seek, fullscreen)
- Playback speed (0.5x, 0.75x, 1x, 1.5x, 2x)
- Volume mute/unmute with slider
- Seek by clicking the progress bar
- Auto-hide controls while playing
- Playlist with thumbnail, title and channel
- Auto-play next video when one ends
- Keyboard shortcuts
- Responsive design

## Keyboard Shortcuts

| Key | Action |
| --- | --- |
| Space | Play / Pause |
| F | Fullscreen |
| M | Mute / Unmute |
| N | Next video |
| Arrow Right | Seek +5s |
| Arrow Left | Seek -5s |

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- YouTube IFrame Player API

## Files

- `index.html` - Page structure
- `style.css` - Styling
- `script.js` - Player logic
- `assets/subtitles.vtt` - Sample subtitles file

## How to Run

1. Make sure you have an internet connection (uses YouTube IFrame API and Font Awesome).
2. Open `index.html` in any modern browser.
3. No build step or dependencies required.

## Notes

- Videos are loaded from YouTube, so an internet connection is required.
- The playlist is defined in `script.js` and can be edited to add your own YouTube video IDs.