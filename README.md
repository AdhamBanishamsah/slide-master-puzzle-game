# Number Puzzle Game

A React Native sliding puzzle game with a modern dark theme, intuitive controls, and audio feedback.

## Features

- **3x3 Sliding Puzzle**: Classic number puzzle gameplay
- **Game Statistics**: Track time and moves
- **Best Records**: Save and display best times and moves
- **Settings**: Toggle music, sound effects, haptics, and theme
- **Audio System**: Background music and sound effects
- **Haptic Feedback**: Tactile feedback for interactions
- **Accessibility**: Full accessibility support with screen readers
- **Dark/Light Theme**: Modern UI with theme switching

## Screens

1. **Main Menu**: Play, Quick Play, How to Play, High Scores, and Settings options
2. **Game Screen**: Interactive puzzle grid with timer and move counter
3. **Settings**: Toggle switches for various game options
4. **How to Play**: Game instructions with visual icons
5. **High Scores**: Display best times and moves with statistics

## Audio System

The game includes a complete audio system with:

### **Sound Effects**
- **Tile Movement**: Beep sound when tiles are moved
- **Button Clicks**: Feedback when buttons are pressed
- **Victory**: Celebration sound when puzzle is solved
- **Shuffle**: Sound when puzzle is shuffled

### **Haptic Feedback**
- **Light**: For button presses and tile movements
- **Medium**: For shuffle and reset actions
- **Heavy**: For important actions
- **Success**: For winning the puzzle

### **Adding Custom Audio Files**

1. **Create the directory structure**:
   ```
   assets/audio/
   ├── music/
   │   └── background.mp3
   └── sounds/
       ├── tile-move.mp3
       ├── win.mp3
       ├── button-click.mp3
       └── shuffle.mp3
   ```

2. **Add your audio files** to the appropriate folders
3. **Update AudioService.js** to load your custom files instead of generating beeps

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Game Controls

- **Tap tiles** to move them into the empty space
- **Only adjacent tiles** can be moved
- **Restart** to reset the current puzzle
- **Shuffle** to randomize the puzzle
- **Track your progress** with time and move counters
- **Audio feedback** for all interactions

## Technologies Used

- React Native
- Expo
- React Navigation
- AsyncStorage for data persistence
- Expo Haptics for tactile feedback
- Expo AV for audio playback

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── GameButton.js
│   ├── PuzzleTile.js
│   ├── ToggleSwitch.js
│   └── WinningAnimation.js
├── context/            # Game state management
│   └── GameContext.js
├── screens/            # App screens
│   ├── MainMenuScreen.js
│   ├── GameScreen.js
│   ├── SettingsScreen.js
│   ├── HowToPlayScreen.js
│   └── HighScoreScreen.js
├── services/           # Audio and other services
│   └── AudioService.js
└── theme/              # Theme configuration
    └── theme.js

assets/
├── audio/              # Audio files
│   ├── music/
│   └── sounds/
└── README.md
```

## Audio File Sources

You can find free audio files at:
- [Freesound.org](https://freesound.org/)
- [Zapsplat](https://www.zapsplat.com/)
- [OpenGameArt](https://opengameart.org/)

Make sure to check licensing requirements for any audio files you use.

## License

MIT License
