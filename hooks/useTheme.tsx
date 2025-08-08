import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeType = 'light' | 'dark' | 'system';

export interface ThemeColors {
  background: string;
  card: string;
  text: string;
  subtext: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  success: string;
  error: string;
  warning: string;
  glassBg: string;
  glassBorder: string;
}

const lightColors: ThemeColors = {
  background: '#FAFBFC',
  card: '#FFFFFF',
  text: '#1A202C',
  subtext: '#718096',
  primary: '#4299E1',     // 60% - Soft blue for dominance
  secondary: '#9F7AEA',   // 30% - Purple for contrast
  accent: '#F56565',      // 10% - Coral red for emphasis
  border: '#E2E8F0',
  success: '#48BB78',
  error: '#F56565',
  warning: '#ED8936',
  glassBg: 'rgba(255, 255, 255, 0.9)',
  glassBorder: 'rgba(66, 153, 225, 0.15)',
};

const darkColors: ThemeColors = {
  background: '#0F1419',
  card: '#1A202C',
  text: '#F7FAFC',
  subtext: '#A0AEC0',
  primary: '#63B3ED',     // 60% - Lighter blue for dark mode
  secondary: '#B794F6',   // 30% - Lighter purple for contrast
  accent: '#FC8181',      // 10% - Lighter coral for emphasis
  border: '#2D3748',
  success: '#68D391',
  error: '#FC8181',
  warning: '#F6AD55',
  glassBg: 'rgba(26, 32, 44, 0.8)',
  glassBorder: 'rgba(99, 179, 237, 0.2)',
};

export const [ThemeProvider, useTheme] = createContextHook(() => {
  const systemTheme = useColorScheme() as ThemeType | null;
  const [themeType, setThemeType] = useState<ThemeType>('system');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (isInitialized) return;
    
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
          setThemeType(savedTheme as ThemeType);
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    loadTheme();
  }, [isInitialized]);

  const setTheme = async (theme: ThemeType) => {
    if (!isInitialized) return;
    
    setThemeType(theme);
    try {
      await AsyncStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const actualTheme = themeType === 'system' ? (systemTheme || 'light') : themeType;
  const colors = actualTheme === 'dark' ? darkColors : lightColors;

  return {
    theme: actualTheme,
    themeType,
    colors,
    setTheme,
    isLoading,
    isInitialized,
  };
});