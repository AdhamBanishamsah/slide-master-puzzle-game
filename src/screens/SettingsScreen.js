import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '../context/GameContext';
import { getTheme } from '../theme/theme';
import GameButton from '../components/GameButton';
import ToggleSwitch from '../components/ToggleSwitch';
import VolumeSlider from '../components/VolumeSlider';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const {
    theme,
    music,
    soundEffects,
    haptics,
    musicVolume,
    difficulty,
    toggleMusic,
    toggleSoundEffects,
    toggleHaptics,
    toggleTheme,
    setMusicVolume,
    setDifficulty,
    resetBestTime
  } = useGame();
  
  const themeColors = getTheme(theme === 'dark');

  const handleBackToMenu = () => {
    navigation.navigate('MainMenu');
  };

  const handleResetBestTime = () => {
    Alert.alert(
      'Reset Best Time',
      'Are you sure you want to reset your best time and moves?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: resetBestTime,
        },
      ]
    );
  };

  const renderSettingItem = (label, value, onToggle, icon = null) => (
    <View style={[styles.settingItem, { borderBottomColor: themeColors.border }]}>
      <View style={styles.settingLeft}>
        {icon && <View style={styles.settingIcon}>{icon}</View>}
        <Text style={[styles.settingLabel, { color: themeColors.text }]}>{label}</Text>
      </View>
      <ToggleSwitch value={value} onToggle={onToggle} />
    </View>
  );

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
          <Text style={[styles.title, { color: themeColors.text }]}>Settings</Text>
        </View>

        {/* Settings List */}
        <View style={styles.settingsContainer}>
          {renderSettingItem(
            'Music',
            music,
            toggleMusic,
            <Text style={styles.icon}>🎵</Text>
          )}
          
          {music && (
            <View style={[styles.settingItem, { borderBottomColor: themeColors.border }]}>
              <View style={styles.settingLeft}>
                <Text style={styles.icon}>🔊</Text>
                <Text style={[styles.settingLabel, { color: themeColors.text }]}>Music Volume</Text>
              </View>
              <View style={styles.volumeContainer}>
                <VolumeSlider
                  value={musicVolume}
                  onValueChange={setMusicVolume}
                  label=""
                />
              </View>
            </View>
          )}
          
          {renderSettingItem(
            'Sound Effects',
            soundEffects,
            toggleSoundEffects,
            <Text style={styles.icon}>🔊</Text>
          )}
          
          {renderSettingItem(
            'Haptics',
            haptics,
            toggleHaptics,
            <Text style={styles.icon}>📳</Text>
          )}
          
          <View style={[styles.settingItem, { borderBottomColor: themeColors.border }]}>
            <View style={styles.settingLeft}>
              <Text style={styles.icon}>🎨</Text>
              <Text style={[styles.settingLabel, { color: themeColors.text }]}>Theme</Text>
            </View>
            <View style={styles.themeDisplay}>
              <Text style={[styles.themeText, { color: themeColors.primary }]}>{theme}</Text>
              <ToggleSwitch value={theme === 'dark'} onToggle={toggleTheme} />
            </View>
          </View>

          {/* Difficulty Selector */}
          <View style={[styles.settingItem, { borderBottomColor: themeColors.border }]}>
            <View style={styles.settingLeft}>
              <Text style={styles.icon}>🎯</Text>
              <Text style={[styles.settingLabel, { color: themeColors.text }]}>Difficulty</Text>
            </View>
          </View>
          
          {/* Difficulty Buttons */}
          <View style={styles.difficultyButtonsContainer}>
            {['easy', 'normal', 'hard'].map((level) => {
              const buttonTitle = level.charAt(0).toUpperCase() + level.slice(1);
              return (
                <GameButton
                  key={level}
                  title={buttonTitle}
                  onPress={() => setDifficulty(level)}
                  variant={difficulty === level ? 'primary' : 'secondary'}
                  style={styles.difficultyButton}
                  textStyle={{ fontSize: 13, fontWeight: 'bold', lineHeight: 16 }}
                  accessibilityLabel={`Set difficulty to ${level}`}
                  accessibilityHint={`Tap to set game difficulty to ${level}`}
                />
              );
            })}
          </View>
        </View>

        {/* Reset Button */}
        <View style={styles.resetContainer}>
          <GameButton
            title="Reset Best Time"
            onPress={handleResetBestTime}
            variant="secondary"
            accessibilityLabel="Reset best time and moves"
            accessibilityHint="Tap to reset your best time and moves records"
          />
        </View>

        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <GameButton
            title="Back to Menu"
            onPress={handleBackToMenu}
            variant="secondary"
            accessibilityLabel="Return to main menu"
            accessibilityHint="Tap to go back to the main menu"
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 12,
    borderRadius: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  settingsContainer: {
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  themeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeText: {
    fontSize: 18,
    fontWeight: '500',
    marginRight: 12,
  },
  volumeContainer: {
    flex: 1,
    marginLeft: 20,
  },
  difficultyButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  difficultyButton: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 6,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  backButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
    
  },
});

export default SettingsScreen;
