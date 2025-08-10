import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';
import { getTheme } from '../theme/theme';

const PuzzleTile = ({ value, index, onPress, isActive, tileSize = 80 }) => {
  const { theme } = useGame();
  const themeColors = getTheme(theme === 'dark');

  const handlePress = () => {
    if (isActive && value !== 0) {
      if (onPress) {
        onPress(index);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handlePress();
    }
  };

  if (value === 0) {
    return (
      <TouchableOpacity
        style={[
          styles.tile,
          {
            width: tileSize,
            height: tileSize,
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: themeColors.tileBorder,
            borderStyle: 'dashed',
          }
        ]}
        onPress={handlePress}
        onKeyDown={handleKeyDown}
        accessible={true}
        accessibilityLabel="Empty tile"
        accessibilityRole="button"
        accessibilityHint="This is an empty space in the puzzle"
      />
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.tile,
        {
          width: tileSize,
          height: tileSize,
          backgroundColor: isActive ? themeColors.tileActive : themeColors.tileBackground,
          borderWidth: isActive ? 2 : 1,
          borderColor: isActive ? themeColors.tileActiveBorder : themeColors.tileBorder,
        }
      ]}
      onPress={handlePress}
      onKeyDown={handleKeyDown}
      accessible={true}
      accessibilityLabel={`Tile number ${value}`}
      accessibilityRole="button"
      accessibilityHint={`Tap to move tile ${value}`}
    >
      <Text style={[styles.tileText, { color: themeColors.tileText, fontSize: Math.max(16, tileSize * 0.3) }]}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 2,
  },
  tileText: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default PuzzleTile;
