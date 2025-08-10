import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';

import MainMenuScreen from './src/screens/MainMenuScreen';
import GameScreen from './src/screens/GameScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import HowToPlayScreen from './src/screens/HowToPlayScreen';
import HighScoreScreen from './src/screens/HighScoreScreen';
import AboutScreen from './src/screens/AboutScreen';
import { GameProvider, useGame } from './src/context/GameContext';

// Ignore specific warnings that might cause issues
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'AsyncStorage has been extracted from react-native',
]);

const Stack = createStackNavigator();

const AppContent = () => {
  const { theme } = useGame();
  const isDark = theme === 'dark';

  return (
    <NavigationContainer>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack.Navigator
        initialRouteName="MainMenu"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: isDark ? '#0f1419' : '#ffffff' },
          gestureEnabled: true,
          animationEnabled: true,
        }}
      >
        <Stack.Screen 
          name="MainMenu" 
          component={MainMenuScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="HowToPlay" component={HowToPlayScreen} />
        <Stack.Screen name="HighScores" component={HighScoreScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </SafeAreaProvider>
  );
};

export default App;
