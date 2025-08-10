import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { useGame } from '../context/GameContext';
import { getTheme } from '../theme/theme';

const { width, height } = Dimensions.get('window');

const WinningAnimation = ({ visible, onAnimationComplete }) => {
  const { theme, time, moves, formatTime, shufflePuzzle } = useGame();
  const themeColors = getTheme(theme === 'dark');
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Start animation sequence
      const animations = [
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(confettiAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ];

      Animated.parallel(animations).start();

      // Auto-hide after 4 seconds (increased from 3)
      const timer = setTimeout(() => {
        dismissAnimation();
      }, 4000);

      return () => {
        clearTimeout(timer);
        // Clean up animations
        animations.forEach(anim => anim.stop());
      };
    }
  }, [visible, fadeAnim, scaleAnim, confettiAnim]);

  const dismissAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    });
  };

  const handleOverlayPress = () => {
    dismissAnimation();
  };

  const handleCardPress = (event) => {
    // Prevent card press from dismissing the animation
    event.stopPropagation();
  };

  const handleClosePress = (event) => {
    event.stopPropagation();
    // Shuffle the puzzle and dismiss animation
    shufflePuzzle();
    dismissAnimation();
  };

  if (!visible) return null;

  const renderConfetti = () => {
    const confetti = [];
    const colors = ['#4ade80', '#fbbf24', '#f87171', '#3b82f6', '#a855f7'];
    
    for (let i = 0; i < 30; i++) { // Reduced from 50 to improve performance
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * width;
      
      confetti.push(
        <Animated.View
          key={i}
          style={[
            styles.confetti,
            {
              backgroundColor: color,
              left,
              transform: [
                {
                  translateY: confettiAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, height + 50],
                  }),
                },
                {
                  rotate: confettiAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        />
      );
    }
    return confetti;
  };

  return (
    <TouchableOpacity
      style={[
        styles.overlay,
        {
          backgroundColor: themeColors.shadow,
          opacity: fadeAnim,
        },
      ]}
      activeOpacity={1}
      onPress={handleOverlayPress}
    >
      {renderConfetti()}
      
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: themeColors.card,
            borderColor: themeColors.border,
            transform: [{ scale: scaleAnim }],
          },
        ]}
        activeOpacity={1}
        onPress={handleCardPress}
      >
        {/* Close Button */}
        <TouchableOpacity
          style={[
            styles.closeButton,
            {
              backgroundColor: themeColors.border,
              borderColor: themeColors.border,
            }
          ]}
          onPress={handleClosePress}
          accessible={true}
          accessibilityLabel="Close and start new game"
          accessibilityRole="button"
          accessibilityHint="Tap to close the winning celebration and start a new puzzle"
        >
          <Text style={[styles.closeButtonText, { color: themeColors.text }]}>✕</Text>
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <Text style={styles.trophyIcon}>🏆</Text>
        </View>
        
        <Text style={[styles.title, { color: themeColors.text }]}>
          Congratulations!
        </Text>
        
        <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
          You solved the puzzle!
        </Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: themeColors.textMuted }]}>
              Time
            </Text>
            <Text style={[styles.statValue, { color: themeColors.text }]}>
              {formatTime(time)}
            </Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: themeColors.textMuted }]}>
              Moves
            </Text>
            <Text style={[styles.statValue, { color: themeColors.text }]}>
              {moves}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.tapToDismiss, { color: themeColors.textSecondary }]}>
          Tap ✕ to start new game or anywhere to dismiss
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    padding: 32,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: -12,
    right: -12,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    marginBottom: 16,
  },
  trophyIcon: {
    fontSize: 64,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  tapToDismiss: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
  confetti: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default WinningAnimation;
