import { IPOCard } from '@/components/IPOCard';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { useTheme } from '@/hooks/useTheme';
import { getIPOsByStatus } from '@/mocks/ipos';
import { IPOCategory, IPOStatus } from '@/types/ipo';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

interface IPOTabViewProps {
  category: IPOCategory;
  isLoading?: boolean;
}

export const IPOTabView: React.FC<IPOTabViewProps> = ({ category, isLoading = false }) => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<IPOStatus>('live');

  const tabs: { key: IPOStatus; label: string }[] = [
    { key: 'live', label: 'Live' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'listed', label: 'Listed' },
  ];

  const ipos = getIPOsByStatus(activeTab, category);

  return (
    <View style={styles.container}>
      <GlassContainer 
        style={styles.tabContainer}
        elevation="low"
        variant="default"
        cornerRadius={16}
        padding={8}
        interactive={false}
      >
        <View style={styles.tabs}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && {
                  backgroundColor: colors.primary,
                },
              ]}
              onPress={() => setActiveTab(tab.key)}
              testID={`tab-${tab.key}`}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: activeTab === tab.key ? 'white' : colors.text,
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </GlassContainer>

      {isLoading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : ipos.length > 0 ? (
        <FlatList
          data={ipos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <IPOCard ipo={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.subtext }]}>
            No {activeTab} IPOs found
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    padding: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabText: {
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});