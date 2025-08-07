import { GlassContainer } from "@/components/ui/GlassContainer";
import { useTheme } from "@/hooks/useTheme";
import { getIPOById } from "@/mocks/ipos";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { BookmarkPlus, Calendar, Clock, DollarSign, TrendingUp, Users } from "lucide-react-native";

export default function IPODetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, theme } = useTheme();
  
  const ipo = getIPOById(id);

  if (!ipo) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>IPO not found</Text>
      </View>
    );
  }

  const getStatusColor = () => {
    switch (ipo.status) {
      case 'live':
        return colors.success;
      case 'upcoming':
        return colors.warning;
      case 'listed':
        return colors.primary;
      default:
        return colors.subtext;
    }
  };

  const getStatusText = () => {
    switch (ipo.status) {
      case 'live':
        return 'Live Now';
      case 'upcoming':
        return 'Upcoming';
      case 'listed':
        return 'Listed';
      default:
        return '';
    }
  };

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
        <View style={styles.header}>
          <Image source={{ uri: ipo.logo }} style={styles.logo} contentFit="cover" />
          <View style={styles.headerContent}>
            <Text style={[styles.companyName, { color: colors.text }]}>{ipo.companyName}</Text>
            <Text style={[styles.symbol, { color: colors.subtext }]}>{ipo.symbol}</Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: getStatusColor(),
                },
              ]}
            >
              <Text style={styles.statusText}>{getStatusText()}</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.bookmarkButton, { backgroundColor: colors.card }]}>
            <BookmarkPlus size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.quickInfoContainer}>
          <GlassContainer style={styles.quickInfoItem}>
            <DollarSign size={20} color={colors.primary} />
            <Text style={[styles.quickInfoValue, { color: colors.text }]}>{ipo.priceRange}</Text>
            <Text style={[styles.quickInfoLabel, { color: colors.subtext }]}>Price Range</Text>
          </GlassContainer>
          
          <GlassContainer style={styles.quickInfoItem}>
            <Users size={20} color={colors.secondary} />
            <Text style={[styles.quickInfoValue, { color: colors.text }]}>{ipo.lotSize}</Text>
            <Text style={[styles.quickInfoLabel, { color: colors.subtext }]}>Lot Size</Text>
          </GlassContainer>
          
          <GlassContainer style={styles.quickInfoItem}>
            <Calendar size={20} color={colors.accent} />
            <Text style={[styles.quickInfoValue, { color: colors.text }]}>{ipo.openDate}</Text>
            <Text style={[styles.quickInfoLabel, { color: colors.subtext }]}>Open Date</Text>
          </GlassContainer>
        </View>

        {ipo.status === 'live' && ipo.subscriptionRate && (
          <GlassContainer style={styles.subscriptionContainer}>
            <View style={styles.subscriptionHeader}>
              <Text style={[styles.subscriptionTitle, { color: colors.text }]}>Subscription Status</Text>
              <Clock size={16} color={colors.subtext} />
            </View>
            <View style={styles.subscriptionContent}>
              <View style={styles.subscriptionInfo}>
                <Text style={[styles.subscriptionRate, { color: colors.success }]}>{ipo.subscriptionRate}x</Text>
                <Text style={[styles.subscriptionLabel, { color: colors.subtext }]}>Current Rate</Text>
              </View>
              <View style={styles.subscriptionProgress}>
                <View 
                  style={[
                    styles.progressBar, 
                    { 
                      backgroundColor: colors.border,
                      width: '100%'
                    }
                  ]}
                >
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        backgroundColor: colors.success,
                        width: `${Math.min(ipo.subscriptionRate / 10 * 100, 100)}%`
                      }
                    ]}
                  />
                </View>
                <Text style={[styles.progressText, { color: colors.subtext }]}>Target: 10x</Text>
              </View>
            </View>
          </GlassContainer>
        )}

        {ipo.status === 'listed' && ipo.listingGain && (
          <GlassContainer style={styles.listingContainer}>
            <View style={styles.listingHeader}>
              <Text style={[styles.listingTitle, { color: colors.text }]}>Listing Performance</Text>
              <TrendingUp size={16} color={ipo.listingGain >= 0 ? colors.success : colors.error} />
            </View>
            <View style={styles.listingContent}>
              <Text 
                style={[
                  styles.listingGain, 
                  { 
                    color: ipo.listingGain >= 0 ? colors.success : colors.error 
                  }
                ]}
              >
                {ipo.listingGain >= 0 ? '+' : ''}{ipo.listingGain}%
              </Text>
              <Text style={[styles.listingLabel, { color: colors.subtext }]}>
                Since listing on {ipo.listingDate}
              </Text>
            </View>
          </GlassContainer>
        )}

        <GlassContainer style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Company Overview</Text>
          <Text style={[styles.sectionContent, { color: colors.text }]}>{ipo.description}</Text>
        </GlassContainer>

        <GlassContainer style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Financial Highlights</Text>
          <View style={styles.financialGrid}>
            <View style={styles.financialItem}>
              <Text style={[styles.financialValue, { color: colors.text }]}>{ipo.financialHighlights.revenue}</Text>
              <Text style={[styles.financialLabel, { color: colors.subtext }]}>Revenue</Text>
            </View>
            <View style={styles.financialItem}>
              <Text style={[styles.financialValue, { color: colors.text }]}>{ipo.financialHighlights.profit}</Text>
              <Text style={[styles.financialLabel, { color: colors.subtext }]}>Profit</Text>
            </View>
            <View style={styles.financialItem}>
              <Text style={[styles.financialValue, { color: colors.text }]}>{ipo.financialHighlights.debtToEquity}</Text>
              <Text style={[styles.financialLabel, { color: colors.subtext }]}>Debt/Equity</Text>
            </View>
            <View style={styles.financialItem}>
              <Text style={[styles.financialValue, { color: colors.text }]}>{ipo.financialHighlights.roe}</Text>
              <Text style={[styles.financialLabel, { color: colors.subtext }]}>ROE</Text>
            </View>
          </View>
        </GlassContainer>

        <GlassContainer style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Issue Details</Text>
          <View style={styles.issueDetails}>
            <View style={styles.issueDetailRow}>
              <Text style={[styles.issueDetailLabel, { color: colors.subtext }]}>Issue Size</Text>
              <Text style={[styles.issueDetailValue, { color: colors.text }]}>{ipo.issueSize}</Text>
            </View>
            <View style={styles.issueDetailRow}>
              <Text style={[styles.issueDetailLabel, { color: colors.subtext }]}>Open Date</Text>
              <Text style={[styles.issueDetailValue, { color: colors.text }]}>{ipo.openDate}</Text>
            </View>
            <View style={styles.issueDetailRow}>
              <Text style={[styles.issueDetailLabel, { color: colors.subtext }]}>Close Date</Text>
              <Text style={[styles.issueDetailValue, { color: colors.text }]}>{ipo.closeDate}</Text>
            </View>
            <View style={styles.issueDetailRow}>
              <Text style={[styles.issueDetailLabel, { color: colors.subtext }]}>Listing Date</Text>
              <Text style={[styles.issueDetailValue, { color: colors.text }]}>{ipo.listingDate}</Text>
            </View>
            <View style={styles.issueDetailRow}>
              <Text style={[styles.issueDetailLabel, { color: colors.subtext }]}>Sector</Text>
              <Text style={[styles.issueDetailValue, { color: colors.text }]}>{ipo.sector}</Text>
            </View>
          </View>
        </GlassContainer>

        <GlassContainer style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Lead Managers</Text>
          <View style={styles.leadManagers}>
            {ipo.leadManagers.map((manager, index) => (
              <Text key={index} style={[styles.leadManager, { color: colors.text }]}>
                • {manager}
              </Text>
            ))}
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.registrarContainer}>
            <Text style={[styles.registrarLabel, { color: colors.subtext }]}>Registrar:</Text>
            <Text style={[styles.registrarValue, { color: colors.text }]}>{ipo.registrar}</Text>
          </View>
        </GlassContainer>

        <TouchableOpacity 
          style={[styles.applyButton, { backgroundColor: colors.primary }]}
          activeOpacity={0.8}
        >
          <Text style={styles.applyButtonText}>
            {ipo.status === 'live' ? 'Apply Now' : ipo.status === 'upcoming' ? 'Set Reminder' : 'View Market Price'}
          </Text>
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
    paddingTop: 100,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  headerContent: {
    flex: 1,
    marginLeft: 16,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  symbol: {
    fontSize: 16,
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  quickInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  quickInfoItem: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  quickInfoValue: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 4,
  },
  quickInfoLabel: {
    fontSize: 12,
  },
  subscriptionContainer: {
    padding: 16,
    marginBottom: 16,
  },
  subscriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  subscriptionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  subscriptionInfo: {
    marginRight: 16,
  },
  subscriptionRate: {
    fontSize: 24,
    fontWeight: "700",
  },
  subscriptionLabel: {
    fontSize: 12,
  },
  subscriptionProgress: {
    flex: 1,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "right",
  },
  listingContainer: {
    padding: 16,
    marginBottom: 16,
  },
  listingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  listingContent: {
    alignItems: "center",
  },
  listingGain: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
  },
  listingLabel: {
    fontSize: 14,
  },
  sectionContainer: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 22,
  },
  financialGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  financialItem: {
    width: "50%",
    marginBottom: 16,
  },
  financialValue: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  financialLabel: {
    fontSize: 12,
  },
  issueDetails: {
    marginBottom: 8,
  },
  issueDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  issueDetailLabel: {
    fontSize: 14,
  },
  issueDetailValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  leadManagers: {
    marginBottom: 12,
  },
  leadManager: {
    fontSize: 14,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    marginBottom: 12,
  },
  registrarContainer: {
    flexDirection: "row",
  },
  registrarLabel: {
    fontSize: 14,
    marginRight: 8,
  },
  registrarValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  applyButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
  },
});