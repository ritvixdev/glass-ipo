import { IPOChart } from '@/components/IPOChart';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IPOPerformanceData {
  name: string;
  listingPrice: number;
  currentPrice: number;
  performance: number;
  volume: number;
}

interface IPOPerformanceChartProps {
  data: IPOPerformanceData[];
}

export const IPOPerformanceChart: React.FC<IPOPerformanceChartProps> = ({ data }) => {
  const { colors } = useTheme();

  const lineChartData = data.map(item => ({
    label: item.name.slice(0, 4),
    value: item.performance,
    color: colors.primary,
  }));

  const barChartData = data.map(item => ({
    label: item.name.slice(0, 4),
    value: item.volume / 1000000,
    color: colors.primary,
  }));

  const pieChartData = data.slice(0, 5).map((item, index) => ({
    label: item.name.slice(0, 8),
    value: Math.abs(item.performance),
    color: index === 0 ? colors.primary : 
           index === 1 ? colors.secondary :
           index === 2 ? colors.accent :
           index === 3 ? colors.success :
           colors.warning,
  }));

  return (
    <View style={styles.container}>
      <IPOChart
        type="line"
        data={lineChartData}
        title="IPO Performance Trend (%)"
        height={200}
      />
      
      <IPOChart
        type="bar"
        data={barChartData}
        title="Trading Volume (M shares)"
        height={180}
      />
      
      <IPOChart
        type="pie"
        data={pieChartData}
        title="Performance Distribution"
        height={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});