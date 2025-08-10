import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import audioService from '../services/AudioService';

const GameContext = createContext();

const initialState = {
  // Game state
  puzzle: [1, 2, 3, 4, 5, 6, 7, 8, 0], // 0 represents empty tile
  isGameActive: false,
  time: 0,
  moves: 0,
  bestTime: null,
  bestMoves: null,
  isWon: false,
  
  // Settings
  music: true,
  soundEffects: true,
  haptics: true,
  musicVolume: 0.5, // Volume from 0 to 1
  theme: 'dark', // 'light' or 'dark'
  
  // Audio
  backgroundMusic: null,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PUZZLE':
      return { ...state, puzzle: action.payload };
    case 'SET_GAME_ACTIVE':
      return { ...state, isGameActive: action.payload };
    case 'SET_TIME':
      return { ...state, time: action.payload };
    case 'SET_MOVES':
      return { ...state, moves: action.payload };
    case 'INCREMENT_MOVES':
      return { ...state, moves: state.moves + 1 };
    case 'SET_BEST_TIME':
      return { ...state, bestTime: action.payload };
    case 'SET_BEST_MOVES':
      return { ...state, bestMoves: action.payload };
    case 'SET_WON':
      return { ...state, isWon: action.payload };
    case 'TOGGLE_MUSIC':
      return { ...state, music: !state.music };
    case 'TOGGLE_SOUND_EFFECTS':
      return { ...state, soundEffects: !state.soundEffects };
    case 'TOGGLE_HAPTICS':
      return { ...state, haptics: !state.haptics };
    case 'SET_MUSIC_VOLUME':
      return { ...state, musicVolume: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'RESET_GAME':
      return { 
        ...state, 
        puzzle: [1, 2, 3, 4, 5, 6, 7, 8, 0],
        isGameActive: false,
        time: 0,
        moves: 0,
        isWon: false
      };
    case 'SHUFFLE_PUZZLE':
      return { 
        ...state, 
        puzzle: action.payload,
        isGameActive: true,
        time: 0,
        moves: 0,
        isWon: false
      };
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Initialize audio service
  useEffect(() => {
    audioService.initialize();
    audioService.loadSoundEffects();
  }, []);

  // Load saved data on app start
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('gameData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          Object.keys(parsedData).forEach(key => {
            if (key === 'bestTime') {
              dispatch({ type: 'SET_BEST_TIME', payload: parsedData[key] });
            } else if (key === 'bestMoves') {
              dispatch({ type: 'SET_BEST_MOVES', payload: parsedData[key] });
            } else if (key === 'music') {
              if (!parsedData[key]) dispatch({ type: 'TOGGLE_MUSIC' });
            } else if (key === 'soundEffects') {
              if (!parsedData[key]) dispatch({ type: 'TOGGLE_SOUND_EFFECTS' });
            } else if (key === 'haptics') {
              if (!parsedData[key]) dispatch({ type: 'TOGGLE_HAPTICS' });
            } else if (key === 'theme') {
              dispatch({ type: 'SET_THEME', payload: parsedData[key] });
            } else if (key === 'musicVolume') {
              dispatch({ type: 'SET_MUSIC_VOLUME', payload: parsedData[key] });
            }
          });
        }
      } catch (error) {
        console.log('Error loading saved data:', error);
      }
    };
    loadSavedData();
  }, []);

  // Save data when it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        const dataToSave = {
          bestTime: state.bestTime,
          bestMoves: state.bestMoves,
          music: state.music,
          soundEffects: state.soundEffects,
          haptics: state.haptics,
          theme: state.theme,
          musicVolume: state.musicVolume,
        };
        await AsyncStorage.setItem('gameData', JSON.stringify(dataToSave));
      } catch (error) {
        console.log('Error saving data:', error);
      }
    };
    saveData();
  }, [state.bestTime, state.bestMoves, state.music, state.soundEffects, state.haptics, state.theme, state.musicVolume]);

  // Update audio service settings when they change
  useEffect(() => {
    console.log('Audio settings changed:', {
      music: state.music,
      soundEffects: state.soundEffects,
      haptics: state.haptics,
      musicVolume: state.musicVolume,
      hasBackgroundMusic: !!audioService.backgroundMusic
    });
    
    audioService.setMusicEnabled(state.music);
    audioService.setSoundEnabled(state.soundEffects);
    audioService.setHapticsEnabled(state.haptics);
    
    // Handle background music based on settings
    if (state.music && state.musicVolume > 0) {
      // Start background music if enabled and volume > 0
      if (!audioService.backgroundMusic) {
        console.log('Auto-starting background music');
        audioService.startBackgroundMusic();
      }
    } else {
      // Stop background music if disabled or volume is 0
      console.log('Stopping background music - disabled or volume 0');
      audioService.stopBackgroundMusic();
    }
  }, [state.music, state.soundEffects, state.haptics, state.musicVolume]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (state.isGameActive && !state.isWon) {
      interval = setInterval(() => {
        dispatch({ type: 'SET_TIME', payload: state.time + 1 });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.isGameActive, state.time, state.isWon]);

  // Check if puzzle is solved
  useEffect(() => {
    const isSolved = state.puzzle.every((tile, index) => {
      if (index === 8) return tile === 0; // Last tile should be empty
      return tile === index + 1;
    });

    if (isSolved && state.isGameActive && !state.isWon) {
      dispatch({ type: 'SET_WON', payload: true });
      dispatch({ type: 'SET_GAME_ACTIVE', payload: false });
      
      // Play win sound and haptic feedback
      audioService.playWinSound();
      audioService.playHapticFeedback('success');
      
      // Update best times
      if (!state.bestTime || state.time < state.bestTime) {
        dispatch({ type: 'SET_BEST_TIME', payload: state.time });
      }
      if (!state.bestMoves || state.moves < state.bestMoves) {
        dispatch({ type: 'SET_BEST_MOVES', payload: state.moves });
      }
    }
  }, [state.puzzle, state.isGameActive, state.time, state.moves, state.bestTime, state.bestMoves, state.isWon]);

  const shufflePuzzle = () => {
    const shuffled = [...state.puzzle];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    dispatch({ type: 'SHUFFLE_PUZZLE', payload: shuffled });
  };

  const moveTile = (index) => {
    if (!state.isGameActive || state.isWon) return;

    const emptyIndex = state.puzzle.indexOf(0);
    const canMove = (
      (index === emptyIndex - 1 && index % 3 !== 2) || // Right
      (index === emptyIndex + 1 && index % 3 !== 0) || // Left
      (index === emptyIndex - 3) || // Down
      (index === emptyIndex + 3) // Up
    );

    if (canMove) {
      const newPuzzle = [...state.puzzle];
      [newPuzzle[index], newPuzzle[emptyIndex]] = [newPuzzle[emptyIndex], newPuzzle[index]];
      dispatch({ type: 'SET_PUZZLE', payload: newPuzzle });
      dispatch({ type: 'INCREMENT_MOVES' });
      
      // Play tile move sound and haptic feedback
      audioService.playTileMoveSound();
      audioService.playHapticFeedback('light');
    }
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const toggleMusic = () => {
    const newMusicState = !state.music;
    console.log('Toggling music:', { from: state.music, to: newMusicState, volume: state.musicVolume });
    dispatch({ type: 'TOGGLE_MUSIC' });
    
    if (newMusicState) {
      // Music enabled - start background music if volume > 0
      if (state.musicVolume > 0) {
        console.log('Starting background music - enabled and volume > 0');
        audioService.startBackgroundMusic();
      } else {
        console.log('Music enabled but volume is 0');
      }
    } else {
      // Music disabled - stop background music immediately
      console.log('Disabling music - stopping background music');
      audioService.setMusicEnabled(false);
      audioService.stopBackgroundMusic();
    }
  };

  const toggleSoundEffects = () => {
    dispatch({ type: 'TOGGLE_SOUND_EFFECTS' });
  };

  const toggleHaptics = () => {
    dispatch({ type: 'TOGGLE_HAPTICS' });
  };

  const toggleTheme = () => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    dispatch({ type: 'SET_THEME', payload: newTheme });
  };

  const setMusicVolume = (volume) => {
    dispatch({ type: 'SET_MUSIC_VOLUME', payload: volume });
    audioService.setMusicVolume(volume);
    
    // Start background music if volume > 0 and music is enabled
    if (volume > 0 && state.music && !audioService.backgroundMusic) {
      audioService.startBackgroundMusic();
    }
    
    // Stop background music if volume is 0 and music is enabled
    if (volume === 0 && state.music) {
      audioService.stopBackgroundMusic();
    }
  };

  const resetBestTime = () => {
    dispatch({ type: 'SET_BEST_TIME', payload: null });
    dispatch({ type: 'SET_BEST_MOVES', payload: null });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const value = {
    ...state,
    shufflePuzzle,
    moveTile,
    resetGame,
    toggleMusic,
    toggleSoundEffects,
    toggleHaptics,
    toggleTheme,
    setMusicVolume,
    resetBestTime,
    formatTime,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
