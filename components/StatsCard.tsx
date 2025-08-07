import { GlassContainer } from '@/components/ui/GlassContainer';
import { useTheme } from '@/hooks/useTheme';
import { QuickStat } from '@/types/ipo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart2, TrendingUp, Users } from 'lucide-react-native';

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
      elasticity={0.3}
      displacementScale={50}
      blurAmount={0.06}
      saturation={130}
      aberrationIntensity={1.8}
      cornerRadius={18}
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
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minHeight: 100,
  },
  iconContainer: {
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
  },
  changeContainer: {
    marginTop: 4,
  },
  change: {
    fontSize: 12,
    fontWeight: '600',
  },
});