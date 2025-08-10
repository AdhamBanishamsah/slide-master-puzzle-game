import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';
import { getTheme } from '../theme/theme';


const GameButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  style,
  textStyle
}) => {
  const { theme } = useGame();
  const themeColors = getTheme(theme === 'dark');

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handlePress();
    }
  };

  const buttonStyle = [
    styles.button,
    variant === 'primary' ? {
      backgroundColor: themeColors.buttonPrimary,
    } : {
      backgroundColor: themeColors.buttonSecondary,
      borderWidth: 2,
      borderColor: themeColors.buttonSecondaryBorder,
    },
    disabled && {
      backgroundColor: themeColors.border,
      borderColor: themeColors.border,
      opacity: 0.5,
    },
    style
  ];

  const textStyleCombined = [
    styles.buttonText,
    variant === 'primary' ? {
      color: themeColors.buttonPrimaryText,
    } : {
      color: themeColors.buttonSecondaryText,
    },
    disabled && {
      color: themeColors.textMuted,
    },
    textStyle
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      accessible={true}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityHint={accessibilityHint || `Tap to ${title.toLowerCase()}`}
    >
      <Text style={textStyleCombined}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default GameButton;
