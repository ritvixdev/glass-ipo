import { GlassContainer } from '@/components/ui/GlassContainer';
import { useTheme } from '@/hooks/useTheme';
import { QuickStat } from '@/types/ipo';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { BarChart2, TrendingUp, Users } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');

interface StatsCardProps {
  stat: QuickStat;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stat }) => {
  const { colors } = useTheme();

  const getIcon = () => {
    switch (stat.icon) {
      case 'trending-up':
        return <TrendingUp size={24} color={colors.primary} />;
      case 'users':
        return <Users size={24} color={colors.secondary} />;
      case 'bar-chart-2':
        return <BarChart2 size={24} color={colors.accent} />;
      default:
        return <TrendingUp size={24} color={colors.primary} />;
    }
  };

  return (
    <GlassContainer 
      style={styles.container}
      elevation="medium"
      variant="default"
      cornerRadius={16}
      padding={20}
      interactive={false}
    >
      <View style={styles.iconContainer}>{getIcon()}</View>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: colors.subtext }]}>{stat.title}</Text>
        <Text style={[styles.value, { color: colors.text }]}>{stat.value}</Text>
        {stat.change && (
          <View style={styles.changeContainer}>
            <Text
              style={[
                styles.change,
                {
                  color: stat.isPositive ? colors.success : colors.error,
                },
              ]}
            >
              {stat.isPositive ? '+' : ''}
              {stat.change}%
            </Text>
          </View>
        )}
      </View>
    </GlassContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: (screenWidth - 64) / 3,
    marginBottom: 16,
    marginRight: 8,
    minHeight: 120,
  },
  iconContainer: {
    marginRight: 12,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  changeContainer: {
    marginTop: 4,
  },
  change: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});