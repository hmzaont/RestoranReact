import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Card, ImageView } from '../../components/ui';
import { useOrders, Order } from '../../contexts/OrderContext';

export default function OrdersScreen() {
  const { orders } = useOrders();

  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return { 
          color: Colors.system.warning, 
          icon: 'time-outline', 
          text: 'Beklemede',
          description: 'Siparişiniz alındı, hazırlanıyor'
        };
      case 'preparing':
        return { 
          color: '#FF9500', 
          icon: 'restaurant-outline', 
          text: 'Hazırlanıyor',
          description: 'Siparişiniz hazırlanıyor'
        };
      case 'on-the-way':
        return { 
          color: '#007AFF', 
          icon: 'bicycle-outline', 
          text: 'Yolda',
          description: 'Siparişiniz size geliyor'
        };
      case 'delivered':
        return { 
          color: Colors.system.success, 
          icon: 'checkmark-circle-outline', 
          text: 'Teslim Edildi',
          description: 'Siparişiniz teslim edildi'
        };
      case 'cancelled':
        return { 
          color: Colors.system.error, 
          icon: 'close-circle-outline', 
          text: 'İptal Edildi',
          description: 'Sipariş iptal edildi'
        };
      default:
        return { 
          color: Colors.text.muted, 
          icon: 'help-circle-outline', 
          text: 'Bilinmiyor',
          description: ''
        };
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const formatEstimatedTime = (date: Date) => {
    const now = new Date();
    const diff = new Date(date).getTime() - now.getTime();
    const minutes = Math.max(0, Math.ceil(diff / (1000 * 60)));
    
    if (minutes <= 0) return 'Yakında';
    if (minutes < 60) return `${minutes} dakika`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}s ${remainingMinutes}dk`;
  };

  // Sadece geçmiş siparişleri göster (delivered olanlar)
  const pastOrders = orders.filter(order => order.status === 'delivered');

  const renderOrderItem = ({ item }: { item: Order }) => {
    const statusInfo = getStatusInfo(item.status);

    return (
      <Card variant="default" style={styles.orderCard}>
        <View style={styles.orderRow}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderNumber}>#{item.orderNumber}</Text>
            <Text style={styles.orderDate}>{formatDate(item.orderDate)}</Text>
            <Text style={styles.orderSummary}>
              {item.items.length} ürün • ₺{item.finalTotal.toFixed(2)}
            </Text>
          </View>
          
          <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
            <Ionicons name={statusInfo.icon as any} size={14} color={Colors.text.white} />
            <Text style={styles.statusText}>{statusInfo.text}</Text>
          </View>
        </View>
      </Card>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons 
        name="time-outline" 
        size={80} 
        color={Colors.text.muted} 
      />
      <Text style={styles.emptyTitle}>
        Sipariş Geçmişi Yok
      </Text>
      <Text style={styles.emptySubtitle}>
        Henüz tamamlanmış siparişiniz bulunmuyor. İlk siparişinizi verin!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Siparişlerim</Text>
        <Text style={styles.subtitle}>
          {pastOrders.length} tamamlanmış sipariş
        </Text>
      </View>

      {/* Orders List */}
      <FlatList
        data={pastOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
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

  ordersList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  orderCard: {
    marginBottom: 16,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  orderSummary: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.white,
  },


  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
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
  },
}); 