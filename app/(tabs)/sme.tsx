import { IPOTabView } from "@/components/IPOTabView";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from "react-native";
import { Bell, Moon, Sun } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SMEIPOScreen() {
  const { colors, theme, setTheme } = useTheme();
  const insets = useSafeAreaInsets();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor="transparent" 
        translucent 
      />
      <LinearGradient
        colors={
          theme === 'dark'
            ? ['#0F1419', '#1A202C', '#2D3748']
            : ['#F0F8FF', '#E6F3FF', '#FAFBFC']
        }
        locations={theme === 'dark' ? [0, 0.4, 1] : [0, 0.7, 1]}
        style={styles.gradient}
      />
      
      {/* Header with Title and Actions */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={[styles.title, { color: colors.text }]}>SME IPOs</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: colors.card }]}
            onPress={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun size={20} color={colors.text} />
            ) : (
              <Moon size={20} color={colors.text} />
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: colors.card }]}
          >
            <Bell size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
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
    bottom: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  headerActions: {
    flexDirection: "row",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});