import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '../context/GameContext';
import { getTheme } from '../theme/theme';
import GameButton from '../components/GameButton';

const HowToPlayScreen = () => {
  const navigation = useNavigation();
  const { theme } = useGame();
  const themeColors = getTheme(theme === 'dark');

  const handleBackToMenu = () => {
    navigation.navigate('MainMenu');
  };

  const renderInstruction = (icon, text) => (
    <View style={styles.instructionItem}>
      <View style={[styles.iconContainer, { backgroundColor: themeColors.primary }]}>
        <Text style={styles.instructionIcon}>{icon}</Text>
      </View>
      <Text style={[styles.instructionText, { color: themeColors.text }]}>{text}</Text>
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
          <Text style={[styles.title, { color: themeColors.text }]}>How to Play</Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          {renderInstruction(
            '➡️',
            'Slide the tiles to rearrange them into order'
          )}
          
          {renderInstruction(
            '🏆',
            'Only tiles adjacent to empty space can be moved!'
          )}
          
          {renderInstruction(
            '⭐',
            'Try to solve as quickly as possible in the fewest moves!'
          )}
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
    paddingVertical: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 60,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  instructionsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  instructionIcon: {
    fontSize: 20,
  },
  instructionText: {
    flex: 1,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '500',
  },
  backButtonContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
});

export default HowToPlayScreen;
