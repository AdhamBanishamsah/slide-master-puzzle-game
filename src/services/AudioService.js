import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

class AudioService {
  constructor() {
    this.backgroundMusic = null;
    this.soundEffects = {};
    this.isMusicEnabled = true;
    this.isSoundEnabled = true;
    this.isHapticsEnabled = true;
    this.musicVolume = 0.5; // Default volume 50%
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      // Initialize sound effects
      await this.loadSoundEffects();
      this.isInitialized = true;
    } catch (error) {
      console.log('Error initializing audio service:', error);
    }
  }

  async loadSoundEffects() {
    try {
      // Load actual audio files for mobile
      if (typeof window !== 'undefined' && window.AudioContext) {
        // Web platform - create beep sounds
        this.soundEffects = {
          tileMove: await this.createWebBeep(600, 80),
          win: await this.createWebBeep(800, 200),
          button: await this.createWebBeep(400, 60),
          shuffle: await this.createWebBeep(500, 100),
        };
      } else {
        // Mobile platform - load actual audio files
        this.soundEffects = {
          tileMove: await Audio.Sound.createAsync(require('../../assets/audio/sounds/tile-move.mp3')),
          win: await Audio.Sound.createAsync(require('../../assets/audio/sounds/win.mp3')),
          button: await Audio.Sound.createAsync(require('../../assets/audio/sounds/button-click.mp3')),
          shuffle: await Audio.Sound.createAsync(require('../../assets/audio/sounds/shuffle.mp3')),
        };
      }
    } catch (error) {
      console.log('Error loading sound effects:', error);
    }
  }

  async createWebBeep(frequency, duration) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

      return { oscillator, gainNode, audioContext, duration };
    } catch (error) {
      console.log('Error creating web beep:', error);
      return null;
    }
  }

  async playWebBeep(sound) {
    if (!sound) return;
    
    try {
      const { oscillator, gainNode, audioContext, duration } = sound;
      
      // Create new oscillator for each play (can't reuse)
      const newOscillator = audioContext.createOscillator();
      const newGainNode = audioContext.createGain();
      
      newOscillator.connect(newGainNode);
      newGainNode.connect(audioContext.destination);
      
      newOscillator.frequency.value = oscillator.frequency.value;
      newOscillator.type = oscillator.type;
      
      newGainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      newGainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
      
      newOscillator.start(audioContext.currentTime);
      newOscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.log('Error playing web beep:', error);
    }
  }

  async playHapticFeedback(type = 'light') {
    if (!this.isHapticsEnabled) return;
    
    try {
      switch (type) {
        case 'light':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'medium':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'heavy':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case 'success':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        default:
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      console.log('Error playing haptic feedback:', error);
    }
  }

  async playTileMoveSound() {
    if (!this.isSoundEnabled) return;
    
    try {
      if (this.soundEffects.tileMove) {
        if (this.soundEffects.tileMove.sound) {
          // Mobile - play actual audio file
          await this.soundEffects.tileMove.sound.replayAsync();
        } else {
          // Web - play beep sound
          await this.playWebBeep(this.soundEffects.tileMove);
        }
      } else {
        console.log('Tile move sound played');
      }
    } catch (error) {
      console.log('Error playing tile move sound:', error);
    }
  }

  async playWinSound() {
    if (!this.isSoundEnabled) return;
    
    try {
      if (this.soundEffects.win) {
        if (this.soundEffects.win.sound) {
          // Mobile - play actual audio file
          await this.soundEffects.win.sound.replayAsync();
        } else {
          // Web - play beep sound sequence
          await this.playWebBeep(this.soundEffects.win);
          setTimeout(() => this.playWebBeep(this.soundEffects.win), 100);
          setTimeout(() => this.playWebBeep(this.soundEffects.win), 300);
        }
      } else {
        console.log('Win sound played');
      }
    } catch (error) {
      console.log('Error playing win sound:', error);
    }
  }

  async playButtonSound() {
    if (!this.isSoundEnabled) return;
    
    try {
      if (this.soundEffects.button) {
        if (this.soundEffects.button.sound) {
          // Mobile - play actual audio file
          await this.soundEffects.button.sound.replayAsync();
        } else {
          // Web - play beep sound
          await this.playWebBeep(this.soundEffects.button);
        }
      } else {
        console.log('Button sound played');
      }
    } catch (error) {
      console.log('Error playing button sound:', error);
    }
  }

  async playShuffleSound() {
    if (!this.isSoundEnabled) return;
    
    try {
      if (this.soundEffects.shuffle) {
        if (this.soundEffects.shuffle.sound) {
          // Mobile - play actual audio file
          await this.soundEffects.shuffle.sound.replayAsync();
        } else {
          // Web - play beep sound
          await this.playWebBeep(this.soundEffects.shuffle);
        }
      } else {
        console.log('Shuffle sound played');
      }
    } catch (error) {
      console.log('Error playing shuffle sound:', error);
    }
  }

  setMusicEnabled(enabled) {
    this.isMusicEnabled = enabled;
    
    // Stop background music if disabled
    if (!enabled && this.backgroundMusic) {
      this.stopBackgroundMusic();
    }
  }

  setSoundEnabled(enabled) {
    this.isSoundEnabled = enabled;
  }

  setHapticsEnabled(enabled) {
    this.isHapticsEnabled = enabled;
  }

  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume)); // Clamp between 0 and 1
    
    // Update volume of currently playing background music
    if (this.backgroundMusic && this.isMusicEnabled) {
      if (this.musicVolume === 0) {
        // Stop music if volume is set to 0
        this.stopBackgroundMusic();
      } else {
        // Update volume
        this.backgroundMusic.setVolumeAsync(this.musicVolume).catch(error => {
          console.log('Error updating music volume:', error);
        });
      }
    }
  }

  getMusicVolume() {
    return this.musicVolume;
  }

  async isBackgroundMusicPlaying() {
    if (!this.backgroundMusic) {
      return false;
    }
    
    try {
      const status = await this.backgroundMusic.getStatusAsync();
      return status.isLoaded && status.isPlaying;
    } catch (error) {
      console.log('Error checking background music status:', error);
      // If there's an error, assume it's not playing and clear the reference
      this.backgroundMusic = null;
      return false;
    }
  }

  async startBackgroundMusic() {
    if (!this.isMusicEnabled || this.musicVolume === 0) {
      return;
    }
    
    try {
      // Always stop any existing background music first
      await this.stopBackgroundMusic();
      
      // Load and play background music
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/audio/sounds/background.mp3'),
        { shouldPlay: true, isLooping: true, volume: this.musicVolume }
      );
      this.backgroundMusic = sound;
    } catch (error) {
      console.log('Error starting background music:', error);
    }
  }

  async stopBackgroundMusic() {
    if (!this.backgroundMusic) {
      return;
    }
    
    try {
      // Get the current status to check if it's playing
      const status = await this.backgroundMusic.getStatusAsync();
      
      // Stop if it's playing
      if (status.isLoaded && status.isPlaying) {
        try {
          await this.backgroundMusic.stopAsync();
        } catch (stopError) {
          // Continue to unload even if stop fails
        }
      }
      
      // Always unload to free up resources
      try {
        await this.backgroundMusic.unloadAsync();
      } catch (unloadError) {
        // Continue even if unload fails
      }
      
      this.backgroundMusic = null;
    } catch (error) {
      // Even if there's an error, clear the reference
      this.backgroundMusic = null;
    }
  }

  async cleanup() {
    this.soundEffects = {};
  }
}

// Create a singleton instance
const audioService = new AudioService();

export default audioService;
