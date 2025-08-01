import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Card, Button, ImageView } from '../components/ui';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrderContext';

export default function PaymentScreen() {
  const params = useLocalSearchParams();
  const { clearCart } = useCart();
  const { addOrder } = useOrders();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Parametrelerden veriyi al
  const items = JSON.parse(params.items as string);
  const totalPrice = parseFloat(params.totalPrice as string);
  const deliveryFee = parseFloat(params.deliveryFee as string);
  const finalTotal = parseFloat(params.finalTotal as string);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Kredi/Banka Kartı',
      icon: 'card-outline',
      description: 'Visa, Mastercard, Troy'
    },
    {
      id: 'cash',
      name: 'Nakit',
      icon: 'cash-outline',
      description: 'Kapıda nakit ödeme'
    },
    {
      id: 'mobile',
      name: 'Mobil Ödeme',
      icon: 'phone-portrait-outline',
      description: 'Apple Pay, Google Pay'
    }
  ];

  const handlePayment = () => {
    setIsProcessing(true);

    // Sahte ödeme işlemi (2 saniye bekle)
    setTimeout(() => {
      // Siparişi kaydet
      addOrder({
        items: items,
        totalPrice: totalPrice,
        deliveryFee: deliveryFee,
        finalTotal: finalTotal,
        customerInfo: {
          name: 'Müşteri',
          phone: '+90 555 123 45 67',
          address: 'İstanbul, Türkiye'
        }
      });

      // Sepeti temizle
      clearCart();

      setIsProcessing(false);

      // Başarı mesajı ve yönlendirme
      Alert.alert(
        'Ödeme Başarılı!',
        'Siparişiniz alınmıştır. Siparişlerinizi görüntülemek için siparişler sayfasına yönlendirileceksiniz.',
        [
          {
            text: 'Tamam',
            onPress: () => router.replace('/(tabs)/orders')
          }
        ]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.accent.main} />
        </TouchableOpacity>
        <Text style={styles.title}>Ödeme</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Sipariş Özeti */}
        <Card variant="default" style={styles.section}>
          <Text style={styles.sectionTitle}>Sipariş Özeti</Text>
          
          {items.map((item: any, index: number) => (
            <View key={index} style={styles.orderItem}>
              <ImageView
                source={item.image}
                width={50}
                height={50}
                borderRadius={8}
                placeholder="food"
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetails}>
                  {item.quantity}x ₺{item.price}
                </Text>
              </View>
              <Text style={styles.itemTotal}>
                ₺{(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Ara Toplam</Text>
            <Text style={styles.priceValue}>₺{totalPrice.toFixed(2)}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Teslimat Ücreti</Text>
            <Text style={styles.priceValue}>
              {deliveryFee === 0 ? 'Ücretsiz' : `₺${deliveryFee.toFixed(2)}`}
            </Text>
          </View>
          
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Toplam</Text>
            <Text style={styles.totalValue}>₺{finalTotal.toFixed(2)}</Text>
          </View>
        </Card>

        {/* Ödeme Yöntemi */}
        <Card variant="default" style={styles.section}>
          <Text style={styles.sectionTitle}>Ödeme Yöntemi</Text>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedPaymentMethod === method.id && styles.paymentMethodSelected
              ]}
              onPress={() => setSelectedPaymentMethod(method.id)}
            >
              <View style={styles.paymentMethodInfo}>
                <View style={[
                  styles.paymentIcon,
                  selectedPaymentMethod === method.id && styles.paymentIconSelected
                ]}>
                  <Ionicons 
                    name={method.icon as any} 
                    size={24} 
                    color={selectedPaymentMethod === method.id ? Colors.text.white : Colors.secondary.main} 
                  />
                </View>
                <View style={styles.paymentText}>
                  <Text style={styles.paymentName}>{method.name}</Text>
                  <Text style={styles.paymentDescription}>{method.description}</Text>
                </View>
              </View>
              <View style={[
                styles.radioButton,
                selectedPaymentMethod === method.id && styles.radioButtonSelected
              ]}>
                {selectedPaymentMethod === method.id && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </Card>

        {/* Teslimat Bilgileri */}
        <Card variant="default" style={styles.section}>
          <Text style={styles.sectionTitle}>Teslimat Bilgileri</Text>
          
          <View style={styles.deliveryInfo}>
            <Ionicons name="location-outline" size={20} color={Colors.secondary.main} />
            <View style={styles.deliveryText}>
              <Text style={styles.deliveryTitle}>Teslimat Adresi</Text>
              <Text style={styles.deliveryAddress}>İstanbul, Türkiye</Text>
            </View>
          </View>
          
          <View style={styles.deliveryInfo}>
            <Ionicons name="time-outline" size={20} color={Colors.secondary.main} />
            <View style={styles.deliveryText}>
              <Text style={styles.deliveryTitle}>Tahmini Teslimat</Text>
              <Text style={styles.deliveryTime}>25-35 dakika</Text>
            </View>
          </View>
        </Card>
      </ScrollView>

      {/* Ödeme Butonu */}
      <View style={styles.paymentButtonContainer}>
        <Button
          title={isProcessing ? "İşleniyor..." : `₺${finalTotal.toFixed(2)} Öde`}
          onPress={handlePayment}
          variant="primary"
          disabled={isProcessing}
          style={styles.paymentButton}
        />
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.accent.main,
  },
  placeholder: {
    width: 40,
  },
  section: {
    margin: 16,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary.main,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border.light,
    marginVertical: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
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
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border.light,
    marginBottom: 12,
  },
  paymentMethodSelected: {
    borderColor: Colors.secondary.main,
    backgroundColor: `${Colors.secondary.main}10`,
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.secondary.main}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  paymentIconSelected: {
    backgroundColor: Colors.secondary.main,
  },
  paymentText: {
    flex: 1,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  paymentDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: Colors.secondary.main,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.secondary.main,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  deliveryText: {
    marginLeft: 12,
    flex: 1,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  deliveryAddress: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  deliveryTime: {
    fontSize: 14,
    color: Colors.secondary.main,
    fontWeight: '600',
  },
  paymentButtonContainer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    backgroundColor: Colors.primary.card,
  },
  paymentButton: {
    height: 56,
  },
}); 