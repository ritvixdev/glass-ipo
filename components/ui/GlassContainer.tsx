import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { Platform, View, ViewProps } from 'react-native';

interface ModernCardProps extends ViewProps {
  style?: any;
  cornerRadius?: number;
  elevation?: 'low' | 'medium' | 'high';
  variant?: 'default' | 'outlined' | 'filled';
  padding?: number;
  interactive?: boolean;
}

export const GlassContainer: React.FC<ModernCardProps> = ({
  children,
  style,
  cornerRadius = 16,
  elevation = 'medium',
  variant = 'default',
  padding = 16,
  interactive = false,
  ...props
}) => {
  const { theme, colors } = useTheme();

  const getElevationStyle = () => {
    const isLight = theme === 'light';
    
    const elevations = {
      low: Platform.OS === 'web' 
        ? { 
            boxShadow: isLight 
              ? '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.06)' 
              : '0 2px 4px rgba(0, 0, 0, 0.1)'
          }
        : { 
            elevation: 2, 
            shadowColor: isLight ? '#000' : '#000', 
            shadowOffset: { width: 0, height: 1 }, 
            shadowOpacity: isLight ? 0.08 : 0.1, 
            shadowRadius: isLight ? 3 : 2 
          },
      medium: Platform.OS === 'web'
        ? { 
            boxShadow: isLight 
              ? '0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06)' 
              : '0 4px 12px rgba(0, 0, 0, 0.15)'
          }
        : { 
            elevation: 4, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: isLight ? 0.1 : 0.15, 
            shadowRadius: isLight ? 6 : 4 
          },
      high: Platform.OS === 'web'
        ? { 
            boxShadow: isLight 
              ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)' 
              : '0 8px 24px rgba(0, 0, 0, 0.2)'
          }
        : { 
            elevation: 8, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 }, 
            shadowOpacity: isLight ? 0.12 : 0.2, 
            shadowRadius: isLight ? 10 : 8 
          }
    };
    return elevations[elevation];
  };

  const getVariantStyle = () => {
    const isLight = theme === 'light';
    
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'filled':
        return {
          backgroundColor: colors.primary,
        };
      default:
        if (isLight) {
          return {
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.glassBorder,
            ...(Platform.OS === 'web' && {
              background: `linear-gradient(135deg, ${colors.card} 0%, rgba(159, 122, 234, 0.08) 25%, rgba(66, 153, 225, 0.04) 75%, ${colors.card} 100%)`,
              backdropFilter: 'blur(16px)',
              boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 0 0 1px ${colors.glassBorder}, 0 2px 8px rgba(66, 153, 225, 0.1)`,
            })
          };
        } else {
          return {
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.glassBorder,
            ...(Platform.OS === 'web' && {
              background: `linear-gradient(135deg, ${colors.card} 0%, rgba(183, 148, 246, 0.12) 25%, rgba(99, 179, 237, 0.08) 75%, ${colors.card} 100%)`,
              backdropFilter: 'blur(20px)',
              boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 1px ${colors.glassBorder}, 0 4px 12px rgba(0, 0, 0, 0.3)`,
            })
          };
        }
    }
  };

  const getInteractiveStyle = () => {
    if (!interactive) return {};
    
    const isLight = theme === 'light';
    
    return Platform.OS === 'web' ? {
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      ':hover': {
        transform: 'translateY(-4px) scale(1.02)',
        boxShadow: isLight
          ? elevation === 'high' 
            ? '0 16px 48px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1)'
            : elevation === 'medium'
            ? '0 12px 32px rgba(0, 0, 0, 0.12), 0 6px 16px rgba(0, 0, 0, 0.08)'
            : '0 8px 24px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.06)'
          : elevation === 'high' 
            ? '0 12px 32px rgba(0, 0, 0, 0.25)'
            : elevation === 'medium'
            ? '0 6px 16px rgba(0, 0, 0, 0.2)'
            : '0 3px 8px rgba(0, 0, 0, 0.15)',
        ...(isLight ? {
          borderColor: colors.accent + '60',
          background: `linear-gradient(135deg, ${colors.card} 0%, rgba(159, 122, 234, 0.12) 25%, rgba(245, 101, 101, 0.06) 75%, rgba(255, 255, 255, 0.98) 100%)`,
        } : {
          borderColor: colors.accent + '80',
          background: `linear-gradient(135deg, ${colors.card} 0%, rgba(183, 148, 246, 0.18) 25%, rgba(252, 129, 129, 0.08) 75%, ${colors.card} 100%)`,
        })
      }
    } : {};
  };

  return (
    <View
      style={[
        {
          borderRadius: cornerRadius,
          padding: padding,
          ...getElevationStyle(),
          ...getVariantStyle(),
          ...getInteractiveStyle(),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};