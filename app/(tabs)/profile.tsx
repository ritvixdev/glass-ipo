import { GlassContainer } from "@/components/ui/GlassContainer";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch, StatusBar, TextInput } from "react-native";
import { Image } from "expo-image";
import { Bell, BookmarkCheck, HelpCircle, LogOut, Moon, Settings, User, Sun, Search } from "lucide-react-native";
import { SearchModal } from "@/components/SearchModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { colors, theme, setTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchModalVisible, setSearchModalVisible] = useState(false);

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
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.searchIconButton}
            onPress={() => setSearchModalVisible(true)}
          >
            <Search size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: colors.card }]}
          >
            <Bell size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <GlassContainer 
          style={styles.profileCard}
          elevation="medium"
          variant="default"
          cornerRadius={20}
          padding={24}
          interactive={false}
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
            elevation="medium"
            variant="default"
            cornerRadius={16}
            padding={20}
            interactive={false}
          >
            <View style={styles.themeToggleRow}>
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
            </View>
          </GlassContainer>
          
          {profileOptions.map((option, index) => (
            <TouchableOpacity key={index} activeOpacity={0.95}>
              <GlassContainer 
                style={styles.optionContainer}
                elevation="low"
                variant="default"
                cornerRadius={16}
                padding={20}
                interactive={true}
              >
                <View style={styles.optionRow}>
                  <View style={styles.optionIcon}>{option.icon}</View>
                  <View style={styles.optionContent}>
                    <Text style={[styles.optionTitle, { color: colors.text }]}>{option.title}</Text>
                    <Text style={[styles.optionSubtitle, { color: colors.subtext }]}>{option.subtitle}</Text>
                  </View>
                </View>
              </GlassContainer>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity activeOpacity={0.95}>
          <GlassContainer 
            style={styles.logoutContainer}
            elevation="medium"
            variant="outlined"
            cornerRadius={16}
            padding={20}
            interactive={true}
          >
            <LogOut size={20} color={colors.error} />
            <Text style={[styles.logoutText, { color: colors.error }]}>Log Out</Text>
          </GlassContainer>
        </TouchableOpacity>
      </ScrollView>
      
      <SearchModal 
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
      />
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
    alignItems: "center",
  },
  searchIconButton: {
    padding: 8,
    marginRight: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  profileCard: {
    marginBottom: 32,
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
    marginBottom: 16,
  },
  themeToggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
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
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
});