import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useReviews } from '../../contexts/ReviewContext';
import { Colors } from '../../constants/Colors';
import { Card, Button, ImageView } from '../../components/ui';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: '1', name: 'Pizza', icon: 'pizza-outline', color: Colors.secondary.main },
  { id: '2', name: 'Burger', icon: 'fast-food-outline', color: Colors.accent.light },
  { id: '3', name: 'Suşi', icon: 'fish-outline', color: Colors.secondary.light },
  { id: '4', name: 'Tatlılar', icon: 'ice-cream-outline', color: Colors.system.warning },
  { id: '5', name: 'İçecekler', icon: 'wine-outline', color: Colors.accent.main },
];

const POPULAR_DISHES = [
  { id: '1', name: 'Adana Kebap', restaurant: 'Ottoman Sarayı', price: '85₺', rating: '4.8', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=300&fit=crop' },
  { id: '2', name: 'Margherita Pizza', restaurant: 'Bella Milano', price: '65₺', rating: '4.6', image: 'https://images.unsplash.com/photo-1604382355076-af4b6eb84fb6?w=500&h=300&fit=crop' },
  { id: '3', name: 'Dragon Roll', restaurant: 'Dragon Wok', price: '95₺', rating: '4.7', image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500&h=300&fit=crop' },
];

export default function HomeScreen() {
  const renderCategory = ({ item }: { item: typeof CATEGORIES[0] }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => {
        const categoryMap: { [key: string]: string } = {
          'Pizza': 'pizza',
          'Burger': 'burger', 
          'Suşi': 'sushi',
          'Tatlılar': 'dessert',
          'İçecekler': 'drink'
        };
        const categoryId = categoryMap[item.name] || 'all';
        router.push(`/(tabs)/menu?category=${categoryId}`);
      }}
    >
      <View style={[styles.categoryIcon, { backgroundColor: `${item.color}20` }]}>
        <Ionicons name={item.icon as any} size={32} color={item.color} />
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderDish = ({ item }: { item: typeof POPULAR_DISHES[0] }) => (
    <Card variant="warm" padding="none" style={styles.dishCard}>
      <View style={styles.dishImageContainer}>
        <ImageView
          source={item.image}
          width={200}
          height={120}
          borderRadius={20}
          placeholder="food"
        />
        <View style={styles.dishRating}>
          <Ionicons name="star" size={14} color={Colors.system.warning} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.dishContent}>
        <Text style={styles.dishName}>{item.name}</Text>
        <Text style={styles.dishRestaurant}>{item.restaurant}</Text>
        <View style={styles.dishFooter}>
          <Text style={styles.dishPrice}>{item.price}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={16} color={Colors.text.white} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Günaydın! 👋</Text>
            <Text style={styles.subtitle}>Bugün ne yemek istersiniz?</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('/(tabs)/profile')}
          >
            <Ionicons name="person-circle-outline" size={32} color={Colors.accent.main} />
          </TouchableOpacity>
        </View>

        {/* Special Offer Card */}
        <Card variant="elevated" padding="none" style={styles.specialCard}>
                      <LinearGradient
              colors={['#FF6B47', '#FFB347']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.specialGradient}
            >
            <View style={styles.specialContent}>
              <View style={styles.specialIcon}>
                <Ionicons name="star" size={28} color={Colors.text.white} />
              </View>
              <View style={styles.specialText}>
                <Text style={styles.specialTitle}>Günün Özel Menüsü</Text>
                <Text style={styles.specialSubtitle}>%20 indirim fırsatını kaçırma!</Text>
              </View>
              <TouchableOpacity style={styles.specialButton}>
                <Ionicons name="arrow-forward" size={20} color={Colors.text.white} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Card>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Popular Dishes Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popüler Yemekler</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/menu')}>
              <Text style={styles.seeAllText}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={POPULAR_DISHES}
            renderItem={renderDish}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dishesList}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
          <View style={styles.quickActions}>
            <Button
              title="Restoranları Keşfet"
              onPress={() => router.push('/(tabs)/restaurants')}
              variant="primary"
              style={styles.actionButton}
            />
            <Button
              title="Siparişlerim"
              onPress={() => router.push('/(tabs)/orders')}
              variant="secondary"
              style={styles.actionButton}
            />
          </View>
        </View>
      </ScrollView>
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
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.accent.main,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    fontWeight: '400',
  },
  profileButton: {
    padding: 8,
  },
  
  // Special Card
  specialCard: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  specialGradient: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  specialContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  specialIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  specialText: {
    flex: 1,
  },
  specialTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.white,
    marginBottom: 4,
  },
  specialSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '400',
  },
  specialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Sections
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.accent.main,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.secondary.main,
    fontWeight: '600',
  },

  // Categories
  categoriesList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  categoryItem: {
    alignItems: 'center',
    width: 80,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.primary,
    textAlign: 'center',
  },

  // Dishes
  dishesList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  dishCard: {
    width: 200,
    overflow: 'hidden',
  },
  dishImageContainer: {
    position: 'relative',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  dishRating: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  dishContent: {
    padding: 16,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  dishRestaurant: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  dishFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary.main,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Quick Actions
  quickActions: {
    paddingHorizontal: 24,
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
}); 