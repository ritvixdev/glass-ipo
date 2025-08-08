import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface SkeletonItemProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  style?: ViewStyle;
}

interface SkeletonPlaceholderProps {
  children: React.ReactNode;
  backgroundColor?: string;
  highlightColor?: string;
  speed?: number;
}

const SkeletonItem: React.FC<SkeletonItemProps> = ({
  width = 100,
  height = 20,
  borderRadius = 4,
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  style,
}) => {
  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        style,
      ]}
    />
  );
};

const SkeletonPlaceholder: React.FC<SkeletonPlaceholderProps> & {
  Item: React.FC<SkeletonItemProps>;
} = ({
  children,
  backgroundColor = 'rgba(255, 255, 255, 0.05)',
  highlightColor = 'rgba(255, 255, 255, 0.15)',
  speed = 1000,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: speed,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: speed,
          useNativeDriver: false,
        }),
      ]).start(() => animate());
    };

    animate();
  }, [animatedValue, speed]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.8, 0.3],
  });

  return (
    <View style={styles.container}>
      {children}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            opacity,
          },
        ]}
      >
        <LinearGradient
          colors={[backgroundColor, highlightColor, backgroundColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};

SkeletonPlaceholder.Item = SkeletonItem;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default SkeletonPlaceholder;