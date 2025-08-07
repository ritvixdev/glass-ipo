import { IPOTabView } from "@/components/IPOTabView";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function SMEIPOScreen() {
  const { colors, theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={theme === "dark" 
          ? ["#1A1D1F", "#111315"] 
          : ["#F5F7FA", "#FFFFFF"]}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <IPOTabView category="sme" />
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
    height: 200,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});