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
        return <TrendingUp size={14} color={colors.primary} />;
      case 'users':
        return <Users size={14} color={colors.secondary} />;
      case 'bar-chart-2':
        return <BarChart2 size={14} color={colors.accent} />;
      default:
        return <TrendingUp size={14} color={colors.primary} />;
    }
  };

  const getAbbreviatedTitle = (title: string) => {
    const abbreviations: { [key: string]: string } = {
      'Total Live IPOs': 'LIVE',
      'Avg. Subscription': 'AVG SUB',
      'Avg. Listing Gain': 'AVG GAIN',
      'Market Cap': 'MKT CAP',
      'Success Rate': 'SUCCESS',
      'Upcoming This Week': 'UPCOMING'
    };
    return abbreviations[title] || title;
  };

  return (
    <GlassContainer 
      style={styles.container}
      elevation="medium"
      variant="default"
      cornerRadius={8}
      padding={8}
      interactive={false}
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={`${stat.title}: ${stat.value}${stat.change ? `, change: ${stat.change}` : ''}`}
    >
      <View style={styles.iconContainer}>{getIcon()}</View>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: colors.subtext }]} accessibilityRole="text">{getAbbreviatedTitle(stat.title)}</Text>
        <Text style={[styles.value, { color: colors.text }]} accessibilityRole="text">{stat.value}</Text>
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: (screenWidth - 48) / 3,
    marginBottom: 8,
    marginRight: 6,
    height: 80,
  },
  iconContainer: {
    marginBottom: 6,
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 9,
    fontWeight: '600',
    marginBottom: 2,
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: 0.2,
    textAlign: 'center',
    lineHeight: 11,
  },
  value: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 2,
    letterSpacing: -0.2,
    lineHeight: 18,
    textAlign: 'center',
  },
  changeContainer: {
    marginTop: 1,
  },
  change: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.1,
    textAlign: 'center',
  },
});