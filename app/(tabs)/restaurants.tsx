import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { mockRestaurants, cuisineTypes } from '../../data/mockData';
import { useReviews } from '../../contexts/ReviewContext';
import FirebaseStatus from '../../components/FirebaseStatus';
import { Colors } from '../../constants/Colors';
import { Card, ImageView } from '../../components/ui';

const RATING_FILTERS = ['Tümü', '4+', '4.5+', '5'];

// Convert restaurant data to simplified format for the UI
const RESTAURANTS_DATA = mockRestaurants.map(restaurant => ({
  id: restaurant.id,
  name: restaurant.name,
  cuisine: restaurant.cuisine[0], // Take first cuisine type
  description: restaurant.description,
  rating: restaurant.rating,
  deliveryTime: restaurant.deliveryTime,
  deliveryFee: restaurant.deliveryFee,
  minimumOrder: restaurant.minimumOrder,
  image: restaurant.image,
  specialDishes: restaurant.cuisine.slice(0, 3), // Use cuisine types as dishes
  address: `${restaurant.address.street}, ${restaurant.address.city}`,
  isOpen: restaurant.isOpen,
}));

export default function RestaurantsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('Tümü');
  const [selectedRating, setSelectedRating] = useState('Tümü');
  const [showFilters, setShowFilters] = useState(false);
  
  const { getAverageRating, getReviewCount } = useReviews();

  const filteredRestaurants = RESTAURANTS_DATA.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.specialDishes.some(dish => dish.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCuisine = selectedCuisine === 'Tümü' || restaurant.cuisine === selectedCuisine;
    
    let matchesRating = true;
    if (selectedRating === '4+') matchesRating = restaurant.rating >= 4.0;
    else if (selectedRating === '4.5+') matchesRating = restaurant.rating >= 4.5;
    else if (selectedRating === '5') matchesRating = restaurant.rating === 5.0;
    
    return matchesSearch && matchesCuisine && matchesRating;
  });

  const renderRestaurant = ({ item }: { item: typeof RESTAURANTS_DATA[0] }) => (
    <Card variant="default" padding="none" style={styles.restaurantCard}>
      <TouchableOpacity onPress={() => router.push(`/(tabs)/restaurant/${item.id}`)}>
        <View style={styles.restaurantImage}>
          <ImageView
            source={item.image}
            width={340}
            height={140}
            borderRadius={0}
            placeholder="restaurant"
          />
          {!item.isOpen && (
            <View style={styles.closedOverlay}>
              <Text style={styles.closedText}>Kapalı</Text>
            </View>
          )}
        </View>
        
        <View style={styles.restaurantInfo}>
          <View style={styles.restaurantHeader}>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={Colors.system.warning} />
              <Text style={styles.rating}>
                {getAverageRating(item.id) > 0 ? getAverageRating(item.id).toFixed(1) : item.rating}
              </Text>
            </View>
          </View>
          
          <Text style={styles.cuisineType}>{item.cuisine} Mutfağı</Text>
          <Text style={styles.description}>{item.description}</Text>
          
          <View style={styles.dishesContainer}>
            {item.specialDishes.slice(0, 3).map((dish, index) => (
              <View key={index} style={styles.dishTag}>
                <Text style={styles.dishText}>{dish}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.restaurantFooter}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Ionicons name="time" size={14} color={Colors.text.secondary} />
                <Text style={styles.infoText}>{item.deliveryTime}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="bicycle" size={14} color={Colors.text.secondary} />
                <Text style={styles.infoText}>₺{item.deliveryFee}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="wallet" size={14} color={Colors.text.secondary} />
                <Text style={styles.infoText}>Min ₺{item.minimumOrder}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Firebase Status */}
      <FirebaseStatus />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Restoranlar</Text>
        <View style={styles.headerStats}>
          <Text style={styles.statsText}>{filteredRestaurants.length} restoran</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Restoran veya yemek ara..."
            placeholderTextColor={Colors.text.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={[styles.filterButton, showFilters && styles.filterButtonActive]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons name="options" size={20} color={showFilters ? Colors.text.white : Colors.secondary.main} />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      {showFilters && (
        <Card variant="warm" padding="medium" style={styles.filtersCard}>
          {/* Cuisine Filter */}
          <Text style={styles.filterTitle}>Mutfak Türü</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {cuisineTypes.map((cuisine: string) => (
              <TouchableOpacity
                key={cuisine}
                style={[
                  styles.filterChip,
                  selectedCuisine === cuisine && styles.filterChipActive,
                ]}
                onPress={() => setSelectedCuisine(cuisine)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedCuisine === cuisine && styles.filterChipTextActive,
                  ]}
                >
                  {cuisine}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Rating Filter */}
          <Text style={styles.filterTitle}>Puan</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {RATING_FILTERS.map((rating) => (
              <TouchableOpacity
                key={rating}
                style={[
                  styles.filterChip,
                  selectedRating === rating && styles.filterChipActive,
                ]}
                onPress={() => setSelectedRating(rating)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedRating === rating && styles.filterChipTextActive,
                  ]}
                >
                  {rating === 'Tümü' ? rating : `${rating} ⭐`}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Card>
      )}

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredRestaurants.length} restoran bulundu
        </Text>
        {(selectedCuisine !== 'Tümü' || selectedRating !== 'Tümü' || searchQuery.length > 0) && (
          <TouchableOpacity
            onPress={() => {
              setSelectedCuisine('Tümü');
              setSelectedRating('Tümü');
              setSearchQuery('');
            }}
          >
            <Text style={styles.clearFilters}>Filtreleri Temizle</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Restaurant List */}
      <FlatList
        data={filteredRestaurants}
        renderItem={renderRestaurant}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.restaurantsList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={64} color={Colors.text.muted} />
            <Text style={styles.emptyStateTitle}>Restoran Bulunamadı</Text>
            <Text style={styles.emptyStateSubtitle}>
              Arama kriterlerinizi değiştirmeyi deneyin
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.accent.main,
  },
  headerStats: {
    backgroundColor: Colors.secondary.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statsText: {
    fontSize: 12,
    color: Colors.secondary.main,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: Colors.accent.main,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.text.primary,
  },
  filterButton: {
    width: 52,
    height: 52,
    backgroundColor: Colors.primary.card,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accent.main,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  filterButtonActive: {
    backgroundColor: Colors.secondary.main,
  },
  filtersCard: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.accent.main,
    marginBottom: 12,
    marginTop: 8,
  },
  filterScroll: {
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.primary.card,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  filterChipActive: {
    backgroundColor: Colors.secondary.main,
    borderColor: Colors.secondary.main,
  },
  filterChipText: {
    fontSize: 14,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: Colors.text.white,
    fontWeight: '600',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  clearFilters: {
    fontSize: 14,
    color: Colors.secondary.main,
    fontWeight: '600',
  },
  restaurantsList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  restaurantCard: {
    marginBottom: 20,
    overflow: 'hidden',
  },
  restaurantImage: {
    height: 140,
    backgroundColor: Colors.primary.surface,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  closedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closedText: {
    color: Colors.text.white,
    fontSize: 18,
    fontWeight: '700',
  },
  restaurantInfo: {
    padding: 20,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    flex: 1,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.secondary.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  cuisineType: {
    fontSize: 14,
    color: Colors.secondary.main,
    fontWeight: '600',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  dishesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  dishTag: {
    backgroundColor: Colors.secondary.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  dishText: {
    fontSize: 12,
    color: Colors.secondary.main,
    fontWeight: '500',
  },
  restaurantFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    paddingTop: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  infoText: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
}); 