import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Card, Button, ImageView } from '../../components/ui';
import { router } from 'expo-router';
import { useCart, CartItem } from '../../contexts/CartContext';
import { useOrders } from '../../contexts/OrderContext';

export default function CartScreen() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();



  const getDeliveryFee = () => {
    const total = getTotalPrice();
    return total > 100 ? 0 : 15; // 100 TL üzeri ücretsiz kargo
  };

  const getFinalTotal = () => {
    return getTotalPrice() + getDeliveryFee();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Sepet Boş', 'Sepetinizde ürün bulunmuyor.');
      return;
    }
    
    // Direkt ödeme sayfasına yönlendir
    router.push({
      pathname: '/payment',
      params: {
        items: JSON.stringify(cartItems),
        totalPrice: getTotalPrice().toString(),
        deliveryFee: getDeliveryFee().toString(),
        finalTotal: getFinalTotal().toString()
      }
    });
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <Card variant="default" padding="none" style={styles.cartItem}>
      <View style={styles.itemContainer}>
        <View style={styles.itemImageContainer}>
          <ImageView
            source={item.image}
            width={80}
            height={80}
            borderRadius={12}
            placeholder="food"
          />
        </View>
        
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemRestaurant}>{item.restaurant}</Text>
          <Text style={styles.itemPrice}>₺{item.price}</Text>
        </View>

                <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, -1)}
          >
            <Ionicons name="remove" size={16} color={Colors.secondary.main} />
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, 1)}
          >
            <Ionicons name="add" size={16} color={Colors.secondary.main} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="bag-outline" size={80} color={Colors.text.muted} />
      <Text style={styles.emptyTitle}>Sepetiniz Boş</Text>
      <Text style={styles.emptySubtitle}>
        Lezzetli yemekleri keşfetmek için menüye göz atın
      </Text>
      <Button
        title="Menüye Git"
        onPress={() => router.push('/(tabs)/menu')}
        variant="primary"
        style={styles.emptyButton}
      />
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Sepetim</Text>
        </View>
        {renderEmptyCart()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sepetim</Text>
        <Text style={styles.subtitle}>{cartItems.length} ürün</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cartList}
        showsVerticalScrollIndicator={false}
      />

      {/* Order Summary */}
      <Card variant="elevated" style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Ara Toplam</Text>
          <Text style={styles.summaryValue}>₺{getTotalPrice()}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Teslimat Ücreti</Text>
          <Text style={[styles.summaryValue, getDeliveryFee() === 0 && styles.freeDelivery]}>
            {getDeliveryFee() === 0 ? 'Ücretsiz' : `₺${getDeliveryFee()}`}
          </Text>
        </View>
        
        {getDeliveryFee() === 0 && (
          <Text style={styles.freeDeliveryNote}>
            🎉 100 TL üzeri siparişlerde kargo ücretsiz!
          </Text>
        )}
        
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Toplam</Text>
          <Text style={styles.totalValue}>₺{getFinalTotal()}</Text>
        </View>
        
        <Button
          title="Siparişi Onayla"
          onPress={handleCheckout}
          variant="primary"
          style={styles.checkoutButton}
        />
      </Card>
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
  cartList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  cartItem: {
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  itemImageContainer: {
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  itemRestaurant: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary.main,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.secondary.main,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },

  summaryCard: {
    margin: 24,
    marginTop: 0,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  freeDelivery: {
    color: Colors.system.success,
  },
  freeDeliveryNote: {
    fontSize: 12,
    color: Colors.system.success,
    textAlign: 'center',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    paddingTop: 12,
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.secondary.main,
  },
  checkoutButton: {
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text.primary,
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  emptyButton: {
    paddingHorizontal: 32,
  },
}); 