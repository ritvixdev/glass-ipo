import { useTheme } from '@/hooks/useTheme';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleSheet, View, ViewProps } from 'react-native';

interface GlassContainerProps extends ViewProps {
  intensity?: number;
  style?: any;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  intensity = 50,
  style,
  ...props
}) => {
  const { theme, colors } = useTheme();

  if (Platform.OS === 'web') {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.glassBg,
            borderColor: colors.glassBorder,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }

  const blurTint = theme === 'dark' ? 'dark' : 'light';

  return (
    <BlurView
      intensity={intensity}
      tint={blurTint}
      style={[
        styles.container,
        {
          borderColor: colors.glassBorder,
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