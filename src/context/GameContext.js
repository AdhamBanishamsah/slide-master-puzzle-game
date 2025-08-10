import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import audioService from '../services/AudioService';

const GameContext = createContext();

// Helper functions for different difficulty levels
const getInitialPuzzle = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return [1, 2, 3, 4, 5, 6, 7, 8, 0]; // 3x3
    case 'normal':
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]; // 4x4
    case 'hard':
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 0]; // 5x5
    default:
      return [1, 2, 3, 4, 5, 6, 7, 8, 0];
  }
};

const getGridSize = (difficulty) => {
  switch (difficulty) {
    case 'easy': return 3;
    case 'normal': return 4;
    case 'hard': return 5;
    default: return 3;
  }
};

const getSolvedPuzzle = (difficulty) => {
  return getInitialPuzzle(difficulty);
};

const initialState = {
  // Game state
  puzzle: [1, 2, 3, 4, 5, 6, 7, 8, 0], // 0 represents empty tile
  isGameActive: false,
  time: 0,
  moves: 0,
  bestTime: null,
  bestMoves: null,
  isWon: false,
  
  // High scores for each difficulty
  highScores: {
    easy: { bestTime: null, bestMoves: null },
    normal: { bestTime: null, bestMoves: null },
    hard: { bestTime: null, bestMoves: null },
  },
  
  // Settings
  music: false,
  soundEffects: true,
  haptics: true,
  musicVolume: 0.5, // Volume from 0 to 1
  theme: 'dark', // 'light' or 'dark'
  difficulty: 'easy', // 'easy' (3x3), 'normal' (4x4), 'hard' (5x5)
  
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
    case 'SET_DIFFICULTY_BEST_TIME':
      return { 
        ...state, 
        highScores: {
          ...state.highScores,
          [action.payload.difficulty]: {
            ...state.highScores[action.payload.difficulty],
            bestTime: action.payload.time
          }
        }
      };
    case 'SET_DIFFICULTY_BEST_MOVES':
      return { 
        ...state, 
        highScores: {
          ...state.highScores,
          [action.payload.difficulty]: {
            ...state.highScores[action.payload.difficulty],
            bestMoves: action.payload.moves
          }
        }
      };
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
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload };
    case 'RESET_GAME':
      return { 
        ...state, 
        puzzle: getInitialPuzzle(state.difficulty),
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
            } else if (key === 'highScores') {
              // Load high scores for each difficulty
              Object.keys(parsedData[key]).forEach(difficulty => {
                const scores = parsedData[key][difficulty];
                if (scores.bestTime) {
                  dispatch({ 
                    type: 'SET_DIFFICULTY_BEST_TIME', 
                    payload: { difficulty, time: scores.bestTime }
                  });
                }
                if (scores.bestMoves) {
                  dispatch({ 
                    type: 'SET_DIFFICULTY_BEST_MOVES', 
                    payload: { difficulty, moves: scores.bestMoves }
                  });
                }
              });
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
            } else if (key === 'difficulty') {
              dispatch({ type: 'SET_DIFFICULTY', payload: parsedData[key] });
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
          highScores: state.highScores,
          music: state.music,
          soundEffects: state.soundEffects,
          haptics: state.haptics,
          theme: state.theme,
          musicVolume: state.musicVolume,
          difficulty: state.difficulty,
        };
        await AsyncStorage.setItem('gameData', JSON.stringify(dataToSave));
      } catch (error) {
        console.log('Error saving data:', error);
      }
    };
    saveData();
  }, [state.bestTime, state.bestMoves, state.highScores, state.music, state.soundEffects, state.haptics, state.theme, state.musicVolume, state.difficulty]);

  // Update audio service settings when they change
  useEffect(() => {
    audioService.setMusicEnabled(state.music);
    audioService.setSoundEnabled(state.soundEffects);
    audioService.setHapticsEnabled(state.haptics);
    
    // Handle background music based on settings
    if (state.music && state.musicVolume > 0) {
      // Start background music if enabled and volume > 0
      if (!audioService.backgroundMusic) {
        audioService.startBackgroundMusic();
      }
    } else {
      // Stop background music if disabled or volume is 0
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
    const solvedPuzzle = getSolvedPuzzle(state.difficulty);
    const isSolved = state.puzzle.every((tile, index) => {
      return tile === solvedPuzzle[index];
    });

    if (isSolved && state.isGameActive && !state.isWon) {
      dispatch({ type: 'SET_WON', payload: true });
      dispatch({ type: 'SET_GAME_ACTIVE', payload: false });
      
      // Play win sound and haptic feedback
      audioService.playWinSound();
      audioService.playHapticFeedback('success');
      
      // Update best times for current difficulty
      const currentDifficultyScores = state.highScores[state.difficulty];
      if (!currentDifficultyScores.bestTime || state.time < currentDifficultyScores.bestTime) {
        dispatch({ 
          type: 'SET_DIFFICULTY_BEST_TIME', 
          payload: { difficulty: state.difficulty, time: state.time }
        });
      }
      if (!currentDifficultyScores.bestMoves || state.moves < currentDifficultyScores.bestMoves) {
        dispatch({ 
          type: 'SET_DIFFICULTY_BEST_MOVES', 
          payload: { difficulty: state.difficulty, moves: state.moves }
        });
      }
    }
  }, [state.puzzle, state.isGameActive, state.time, state.moves, state.bestTime, state.bestMoves, state.isWon]);

  const shufflePuzzle = () => {
    const shuffled = [...getInitialPuzzle(state.difficulty)];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    dispatch({ type: 'SHUFFLE_PUZZLE', payload: shuffled });
  };

  const moveTile = (index) => {
    if (!state.isGameActive || state.isWon) return;

    const gridSize = getGridSize(state.difficulty);
    const emptyIndex = state.puzzle.indexOf(0);
    const canMove = (
      (index === emptyIndex - 1 && index % gridSize !== gridSize - 1) || // Right
      (index === emptyIndex + 1 && index % gridSize !== 0) || // Left
      (index === emptyIndex - gridSize) || // Down
      (index === emptyIndex + gridSize) // Up
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
    dispatch({ type: 'TOGGLE_MUSIC' });
    
    if (newMusicState) {
      // Music enabled - start background music if volume > 0
      if (state.musicVolume > 0) {
        audioService.startBackgroundMusic();
      }
    } else {
      // Music disabled - stop background music immediately
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
    // Reset high scores for all difficulties
    ['easy', 'normal', 'hard'].forEach(difficulty => {
      dispatch({ 
        type: 'SET_DIFFICULTY_BEST_TIME', 
        payload: { difficulty, time: null }
      });
      dispatch({ 
        type: 'SET_DIFFICULTY_BEST_MOVES', 
        payload: { difficulty, moves: null }
      });
    });
  };

  const setDifficulty = (difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
    // Reset the game when difficulty changes
    dispatch({ type: 'RESET_GAME' });
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
    setDifficulty,
    formatTime,
    getGridSize: () => getGridSize(state.difficulty),
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
