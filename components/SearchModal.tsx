import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  Easing,
  FlatList,
  Pressable,
} from 'react-native';
import { Search, X, TrendingUp, ArrowUpDown, Clock, Star, Zap } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { IPOCard } from './IPOCard';
import { getAllIPOs } from '@/mocks/ipos';
import { IPO } from '@/types/ipo';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  category?: 'all' | 'mainline' | 'sme';
}

type SortOption = 'relevance' | 'alphabetical' | 'issueSize' | 'openDate' | 'subscriptionRate' | 'listingGain';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SEARCH_SUGGESTIONS = [
  'Financial Services', 'Technology', 'Healthcare', 'Electric Vehicles',
  'Food Delivery', 'Media', 'Engineering', 'Banking'
];

const RECENT_SEARCHES = [
  'Bajaj Housing', 'Tata Technologies', 'Swiggy'
];

export function SearchModal({ visible, onClose, category = 'all' }: SearchModalProps) {
  const { colors, theme } = useTheme();
  const insets = useSafeAreaInsets();
  const searchInputRef = useRef<TextInput>(null);
  
  // Enhanced state management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Animation states
  const [slideAnim] = useState(new Animated.Value(screenHeight));
  const [opacityAnim] = useState(new Animated.Value(0));

  const allIPOs = useMemo(() => getAllIPOs(), []);

  const filteredAndSortedIPOs = useMemo(() => {
    let filtered = allIPOs;

    // Filter by category first
    if (category !== 'all') {
      filtered = filtered.filter(ipo => ipo.category === category);
    }

    // Filter by status
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(ipo => ipo.status === selectedFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(ipo => 
        ipo.companyName.toLowerCase().includes(query) ||
        ipo.symbol.toLowerCase().includes(query) ||
        ipo.sector?.toLowerCase().includes(query) ||
        ipo.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allIPOs, searchQuery, selectedFilter, category]);

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Focus search input after animation
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: screenHeight,
          duration: 250,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);



  const handleClose = () => {
    setSearchQuery('');
    setSelectedFilter('all');
    onClose();
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const categoryFilteredIPOs = useMemo(() => {
    return category === 'all' ? allIPOs : allIPOs.filter(ipo => ipo.category === category);
  }, [allIPOs, category]);

  const filterOptions = [
    { key: 'all', label: 'All', count: categoryFilteredIPOs.length },
    { key: 'live', label: 'Live', count: categoryFilteredIPOs.filter(ipo => ipo.status === 'live').length },
    { key: 'upcoming', label: 'Upcoming', count: categoryFilteredIPOs.filter(ipo => ipo.status === 'upcoming').length },
    { key: 'listed', label: 'Listed', count: categoryFilteredIPOs.filter(ipo => ipo.status === 'listed').length },
  ];

  const sortOptions = [
    { key: 'relevance', label: 'Relevance', icon: Star },
    { key: 'alphabetical', label: 'A-Z', icon: ArrowUpDown },
    { key: 'issueSize', label: 'Issue Size', icon: TrendingUp },
    { key: 'openDate', label: 'Date', icon: Clock },
    { key: 'subscriptionRate', label: 'Subscription', icon: Zap },
    { key: 'listingGain', label: 'Listing Gain', icon: TrendingUp },
  ];



  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Backdrop */}
      <Animated.View 
        style={[styles.backdrop, { opacity: opacityAnim }]}
      >
        <BlurView
          intensity={theme === 'dark' ? 20 : 40}
          tint={theme === 'dark' ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
        <TouchableOpacity 
          style={StyleSheet.absoluteFill} 
          onPress={handleClose}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Modal Content */}
      <Animated.View 
        style={[
          styles.modalContainer,
          {
            backgroundColor: colors.background,
            paddingTop: insets.top + 20,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        {/* Header */}
        <View style={styles.modalHeader}>
          <View style={styles.headerLeft}>
            <View style={[styles.searchIconContainer, { backgroundColor: colors.primary + '20' }]}>
              <Search size={24} color={colors.primary} />
            </View>
            <View>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Search {category === 'all' ? 'IPOs' : category === 'mainline' ? 'Mainline' : 'SME'}
              </Text>
              <Text style={[styles.modalSubtitle, { color: colors.subtext }]}>
                {categoryFilteredIPOs.length} available
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.closeButton, { backgroundColor: colors.card }]}
            onPress={handleClose}
          >
            <X size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Search Input */}
        <View style={[styles.searchInputContainer, { backgroundColor: colors.card }]}>
          <Search size={20} color={colors.subtext} />
          <TextInput
            ref={searchInputRef}
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search companies, symbols, sectors..."
            placeholderTextColor={colors.subtext}
            value={searchQuery}
            onChangeText={handleSearchChange}

            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearchChange('')}>
              <X size={16} color={colors.subtext} />
            </TouchableOpacity>
          )}
        </View>



        {/* Filter Tabs and Controls */}
        <View style={styles.filterSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}
            contentContainerStyle={styles.filterContent}
          >
            {filterOptions.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterTab,
                  {
                    backgroundColor: selectedFilter === filter.key ? colors.primary : colors.card,
                  }
                ]}
                onPress={() => setSelectedFilter(filter.key as any)}
              >
                <Text 
                  style={[
                    styles.filterTabText,
                    {
                      color: selectedFilter === filter.key ? 'white' : colors.text,
                      fontWeight: selectedFilter === filter.key ? '600' : '500',
                    }
                  ]}
                >
                  {filter.label}
                </Text>
                <Text 
                  style={[
                    styles.filterTabCount,
                    {
                      color: selectedFilter === filter.key ? 'rgba(255,255,255,0.8)' : colors.subtext,
                    }
                  ]}
                >
                  {filter.count}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          

        </View>



        {/* Results */}
        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <Text style={[styles.resultsCount, { color: colors.text }]}>
              {filteredAndSortedIPOs.length} IPO{filteredAndSortedIPOs.length !== 1 ? 's' : ''} found
            </Text>
            {searchQuery && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={[styles.clearSearch, { color: colors.primary }]}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>

          {filteredAndSortedIPOs.length === 0 ? (
            <View style={styles.emptyState}>
              <Search size={48} color={colors.subtext} />
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No IPOs found</Text>
              <Text style={[styles.emptySubtitle, { color: colors.subtext }]}>
                {searchQuery ? `No results for "${searchQuery}"` : 'Try adjusting your filters'}
              </Text>

            </View>
          ) : (
            <FlatList
              data={filteredAndSortedIPOs}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <IPOCard 
                  ipo={item} 
                  onPress={() => {
                    onClose();
                    // Navigate to IPO details
                  }}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              removeClippedSubviews={true}
              maxToRenderPerBatch={10}
              windowSize={10}
            />
          )}
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    marginTop: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  modalSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    height: 24,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterContainer: {
    marginBottom: 8,
  },
  filterContent: {
    paddingHorizontal: 4,
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterTabText: {
    fontSize: 12,
    lineHeight: 12,
    marginRight: 4,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  filterTabCount: {
    fontSize: 11,
    lineHeight: 11,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  resultsInfo: {
    flex: 1,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 20,
  },
  clearSearch: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  emptyAction: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  emptyActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});