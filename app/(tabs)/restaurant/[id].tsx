import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReviews } from '../../../contexts/ReviewContext';
import { mockRestaurants } from '../../../data/mockData';

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams();
  const { 
    getRestaurantReviews, 
    getAverageRating, 
    getReviewCount, 
    addReview, 
    markHelpful,
    isConnected,
    connectionStatus
  } = useReviews();

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const restaurant = mockRestaurants.find(r => r.id === id);
  
  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Restoran bulunamadı</Text>
      </SafeAreaView>
    );
  }

  const reviews = getRestaurantReviews(restaurant.id);
  const averageRating = getAverageRating(restaurant.id);
  const reviewCount = getReviewCount(restaurant.id);

  const handleSubmitReview = () => {
    if (!reviewTitle.trim() || !reviewComment.trim()) {
      Alert.alert('Hata', 'Lütfen başlık ve yorum kısımlarını doldurun.');
      return;
    }

    addReview({
      restaurantId: restaurant.id,
      userId: 'current-user',
      userName: 'Sen', // In real app, this would come from auth
      userAvatar: '👤',
      rating: newRating,
      title: reviewTitle,
      comment: reviewComment,
    });

    setShowReviewModal(false);
    setReviewTitle('');
    setReviewComment('');
    setNewRating(5);
    
    Alert.alert('Başarılı', 'Değerlendirmeniz kaydedildi!');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number, size: number = 16, interactive: boolean = false, onPress?: (rating: number) => void) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            disabled={!interactive}
            onPress={() => interactive && onPress?.(star)}
          >
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={size}
              color="#FFD700"
              style={{ marginRight: 2 }}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restoran Detayı</Text>
        
        {/* Connection Status */}
        <View style={styles.connectionStatus}>
          <View style={[styles.connectionDot, { backgroundColor: isConnected ? '#34C759' : '#FF3B30' }]} />
          <Text style={styles.connectionText}>{connectionStatus}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Restaurant Info */}
        <View style={styles.restaurantCard}>
          <View style={styles.restaurantImage}>
            <Ionicons name="restaurant" size={60} color="#FF6B47" />
          </View>
          
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.cuisineType}>{restaurant.cuisine.join(', ')} Mutfağı</Text>
            <Text style={styles.description}>{restaurant.description}</Text>
            
            <View style={styles.ratingSection}>
              {renderStars(averageRating, 20)}
              <Text style={styles.ratingText}>
                {averageRating.toFixed(1)} ({reviewCount} değerlendirme)
              </Text>
            </View>

            <View style={styles.deliveryInfo}>
              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={16} color="#8E8E93" />
                <Text style={styles.infoText}>{restaurant.deliveryTime}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="bicycle-outline" size={16} color="#8E8E93" />
                <Text style={styles.infoText}>₺{restaurant.deliveryFee}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="wallet-outline" size={16} color="#8E8E93" />
                <Text style={styles.infoText}>Min ₺{restaurant.minimumOrder}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.reviewsTitle}>Değerlendirmeler ({reviewCount})</Text>
            <TouchableOpacity 
              style={styles.addReviewButton}
              onPress={() => setShowReviewModal(true)}
            >
              <Ionicons name="add" size={20} color="#FFFFFF" />
              <Text style={styles.addReviewText}>Değerlendir</Text>
            </TouchableOpacity>
          </View>

          {reviews.length === 0 ? (
            <View style={styles.noReviews}>
              <Ionicons name="chatbubble-outline" size={48} color="#8E8E93" />
              <Text style={styles.noReviewsText}>Henüz değerlendirme yapılmamış</Text>
              <Text style={styles.noReviewsSubtext}>İlk değerlendirmeyi sen yap!</Text>
            </View>
          ) : (
            reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.userInfo}>
                    <Text style={styles.userAvatar}>{review.userAvatar}</Text>
                    <View>
                      <Text style={styles.userName}>{review.userName}</Text>
                      <Text style={styles.reviewDate}>{formatDate(review.date)}</Text>
                    </View>
                  </View>
                  {renderStars(review.rating, 14)}
                </View>
                
                <Text style={styles.reviewTitle}>{review.title}</Text>
                <Text style={styles.reviewComment}>{review.comment}</Text>
                
                <View style={styles.reviewActions}>
                  <TouchableOpacity 
                    style={styles.helpfulButton}
                    onPress={() => markHelpful(review.id)}
                  >
                    <Ionicons name="thumbs-up-outline" size={16} color="#8E8E93" />
                    <Text style={styles.helpfulText}>Faydalı ({review.helpful})</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Add Review Modal */}
      <Modal
        visible={showReviewModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowReviewModal(false)}>
              <Text style={styles.modalCancel}>İptal</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Değerlendirme Yap</Text>
            <TouchableOpacity onPress={handleSubmitReview}>
              <Text style={styles.modalSave}>Kaydet</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalSubtitle}>{restaurant.name}</Text>
            
            <View style={styles.ratingSelector}>
              <Text style={styles.ratingLabel}>Puanın:</Text>
              {renderStars(newRating, 32, true, setNewRating)}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Başlık</Text>
              <TextInput
                style={styles.titleInput}
                placeholder="Değerlendirmene bir başlık ver..."
                placeholderTextColor="#8E8E93"
                value={reviewTitle}
                onChangeText={setReviewTitle}
                maxLength={100}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Yorum</Text>
              <TextInput
                style={styles.commentInput}
                placeholder="Deneyimini paylaş..."
                placeholderTextColor="#8E8E93"
                value={reviewComment}
                onChangeText={setReviewComment}
                multiline
                maxLength={500}
                textAlignVertical="top"
              />
              <Text style={styles.charCount}>
                {reviewComment.length}/500
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  content: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#8E8E93',
  },
  restaurantCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  restaurantImage: {
    alignItems: 'center',
    marginBottom: 16,
  },
  restaurantInfo: {
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  cuisineType: {
    fontSize: 16,
    color: '#FF6B47',
    fontWeight: '500',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 16,
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  reviewsSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  addReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B47',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  addReviewText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  noReviews: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noReviewsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginTop: 12,
  },
  noReviewsSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  reviewCard: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userAvatar: {
    fontSize: 24,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  reviewDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: '#1C1C1E',
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewActions: {
    flexDirection: 'row',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  helpfulText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalCancel: {
    fontSize: 16,
    color: '#8E8E93',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  modalSave: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B47',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 20,
  },
  ratingSelector: {
    alignItems: 'center',
    marginBottom: 24,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  commentInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    height: 120,
  },
  charCount: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'right',
    marginTop: 4,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -8 }],
  },
  connectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  connectionText: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '500',
  },
}); 