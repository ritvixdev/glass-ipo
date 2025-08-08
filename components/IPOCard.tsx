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

  if (isLoading) {
    return (
      <GlassContainer 
        style={styles.container}
        elasticity={0.25}
        displacementScale={60}
        blurAmount={0.08}
        saturation={120}
        aberrationIntensity={1.5}
        cornerRadius={20}
      >
        <SkeletonPlaceholder backgroundColor={colors.surface} highlightColor={colors.border}>
          <View style={styles.header}>
            <SkeletonPlaceholder.Item width={40} height={40} borderRadius={8} />
            <View style={styles.headerContent}>
              <SkeletonPlaceholder.Item width={120} height={16} borderRadius={4} />
              <SkeletonPlaceholder.Item width={60} height={14} borderRadius={4} marginTop={4} />
            </View>
            <SkeletonPlaceholder.Item width={60} height={20} borderRadius={12} />
          </View>

          <View style={[styles.divider, { marginVertical: 12 }]}>
            <SkeletonPlaceholder.Item width="100%" height={1} />
          </View>

          <View style={styles.details}>
            <View style={styles.detailRow}>
              <SkeletonPlaceholder.Item width={80} height={14} borderRadius={4} />
              <SkeletonPlaceholder.Item width={60} height={14} borderRadius={4} />
            </View>
            <View style={styles.detailRow}>
              <SkeletonPlaceholder.Item width={80} height={14} borderRadius={4} />
              <SkeletonPlaceholder.Item width={70} height={14} borderRadius={4} />
            </View>
            <View style={styles.detailRow}>
              <SkeletonPlaceholder.Item width={80} height={14} borderRadius={4} />
              <SkeletonPlaceholder.Item width={50} height={14} borderRadius={4} />
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerItem}>
              <SkeletonPlaceholder.Item width={16} height={16} borderRadius={2} />
              <SkeletonPlaceholder.Item width={100} height={12} borderRadius={4} marginLeft={4} />
            </View>
            <View style={styles.footerItem}>
              <SkeletonPlaceholder.Item width={16} height={16} borderRadius={2} />
              <SkeletonPlaceholder.Item width={40} height={12} borderRadius={4} marginLeft={4} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </GlassContainer>
    );
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8} testID={`ipo-card-${ipo.id}`}>
      <GlassContainer 
        style={styles.container}
        elasticity={0.25}
        displacementScale={60}
        blurAmount={0.08}
        saturation={120}
        aberrationIntensity={1.5}
        cornerRadius={20}
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
              <TrendingUp size={16} color={colors.success} />
              <Text style={[styles.footerText, { color: colors.success }]}>
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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  headerContent: {
    flex: 1,
    marginLeft: 12,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
  },
  symbol: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  details: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    marginLeft: 4,
  },
});