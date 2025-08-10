import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useGame } from '../context/GameContext';
import { getTheme } from '../theme/theme';

const VolumeSlider = ({ value, onValueChange, label }) => {
  const { theme } = useGame();
  const themeColors = getTheme(theme === 'dark');

  const handleValueChange = (newValue) => {
    onValueChange(newValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: themeColors.text }]}>{label}</Text>
        <Text style={[styles.value, { color: themeColors.textSecondary }]}>
          {Math.round(value * 100)}%
        </Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={value}
        onValueChange={handleValueChange}
        minimumTrackTintColor={themeColors.primary}
        maximumTrackTintColor={themeColors.border}
        thumbStyle={[styles.thumb, { backgroundColor: themeColors.primary }]}
        trackStyle={styles.track}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    fontWeight: '400',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
});

export default VolumeSlider;
