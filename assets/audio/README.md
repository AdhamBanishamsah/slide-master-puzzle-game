# Audio Files Directory

This directory contains audio files for the puzzle game.

## File Structure

```
assets/audio/
├── music/
│   └── background.mp3          # Background music (loop)
├── sounds/
│   ├── tile-move.mp3          # Sound when tile moves
│   ├── win.mp3                # Victory sound
│   ├── button-click.mp3       # Button press sound
│   └── shuffle.mp3            # Shuffle sound
└── README.md                  # This file
```

## Adding Custom Audio Files

1. **Background Music**: Place your background music file in `music/` folder
   - Recommended format: MP3
   - Recommended duration: 2-3 minutes (will loop)
   - Keep file size under 5MB

2. **Sound Effects**: Place sound effect files in `sounds/` folder
   - Recommended format: MP3 or WAV
   - Keep duration short (0.1-2 seconds)
   - Keep file size under 1MB each

## Current Implementation

The app currently uses programmatically generated beep sounds for:
- Tile movement
- Button clicks
- Victory celebration
- Shuffle action

To use actual audio files, update the `AudioService.js` file to load these files instead of generating beeps.

## Example Audio Files

You can download free audio files from:
- [Freesound.org](https://freesound.org/)
- [Zapsplat](https://www.zapsplat.com/)
- [OpenGameArt](https://opengameart.org/)

Make sure to check licensing requirements for any audio files you use.
