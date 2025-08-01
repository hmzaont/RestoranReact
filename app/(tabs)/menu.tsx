import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Card, ImageView } from '../../components/ui';
import { mockMenuItems } from '../../data/mockData';
import { useCart } from '../../contexts/CartContext';

const CATEGORIES = [
  { id: 'all', name: 'Tümü', width: 60 },
  { id: 'pizza', name: 'Pizza', width: 55 },
  { id: 'burger', name: 'Burger', width: 65 },
  { id: 'sushi', name: 'Suşi', width: 50 },
  { id: 'kebap', name: 'Kebap', width: 65 },
  { id: 'pasta', name: 'Pasta', width: 55 },
  { id: 'dessert', name: 'Tatlı', width: 50 },
  { id: 'drink', name: 'İçecek', width: 65 },
];

export default function MenuScreen() {
  const { category } = useLocalSearchParams();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (category && typeof category === 'string') {
      setSelectedCategory(category);
    }
  }, [category]);

  const filteredItems = mockMenuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || 
                           item.category.toLowerCase() === selectedCategory ||
                           (selectedCategory === 'pizza' && item.category === 'Pizza') ||
                           (selectedCategory === 'burger' && item.category === 'Burger') ||
                           (selectedCategory === 'sushi' && item.category === 'Suşi') ||
                           (selectedCategory === 'kebap' && item.category === 'Kebap') ||
                           (selectedCategory === 'pasta' && item.category === 'Pasta') ||
                           (selectedCategory === 'dessert' && item.category === 'Tatlı') ||
                           (selectedCategory === 'drink' && item.category === 'İçecek');
    
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderMenuItem = ({ item }: { item: typeof mockMenuItems[0] }) => (
    <Card variant="default" padding="none" style={styles.menuItem}>
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.itemImageContainer}>
          <ImageView
            source={item.image}
            width={100}
            height={100}
            borderRadius={16}
            placeholder="food"
          />
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color={Colors.system.warning} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          
          <View style={styles.itemTags}>
            {item.isVegan && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>🌱 Vegan</Text>
              </View>
            )}
            {item.isGlutenFree && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>🌾 Glutensiz</Text>
              </View>
            )}
          </View>
          
          <View style={styles.itemFooter}>
            <Text style={styles.itemPrice}>₺{item.price}</Text>
            <TouchableOpacity 
              style={styles.addToCartButton}
              onPress={() => {
                addToCart({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  image: item.image || '',
                  restaurant: 'RestoranPro',
                  description: item.description || ''
                });
              }}
            >
              <Ionicons name="add" size={18} color={Colors.text.white} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );

  const renderCategory = ({ item }: { item: typeof CATEGORIES[0] }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Menü</Text>
        <Text style={styles.subtitle}>{filteredItems.length} ürün bulundu</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Yemek ara..."
            placeholderTextColor={Colors.text.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={20} color={Colors.secondary.main} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
          style={styles.categoriesContainer}
        />
      </View>

      {/* Menu Items */}
      <FlatList
        data={filteredItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={64} color={Colors.text.muted} />
            <Text style={styles.emptyStateTitle}>Ürün Bulunamadı</Text>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.accent.main,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
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
  categoriesWrapper: {
    height: 60,
    marginBottom: 16,
  },
  categoriesContainer: {
    flexGrow: 0,
  },
  categoriesContent: {
    paddingHorizontal: 24,
    alignItems: 'center',
    height: 44,
  },
  categoryButton: {
    minWidth: 80,
    height: 44,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.border.light,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: Colors.secondary.main,
    borderColor: Colors.secondary.main,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
    textAlign: 'center',
  },
  categoryTextActive: {
    color: Colors.text.white,
  },
  menuList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  menuItem: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    minHeight: 120,
  },
  itemImageContainer: {
    position: 'relative',
    marginRight: 16,
    width: 100,
    height: 100,
  },
  ratingBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary.card,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: Colors.accent.main,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 100,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 6,
  },
  itemDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 8,
    flex: 1,
  },
  itemTags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Colors.secondary.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.secondary.main,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.secondary.main,
  },
  addToCartButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.secondary.main,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.secondary.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
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