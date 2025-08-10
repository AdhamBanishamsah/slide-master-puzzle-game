import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '../context/GameContext';
import { getTheme } from '../theme/theme';
import GameButton from '../components/GameButton';

const AboutScreen = () => {
  const navigation = useNavigation();
  const { theme } = useGame();
  const themeColors = getTheme(theme === 'dark');

  const handleBackToMenu = () => {
    navigation.navigate('MainMenu');
  };



  const renderInfoCard = (title, content, icon) => (
    <View style={[styles.infoCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <Text style={[styles.cardTitle, { color: themeColors.text }]}>{title}</Text>
      </View>
      <Text style={[styles.cardContent, { color: themeColors.textSecondary }]}>{content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Image 
              source={require('../../assets/icon.png')} 
              style={styles.logo}
              accessibilityLabel="Slide Master app logo"
              accessibilityRole="image"
            />
            <Text style={[styles.title, { color: themeColors.text }]}>About Slide Master</Text>
            <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
              Version 1.0.0
            </Text>
          </View>

          {/* Info Cards */}
          <View style={styles.cardsContainer}>
            {renderInfoCard(
              'Developer',
              'Adham Banishamsah\nA passionate developer who loves creating engaging puzzle games.',
              '👨‍💻'
            )}
            
            {renderInfoCard(
              'Game Description',
              'Slide Master is a classic sliding puzzle game with modern design and multiple difficulty levels. Challenge yourself with 3×3, 4×4, and 5×5 grids!',
              '🎮'
            )}
            
            {renderInfoCard(
              'Features',
              '• Multiple difficulty levels\n• Beautiful modern design\n• Sound effects & haptics\n• Dark/Light themes\n• High score tracking\n• Accessibility support',
              '⭐'
            )}
            
            {renderInfoCard(
              'Technology',
              'Built with React Native and Expo\nUsing modern development practices and clean architecture.',
              '⚡'
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  cardsContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  infoCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
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
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardContent: {
    fontSize: 14,
    lineHeight: 20,
  },

  backButtonContainer: {
    alignItems: 'center',
  },
});

export default AboutScreen;
