
import React from 'react';
import { TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import { useGame } from '../context/GameContext';
import { getTheme } from '../theme/theme';

const ToggleSwitch = ({ value, onToggle, disabled = false }) => {
  const { theme } = useGame();
  const themeColors = getTheme(theme === 'dark');

  const handlePress = () => {
    if (!disabled && onToggle) {
      onToggle();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handlePress();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: value ? themeColors.toggleActive : themeColors.toggleInactive,
        },
        disabled && {
          opacity: 0.5,
        }
      ]}
      onPress={handlePress}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      accessible={true}
      accessibilityLabel={`Toggle switch is ${value ? 'on' : 'off'}`}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityHint="Double tap to toggle"
    >
      <View
        style={[
          styles.thumb,
          {
            backgroundColor: themeColors.toggleThumb,
            alignSelf: value ? 'flex-end' : 'flex-start',
          }
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default ToggleSwitch;
