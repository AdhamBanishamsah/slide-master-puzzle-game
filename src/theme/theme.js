export const lightTheme = {
  // Background colors - Inspired by the light blue sky with snowflakes
  background: '#e8f4fd',
  surface: '#ffffff',
  card: '#ffffff',
  
  // Text colors
  text: '#1e293b',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  
  // Accent colors - Inspired by the vibrant UI elements
  primary: '#3b82f6', // Beautiful blue
  primaryLight: '#60a5fa',
  primaryDark: '#2563eb',
  
  // Border colors
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  
  // Status colors - Inspired by the colorful game elements
  success: '#10b981', // Green
  warning: '#f59e0b', // Orange
  error: '#ef4444',   // Red
  
  // Shadow - Softer shadows for modern look
  shadow: 'rgba(59, 130, 246, 0.1)',
  
  // Puzzle tile colors - Inspired by the clean game tiles
  tileBackground: '#ffffff',
  tileBorder: '#e2e8f0',
  tileActive: '#dbeafe',
  tileActiveBorder: '#3b82f6',
  tileText: '#1e293b',
  
  // Button colors - Inspired by the rounded buttons
  buttonPrimary: '#3b82f6',
  buttonPrimaryText: '#ffffff',
  buttonSecondary: '#f8fafc',
  buttonSecondaryText: '#3b82f6',
  buttonSecondaryBorder: '#3b82f6',
  
  // Toggle colors
  toggleActive: '#3b82f6',
  toggleInactive: '#cbd5e1',
  toggleThumb: '#ffffff',
  
  // Stats colors
  statLabel: '#64748b',
  statValue: '#1e293b',
  
  // Additional colors for enhanced UI
  gradientStart: '#3b82f6',
  gradientEnd: '#1d4ed8',
  accent: '#f59e0b', // Orange accent
  highlight: '#fef3c7', // Light yellow highlight
};

export const darkTheme = {
  // Background colors - Inspired by the dark game interface
  background: '#0f172a',
  surface: '#1e293b',
  card: '#334155',
  
  // Text colors
  text: '#ffffff',
  textSecondary: '#d1d5db',
  textMuted: '#9ca3af',
  
  // Accent colors - Inspired by the vibrant UI elements
  primary: '#60a5fa', // Bright blue
  primaryLight: '#93c5fd',
  primaryDark: '#3b82f6',
  
  // Border colors
  border: '#334155',
  borderLight: '#475569',
  
  // Status colors - Inspired by the colorful game elements
  success: '#4ade80', // Green
  warning: '#fbbf24', // Orange
  error: '#f87171',   // Red
  
  // Shadow - Enhanced shadows for depth
  shadow: 'rgba(0, 0, 0, 0.4)',
  
  // Puzzle tile colors - Inspired by the clean game tiles
  tileBackground: '#1e293b',
  tileBorder: '#334155',
  tileActive: '#2a2f38',
  tileActiveBorder: '#60a5fa',
  tileText: '#ffffff',
  
  // Button colors - Inspired by the rounded buttons
  buttonPrimary: '#60a5fa',
  buttonPrimaryText: '#0f172a',
  buttonSecondary: 'transparent',
  buttonSecondaryText: '#60a5fa',
  buttonSecondaryBorder: '#60a5fa',
  
  // Toggle colors
  toggleActive: '#60a5fa',
  toggleInactive: '#334155',
  toggleThumb: '#ffffff',
  
  // Stats colors
  statLabel: '#9ca3af',
  statValue: '#ffffff',
  
  // Additional colors for enhanced UI
  gradientStart: '#60a5fa',
  gradientEnd: '#3b82f6',
  accent: '#fbbf24', // Orange accent
  highlight: '#1e3a8a', // Dark blue highlight
};

export const getTheme = (isDark) => {
  return isDark ? darkTheme : lightTheme;
};
