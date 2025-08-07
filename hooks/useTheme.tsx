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
  background: '#F5F7FA',
  card: '#FFFFFF',
  text: '#1A1D1F',
  subtext: '#6F767E',
  primary: '#3E7BFA',
  secondary: '#6C5DD3',
  accent: '#7A5AF8',
  border: '#E6E8EC',
  success: '#58BD7D',
  error: '#FF5252',
  warning: '#FFB800',
  glassBg: 'rgba(255, 255, 255, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
};

const darkColors: ThemeColors = {
  background: '#111315',
  card: '#1A1D1F',
  text: '#FCFCFD',
  subtext: '#9A9FA5',
  primary: '#3E7BFA',
  secondary: '#6C5DD3',
  accent: '#7A5AF8',
  border: '#272B30',
  success: '#58BD7D',
  error: '#FF5252',
  warning: '#FFB800',
  glassBg: 'rgba(26, 29, 31, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
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