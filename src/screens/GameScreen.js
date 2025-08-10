import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '../context/GameContext';
import { getTheme } from '../theme/theme';
import GameButton from '../components/GameButton';
import PuzzleTile from '../components/PuzzleTile';
import WinningAnimation from '../components/WinningAnimation';

const GameScreen = () => {
  const navigation = useNavigation();
  const { theme, puzzle, time, moves, isGameActive, isWon, moveTile, shufflePuzzle, resetGame, formatTime, getGridSize } = useGame();
  const themeColors = getTheme(theme === 'dark');
  const [showWinningAnimation, setShowWinningAnimation] = useState(false);

  // Show winning animation when game is won
  useEffect(() => {
    if (isWon && !showWinningAnimation) {
      setShowWinningAnimation(true);
    }
  }, [isWon, showWinningAnimation]);

  const handleBackToMenu = () => {
    navigation.navigate('MainMenu');
  };

  const handleRestart = () => {
    resetGame();
    setShowWinningAnimation(false);
  };

  const handleShuffle = () => {
    shufflePuzzle();
    setShowWinningAnimation(false);
  };

  const handleWinningAnimationComplete = () => {
    setShowWinningAnimation(false);
    // Don't reset the game here - let user choose what to do next
  };

  const renderPuzzleGrid = () => {
    const gridSize = getGridSize();
    // Calculate tile size to fit screen while maintaining square aspect ratio
    const screenWidth = Dimensions.get('window').width - 40; // Screen width minus padding
    const tileSize = Math.floor((screenWidth - (gridSize + 1) * 8) / gridSize); // 8px margins
    const containerWidth = gridSize * tileSize + (gridSize + 1) * 8;
    
    return (
      <View style={[styles.puzzleContainer, { width: containerWidth }]}>
        {puzzle.map((value, index) => (
          <PuzzleTile
            key={index}
            value={value}
            index={index}
            onPress={moveTile}
            isActive={isGameActive}
            tileSize={tileSize}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.content}>
        {/* Header with Stats */}
        <View style={styles.header}>
          <View style={styles.statContainer}>
            <Text style={[styles.statLabel, { color: themeColors.statLabel }]}>TIME</Text>
            <Text style={[styles.statValue, { color: themeColors.statValue }]}>{formatTime(time)}</Text>
          </View>
          
          <View style={styles.statContainer}>
            <Text style={[styles.statLabel, { color: themeColors.statLabel }]}>MOVES</Text>
            <Text style={[styles.statValue, { color: themeColors.statValue }]}>{moves}</Text>
          </View>
        </View>

        {/* Puzzle Grid */}
        <View style={styles.gameArea}>
          {renderPuzzleGrid()}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <GameButton
            title="Restart"
            onPress={handleRestart}
            variant="secondary"
            accessibilityLabel="Restart the game"
            accessibilityHint="Tap to restart the current puzzle"
          />
          
          <View style={styles.buttonSpacer} />
          
          <GameButton
            title="Shuffle"
            onPress={handleShuffle}
            accessibilityLabel="Shuffle the puzzle"
            accessibilityHint="Tap to shuffle the puzzle tiles"
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

      {/* Winning Animation */}
      <WinningAnimation
        visible={showWinningAnimation}
        onAnimationComplete={handleWinningAnimationComplete}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  statContainer: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  puzzleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 20,
  },
  buttonSpacer: {
    width: 20,
  },
  backButtonContainer: {
    alignItems: 'center',
  },
});

export default GameScreen;
