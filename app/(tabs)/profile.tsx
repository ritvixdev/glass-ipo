import { GlassContainer } from "@/components/ui/GlassContainer";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch } from "react-native";
import { Image } from "expo-image";
import { Bell, BookmarkCheck, HelpCircle, LogOut, Moon, Settings, User } from "lucide-react-native";

export default function ProfileScreen() {
  const { colors, theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const profileOptions = [
    {
      icon: <BookmarkCheck size={22} color={colors.primary} />,
      title: "My Watchlist",
      subtitle: "View and manage your saved IPOs",
    },
    {
      icon: <Bell size={22} color={colors.secondary} />,
      title: "Notifications",
      subtitle: "Manage your notification preferences",
    },
    {
      icon: <Settings size={22} color={colors.accent} />,
      title: "App Settings",
      subtitle: "Configure app behavior and preferences",
    },
    {
      icon: <HelpCircle size={22} color={colors.warning} />,
      title: "Help & Support",
      subtitle: "Get assistance and view FAQs",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={theme === "dark" 
          ? ["#1A1D1F", "#111315"] 
          : ["#F5F7FA", "#FFFFFF"]}
        style={styles.gradient}
      />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <GlassContainer 
          style={styles.profileCard}
          elasticity={0.35}
          displacementScale={80}
          blurAmount={0.1}
          saturation={150}
          aberrationIntensity={2.2}
          cornerRadius={24}
        >
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={[styles.name, { color: colors.text }]}>Rahul Sharma</Text>
              <Text style={[styles.email, { color: colors.subtext }]}>rahul.sharma@example.com</Text>
            </View>
            <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]}>
              <User size={16} color="white" />
            </TouchableOpacity>
          </View>
        </GlassContainer>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          
          <GlassContainer 
            style={styles.themeToggleContainer}
            elasticity={0.25}
            displacementScale={45}
            blurAmount={0.06}
            saturation={125}
            aberrationIntensity={1.5}
            cornerRadius={16}
          >
            <View style={styles.themeToggleContent}>
              <Moon size={22} color={colors.text} />
              <Text style={[styles.themeToggleText, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={theme === "dark"}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="white"
            />
          </GlassContainer>
          
          {profileOptions.map((option, index) => (
            <TouchableOpacity key={index} activeOpacity={0.7}>
              <GlassContainer 
                style={styles.optionContainer}
                elasticity={0.2}
                displacementScale={35}
                blurAmount={0.04}
                saturation={115}
                aberrationIntensity={1.0}
                cornerRadius={12}
              >
                <View style={styles.optionIcon}>{option.icon}</View>
                <View style={styles.optionContent}>
                  <Text style={[styles.optionTitle, { color: colors.text }]}>{option.title}</Text>
                  <Text style={[styles.optionSubtitle, { color: colors.subtext }]}>{option.subtitle}</Text>
                </View>
              </GlassContainer>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity activeOpacity={0.7}>
          <GlassContainer 
            style={styles.logoutContainer}
            elasticity={0.3}
            displacementScale={50}
            blurAmount={0.07}
            saturation={120}
            aberrationIntensity={1.8}
            cornerRadius={16}
          >
            <LogOut size={20} color={colors.error} />
            <Text style={[styles.logoutText, { color: colors.error }]}>Log Out</Text>
          </GlassContainer>
        </TouchableOpacity>
      </ScrollView>
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
    height: 300,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  profileCard: {
    marginBottom: 24,
    padding: 16,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  themeToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 12,
  },
  themeToggleContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  themeToggleText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  optionContent: {
    flex: 1,
    marginLeft: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
});