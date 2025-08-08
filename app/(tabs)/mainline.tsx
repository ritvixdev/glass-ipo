import { IPOTabView } from "@/components/IPOTabView";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function MainlineIPOScreen() {
  const { colors, theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={
          theme === 'dark'
            ? ['#0F1419', '#1A202C', '#2D3748']
            : ['#F0F8FF', '#E6F3FF', '#FAFBFC']
        }
        locations={theme === 'dark' ? [0, 0.4, 1] : [0, 0.7, 1]}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <IPOTabView category="mainline" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});