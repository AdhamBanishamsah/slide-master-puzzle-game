export const lightTheme = {
  // Background colors
  background: '#ffffff',
  surface: '#f8fafc',
  card: '#ffffff',
  
  // Text colors
  text: '#1e293b',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  
  // Accent colors
  primary: '#059669',
  primaryLight: '#10b981',
  primaryDark: '#047857',
  
  // Border colors
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  
  // Shadow
  shadow: 'rgba(0, 0, 0, 0.1)',
  
  // Puzzle tile colors
  tileBackground: '#f8fafc',
  tileBorder: '#e2e8f0',
  tileActive: '#dbeafe',
  tileActiveBorder: '#3b82f6',
  tileText: '#1e293b',
  
  // Button colors
  buttonPrimary: '#059669',
  buttonPrimaryText: '#ffffff',
  buttonSecondary: '#f8fafc',
  buttonSecondaryText: '#059669',
  buttonSecondaryBorder: '#059669',
  
  // Toggle colors
  toggleActive: '#059669',
  toggleInactive: '#cbd5e1',
  toggleThumb: '#ffffff',
  
  // Stats colors
  statLabel: '#64748b',
  statValue: '#1e293b',
};

export const darkTheme = {
  // Background colors
  background: '#0f1419',
  surface: '#1f2937',
  card: '#374151',
  
  // Text colors
  text: '#ffffff',
  textSecondary: '#d1d5db',
  textMuted: '#9ca3af',
  
  // Accent colors
  primary: '#4ade80',
  primaryLight: '#86efac',
  primaryDark: '#22c55e',
  
  // Border colors
  border: '#374151',
  borderLight: '#4b5563',
  
  // Status colors
  success: '#4ade80',
  warning: '#fbbf24',
  error: '#f87171',
  
  // Shadow
  shadow: 'rgba(0, 0, 0, 0.3)',
  
  // Puzzle tile colors
  tileBackground: '#1f2937',
  tileBorder: '#374151',
  tileActive: '#2a2f38',
  tileActiveBorder: '#4ade80',
  tileText: '#ffffff',
  
  // Button colors
  buttonPrimary: '#4ade80',
  buttonPrimaryText: '#0f1419',
  buttonSecondary: 'transparent',
  buttonSecondaryText: '#4ade80',
  buttonSecondaryBorder: '#4ade80',
  
  // Toggle colors
  toggleActive: '#4ade80',
  toggleInactive: '#374151',
  toggleThumb: '#ffffff',
  
  // Stats colors
  statLabel: '#9ca3af',
  statValue: '#ffffff',
};

export const getTheme = (isDark) => {
  return isDark ? darkTheme : lightTheme;
};
