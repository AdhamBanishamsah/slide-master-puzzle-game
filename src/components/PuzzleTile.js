import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';
import { getTheme } from '../theme/theme';

const PuzzleTile = ({ value, index, onPress, isActive }) => {
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
      <Text style={[styles.tileText, { color: themeColors.tileText }]}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tileText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default PuzzleTile;
