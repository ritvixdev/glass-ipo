import { StatsCard } from "@/components/StatsCard";
import { IPOCard } from "@/components/IPOCard";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { useTheme } from "@/hooks/useTheme";
import { getIPOsByStatus, quickStats } from "@/mocks/ipos";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, RefreshControl, TextInput } from "react-native";
import { Bell, Search } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SearchModal } from "@/components/SearchModal";

export default function DashboardScreen() {
  const { colors, theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  const liveIPOs = useMemo(() => getIPOsByStatus("live", "all").slice(0, 3), []);
  const upcomingIPOs = useMemo(() => getIPOsByStatus("upcoming", "all").slice(0, 2), []);

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
        <Text style={[styles.title, { color: colors.text }]}>IPO Tracker</Text>
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsScrollContainer}
          style={styles.quickStatsContainer}
        >
          {quickStats.map((stat, index) => (
            <StatsCard key={index} stat={stat} />
          ))}
        </ScrollView>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Live IPOs</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          {liveIPOs.map((ipo) => (
            <IPOCard key={ipo.id} ipo={ipo} />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Upcoming IPOs</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          {upcomingIPOs.map((ipo) => (
            <IPOCard key={ipo.id} ipo={ipo} />
          ))}
        </View>
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
  greeting: {
    fontSize: 14,
    marginBottom: 4,
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
  quickStatsContainer: {
    marginBottom: 32,
  },
  statsScrollContainer: {
    paddingHorizontal: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "500",
  },
});