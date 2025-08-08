import { GlassContainer } from '@/components/ui/GlassContainer';
import { useTheme } from '@/hooks/useTheme';
import { IPO } from '@/types/ipo';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, TrendingUp } from 'lucide-react-native';
import SkeletonPlaceholder from '@/components/ui/SkeletonPlaceholder';

interface IPOCardProps {
  ipo: IPO;
  isLoading?: boolean;
}

export const IPOCard: React.FC<IPOCardProps> = ({ ipo, isLoading = false }) => {
  const { colors } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push(`/ipo/${ipo.id}`);
  };

  const getStatusColor = () => {
    switch (ipo.status) {
      case 'live':
        return colors.accent;
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

  if (isLoading) {
    return (
      <GlassContainer 
        style={styles.container}
        elevation="medium"
        variant="default"
        cornerRadius={16}
        padding={20}
        interactive={false}
      >
        <SkeletonPlaceholder>
          <View style={styles.header}>
            <SkeletonPlaceholder.Item width={48} height={48} borderRadius={12} />
            <View style={styles.headerContent}>
              <SkeletonPlaceholder.Item width={140} height={18} borderRadius={6} marginBottom={6} />
              <SkeletonPlaceholder.Item width={90} height={14} borderRadius={4} />
            </View>
            <SkeletonPlaceholder.Item width={70} height={28} borderRadius={14} />
          </View>
          <SkeletonPlaceholder.Item width="100%" height={1} borderRadius={0} marginVertical={16} />
          <View style={styles.details}>
            <View style={styles.detailRow}>
              <SkeletonPlaceholder.Item width={90} height={16} borderRadius={4} />
              <SkeletonPlaceholder.Item width={70} height={16} borderRadius={4} />
            </View>
            <View style={styles.detailRow}>
              <SkeletonPlaceholder.Item width={80} height={16} borderRadius={4} />
              <SkeletonPlaceholder.Item width={90} height={16} borderRadius={4} />
            </View>
            <View style={styles.detailRow}>
              <SkeletonPlaceholder.Item width={100} height={16} borderRadius={4} />
              <SkeletonPlaceholder.Item width={80} height={16} borderRadius={4} />
            </View>
          </View>
          <View style={styles.footer}>
            <SkeletonPlaceholder.Item width={90} height={14} borderRadius={4} />
            <SkeletonPlaceholder.Item width={110} height={14} borderRadius={4} />
          </View>
        </SkeletonPlaceholder>
      </GlassContainer>
    );
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.95}>
      <GlassContainer 
         style={styles.container}
         elevation="medium"
         variant="default"
         cornerRadius={16}
         padding={20}
         interactive={true}
       >
        <View style={styles.header}>
          <Image source={{ uri: ipo.logo }} style={styles.logo} contentFit="cover" />
          <View style={styles.headerContent}>
            <Text style={[styles.companyName, { color: colors.text }]} numberOfLines={1}>
              {ipo.companyName}
            </Text>
            <Text style={[styles.symbol, { color: colors.subtext }]}>{ipo.symbol}</Text>
          </View>
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

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.subtext }]}>Price Range</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{ipo.priceRange}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.subtext }]}>Lot Size</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{ipo.lotSize} shares</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.subtext }]}>Issue Size</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{ipo.issueSize}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Calendar size={16} color={colors.subtext} />
            <Text style={[styles.footerText, { color: colors.subtext }]}>
              {ipo.status === 'listed'
                ? `Listed: ${ipo.listingDate}`
                : `Opens: ${ipo.openDate}`}
            </Text>
          </View>
          {ipo.status === 'live' && ipo.subscriptionRate && (
            <View style={styles.footerItem}>
              <TrendingUp size={16} color={parseFloat(ipo.subscriptionRate) > 5 ? colors.accent : colors.success} />
              <Text style={[styles.footerText, { color: parseFloat(ipo.subscriptionRate) > 5 ? colors.accent : colors.success }]}>
                {ipo.subscriptionRate}x
              </Text>
            </View>
          )}
          {ipo.status === 'listed' && ipo.listingGain && (
            <View style={styles.footerItem}>
              <TrendingUp
                size={16}
                color={ipo.listingGain >= 0 ? colors.success : colors.error}
              />
              <Text
                style={[
                  styles.footerText,
                  {
                    color: ipo.listingGain >= 0 ? colors.success : colors.error,
                  },
                ]}
              >
                {ipo.listingGain >= 0 ? '+' : ''}
                {ipo.listingGain}%
              </Text>
            </View>
          )}
        </View>
      </GlassContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  headerContent: {
    flex: 1,
    marginLeft: 16,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  symbol: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    marginVertical: 16,
    opacity: 0.1,
  },
  details: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: '500',
    opacity: 0.8,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    marginLeft: 6,
    fontWeight: '500',
    opacity: 0.7,
  },
});