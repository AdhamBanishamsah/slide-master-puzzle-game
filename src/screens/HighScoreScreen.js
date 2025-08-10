import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '../context/GameContext';
import { getTheme } from '../theme/theme';
import GameButton from '../components/GameButton';

const HighScoreScreen = () => {
  const navigation = useNavigation();
  const { theme, bestTime, bestMoves, highScores, formatTime } = useGame();
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
        </View>

        {/* Score Cards */}
        <View style={styles.cardsContainer}>
          {/* Easy Difficulty */}
          <View style={styles.difficultySection}>
            <Text style={[styles.difficultyTitle, { color: themeColors.primary }]}>Easy (3×3)</Text>
            <View style={styles.difficultyScores}>
              {renderScoreCard(
                'Best Time',
                highScores.easy.bestTime ? formatTime(highScores.easy.bestTime) : null,
                'Fastest',
                '⏱️'
              )}
              
              {renderScoreCard(
                'Best Moves',
                highScores.easy.bestMoves ? highScores.easy.bestMoves.toString() : null,
                'Fewest',
                '🎯'
              )}
            </View>
          </View>

          {/* Normal Difficulty */}
          <View style={styles.difficultySection}>
            <Text style={[styles.difficultyTitle, { color: themeColors.primary }]}>Normal (4×4)</Text>
            <View style={styles.difficultyScores}>
              {renderScoreCard(
                'Best Time',
                highScores.normal.bestTime ? formatTime(highScores.normal.bestTime) : null,
                'Fastest',
                '⏱️'
              )}
              
              {renderScoreCard(
                'Best Moves',
                highScores.normal.bestMoves ? highScores.normal.bestMoves.toString() : null,
                'Fewest',
                '🎯'
              )}
            </View>
          </View>

          {/* Hard Difficulty */}
          <View style={styles.difficultySection}>
            <Text style={[styles.difficultyTitle, { color: themeColors.primary }]}>Hard (5×5)</Text>
            <View style={styles.difficultyScores}>
              {renderScoreCard(
                'Best Time',
                highScores.hard.bestTime ? formatTime(highScores.hard.bestTime) : null,
                'Fastest',
                '⏱️'
              )}
              
              {renderScoreCard(
                'Best Moves',
                highScores.hard.bestMoves ? highScores.hard.bestMoves.toString() : null,
                'Fewest',
                '🎯'
              )}
            </View>
          </View>
        </View>

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
    paddingVertical: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  difficultySection: {
    marginBottom: 8,
  },
  difficultyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  difficultyScores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 0,
    marginHorizontal: 6,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContent: {
    alignItems: 'center',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  buttonSpacer: {
    width: 16,
  },
});

export default HighScoreScreen;
