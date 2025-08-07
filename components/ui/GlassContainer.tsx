import { useTheme } from '@/hooks/useTheme';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleSheet, View, ViewProps } from 'react-native';

interface GlassContainerProps extends ViewProps {
  intensity?: number;
  style?: any;
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  elasticity?: number;
  cornerRadius?: number;
  padding?: string;
  overLight?: boolean;
  mode?: 'standard' | 'polar' | 'prominent' | 'shader';
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  intensity = 50,
  style,
  displacementScale = 70,
  blurAmount = 0.0625,
  saturation = 140,
  aberrationIntensity = 2,
  elasticity = 0.15,
  cornerRadius = 16,
  padding,
  overLight,
  mode = 'standard',
  ...props
}) => {
  const { theme, colors } = useTheme();

  if (Platform.OS === 'web') {
    // Advanced liquid glass effect implementation
    return (
      <View
        style={[
          {
            position: 'relative',
            display: 'flex',
            fontWeight: '600',
            overflow: 'hidden',
            borderRadius: cornerRadius,
            boxShadow: '0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2)',
          },
          style,
        ]}
        {...props}
      >
        {/* Glass effect layer */}
        <View
          style={{
            position: 'absolute',
            zIndex: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: cornerRadius,
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            overflow: 'hidden',
            isolation: 'isolate',
          }}
        />
        
        {/* Tint layer */}
        <View
          style={{
            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: cornerRadius,
            backgroundColor: theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(255, 255, 255, 0.25)',
          }}
        />
        
        {/* Shine layer */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            borderRadius: cornerRadius,
            overflow: 'hidden',
            boxShadow: theme === 'dark'
              ? 'inset 2px 2px 1px 0 rgba(255, 255, 255, 0.2), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.2)'
              : 'inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)',
          }}
        />
        
        {/* Content layer */}
        <View
          style={{
            zIndex: 3,
            position: 'relative',
          }}
        >
          {children}
        </View>
      </View>
    );
  }

  // Fallback to BlurView for mobile platforms
  const blurTint = theme === 'dark' ? 'dark' : 'light';

  return (
    <BlurView
      intensity={intensity}
      tint={blurTint}
      style={[
        styles.container,
        {
          borderColor: colors.glassBorder,
          borderRadius: cornerRadius,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
});