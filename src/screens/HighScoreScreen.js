import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '../context/GameContext';
import { getTheme } from '../theme/theme';
import GameButton from '../components/GameButton';

const HighScoreScreen = () => {
  const navigation = useNavigation();
  const { theme, bestTime, bestMoves, formatTime } = useGame();
  const themeColors = getTheme(theme === 'dark');

  const handleBackToMenu = () => {
    navigation.navigate('MainMenu');
  };

  const renderScoreCard = (title, value, subtitle, icon) => (
    <View style={[styles.scoreCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <Text style={[styles.cardTitle, { color: themeColors.text }]}>{title}</Text>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={[styles.cardValue, { color: themeColors.primary }]}>
          {value || '--'}
        </Text>
        <Text style={[styles.cardSubtitle, { color: themeColors.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColors.text }]}>High Scores</Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Your best achievements
          </Text>
        </View>

        {/* Score Cards */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.cardsContainer}>
            {renderScoreCard(
              'Best Time',
              bestTime ? formatTime(bestTime) : null,
              'Fastest completion',
              '⏱️'
            )}
            
            {renderScoreCard(
              'Best Moves',
              bestMoves ? bestMoves.toString() : null,
              'Fewest moves used',
              '🎯'
            )}
            
            {renderScoreCard(
              'Games Played',
              'Coming Soon',
              'Total games completed',
              '🎮'
            )}
            
            {renderScoreCard(
              'Win Rate',
              'Coming Soon',
              'Success percentage',
              '📊'
            )}
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <GameButton
            title="Play Again"
            onPress={() => navigation.navigate('Game')}
            accessibilityLabel="Start a new game"
            accessibilityHint="Tap to start a new puzzle game"
          />
          
          <View style={styles.buttonSpacer} />
          
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
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    paddingBottom: 20,
  },
  scoreCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContent: {
    alignItems: 'center',
  },
  cardValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonSpacer: {
    width: 16,
  },
});

export default HighScoreScreen;
