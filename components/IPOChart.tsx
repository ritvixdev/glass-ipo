import { GlassContainer } from '@/components/ui/GlassContainer';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Rect, Text as SvgText } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

interface ChartDataPoint {
  value: number;
  label: string;
  color?: string;
}

interface IPOChartProps {
  type: 'line' | 'bar' | 'pie';
  data: ChartDataPoint[];
  title?: string;
  height?: number;
}

export const IPOChart: React.FC<IPOChartProps> = ({ 
  type, 
  data, 
  title, 
  height = 220 
}) => {
  const { colors } = useTheme();
  const chartWidth = screenWidth - 64;
  const chartHeight = height - 40;

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  const renderLineChart = () => {
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * (chartWidth - 40) + 20;
      const y = chartHeight - ((point.value - minValue) / range) * (chartHeight - 40) + 20;
      return { x, y, value: point.value, label: point.label };
    });

    return (
      <Svg width={chartWidth} height={chartHeight + 40}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percent, index) => {
          const y = chartHeight - (percent / 100) * (chartHeight - 40) + 20;
          return (
            <Line
              key={index}
              x1="20"
              y1={y}
              x2={chartWidth - 20}
              y2={y}
              stroke={colors.border}
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          );
        })}
        
        {/* Line path */}
        {points.map((point, index) => {
          if (index === 0) return null;
          const prevPoint = points[index - 1];
          return (
            <Line
              key={index}
              x1={prevPoint.x}
              y1={prevPoint.y}
              x2={point.x}
              y2={point.y}
              stroke={colors.primary}
              strokeWidth="2"
            />
          );
        })}
        
        {/* Data points */}
        {points.map((point, index) => (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={colors.primary}
            stroke="white"
            strokeWidth="2"
          />
        ))}
        
        {/* Labels */}
        {points.map((point, index) => (
          <SvgText
            key={index}
            x={point.x}
            y={chartHeight + 15}
            textAnchor="middle"
            fontSize="10"
            fill={colors.subtext}
          >
            {point.label}
          </SvgText>
        ))}
      </Svg>
    );
  };

  const renderBarChart = () => {
    const barWidth = (chartWidth - 60) / data.length;
    const barSpacing = 10;
    
    return (
      <Svg width={chartWidth} height={chartHeight + 40}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percent, index) => {
          const y = chartHeight - (percent / 100) * (chartHeight - 40) + 20;
          return (
            <Line
              key={index}
              x1="20"
              y1={y}
              x2={chartWidth - 20}
              y2={y}
              stroke={colors.border}
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          );
        })}
        
        {/* Bars */}
        {data.map((point, index) => {
          const barHeight = ((point.value - minValue) / range) * (chartHeight - 40);
          const x = 20 + index * (barWidth + barSpacing);
          const y = chartHeight - barHeight;
          
          return (
            <Rect
              key={index}
              x={x}
              y={y}
              width={barWidth - barSpacing}
              height={barHeight}
              fill={point.color || colors.primary}
              rx="2"
            />
          );
        })}
        
        {/* Labels */}
        {data.map((point, index) => {
          const x = 20 + index * (barWidth + barSpacing) + (barWidth - barSpacing) / 2;
          return (
            <SvgText
              key={index}
              x={x}
              y={chartHeight + 15}
              textAnchor="middle"
              fontSize="10"
              fill={colors.subtext}
            >
              {point.label}
            </SvgText>
          );
        })}
      </Svg>
    );
  };

  const renderPieChart = () => {
    const centerX = chartWidth / 2;
    const centerY = chartHeight / 2;
    const radius = Math.min(centerX, centerY) - 40;
    const total = data.reduce((sum, point) => sum + point.value, 0);
    
    let currentAngle = 0;
    
    return (
      <Svg width={chartWidth} height={chartHeight + 40}>
        {data.map((point, index) => {
          const angle = (point.value / total) * 2 * Math.PI;
          const largeArcFlag = angle > Math.PI ? 1 : 0;
          
          const x1 = centerX + radius * Math.cos(currentAngle);
          const y1 = centerY + radius * Math.sin(currentAngle);
          
          currentAngle += angle;
          
          const x2 = centerX + radius * Math.cos(currentAngle);
          const y2 = centerY + radius * Math.sin(currentAngle);
          
          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');
          
          return (
            <path
              key={index}
              d={pathData}
              fill={point.color || `hsl(${(index * 137.5) % 360}, 70%, 60%)`}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </Svg>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return renderLineChart();
      case 'bar':
        return renderBarChart();
      case 'pie':
        return renderPieChart();
      default:
        return null;
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
      {title && (
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      )}
      <View style={styles.chartContainer}>
        {renderChart()}
      </View>
    </GlassContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    borderRadius: 16,
  },
});