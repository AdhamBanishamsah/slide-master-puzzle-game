import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '../context/GameContext';
import { getTheme } from '../theme/theme';
import GameButton from '../components/GameButton';
import audioService from '../services/AudioService';

const MainMenuScreen = () => {
  const navigation = useNavigation();
  const { theme, shufflePuzzle, music, musicVolume } = useGame();
  const themeColors = getTheme(theme === 'dark');

  const handlePlay = () => {
    shufflePuzzle();
    
    // Start background music if enabled and volume > 0
    if (music && musicVolume > 0) {
      audioService.startBackgroundMusic();
    }
    
    navigation.navigate('Game');
  };



  const handleHowToPlay = () => {
    navigation.navigate('HowToPlay');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleHighScores = () => {
    navigation.navigate('HighScores');
  };



  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.content}>
        {/* Logo and Title */}
        <View style={styles.titleContainer}>
          <Image 
            source={require('../../assets/icon.png')} 
            style={styles.logo}
            accessibilityLabel="Slide Master app logo"
            accessibilityRole="image"
          />
          <Text style={[styles.title, { color: themeColors.text }]}>SLIDE MASTER</Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Slide the tiles to solve the puzzle
          </Text>
        </View>

        {/* Main Buttons */}
        <View style={styles.buttonContainer}>
          <GameButton
            title="Play"
            onPress={handlePlay}
            accessibilityLabel="Start a new game"
            accessibilityHint="Tap to start a new puzzle game"
            style={styles.button}
          />
          
          <View style={styles.buttonSpacer} />
          
          <GameButton
            title="How to Play"
            onPress={handleHowToPlay}
            variant="secondary"
            accessibilityLabel="View game instructions"
            accessibilityHint="Tap to see how to play the game"
            style={styles.button}
          />
          
          <View style={styles.buttonSpacer} />
          
          <GameButton
            title="High Scores"
            onPress={handleHighScores}
            variant="secondary"
            accessibilityLabel="View high scores"
            accessibilityHint="Tap to see your best times and moves"
            style={styles.button}
          />
        </View>

        {/* Settings Link */}
        <View style={styles.settingsContainer}>
          <GameButton
            title="Settings"
            onPress={handleSettings}
            variant="secondary"
            accessibilityLabel="Open settings"
            accessibilityHint="Tap to open game settings"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: '100%',
    maxWidth: 280,
  },
  buttonSpacer: {
    height: 16,
  },
  settingsContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
});

export default MainMenuScreen;
