import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { database } from '../config/firebase';
import { ref, push, set, onValue, update, get, child } from 'firebase/database';

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  photos?: string[];
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpful'>) => Promise<void>;
  getRestaurantReviews: (restaurantId: string) => Review[];
  getAverageRating: (restaurantId: string) => number;
  getReviewCount: (restaurantId: string) => number;
  markHelpful: (reviewId: string) => Promise<void>;
  isConnected: boolean;
  connectionStatus: string;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

// Mock initial reviews data - Firebase'e ilk veri yüklemesi için
const INITIAL_REVIEWS: Omit<Review, 'id'>[] = [
  {
    restaurantId: '1', // Ottoman Sarayı
    userId: 'user1',
    userName: 'Mehmet Özkan',
    userAvatar: '👨‍💼',
    rating: 5,
    title: 'Mükemmel Türk mutfağı deneyimi!',
    comment: 'Ottoman Sarayı gerçekten harika bir restoran. Adana kebap ve baklavaları muhteşemdi. Servisi de çok hızlı ve güler yüzlü. Kesinlikle tekrar geleceğim.',
    date: '2024-01-15',
    helpful: 12,
    photos: ['kebap.jpg', 'baklava.jpg']
  },
  {
    restaurantId: '1',
    userId: 'user2',
    userName: 'Ayşe Kaya',
    userAvatar: '👩‍🦳',
    rating: 4,
    title: 'Lezzetli ama biraz pahalı',
    comment: 'Yemekler gerçekten çok lezzetli ve otantik. Atmosfer de güzel. Sadece fiyatlar biraz yüksek geldi ama kaliteye değer.',
    date: '2024-01-12',
    helpful: 8
  },
  {
    restaurantId: '2', // Bella Milano
    userId: 'user3',
    userName: 'Giovanni Rossi',
    userAvatar: '👨‍🍳',
    rating: 5,
    title: 'Gerçek İtalyan lezzeti!',
    comment: 'İtalya\'dan geldim ve buradaki pizza gerçekten otantik İtalyan pizzası. Hamuru ve sosları mükemmel. Bravo!',
    date: '2024-01-14',
    helpful: 15
  },
  {
    restaurantId: '2',
    userId: 'user4',
    userName: 'Zeynep Acar',
    userAvatar: '👩‍🎓',
    rating: 4,
    title: 'Pizza ve pasta harika',
    comment: 'Carbonara pastası ve margherita pizzası çok güzeldi. Ortam da romantik. Arkadaşlarla gelmek için ideal.',
    date: '2024-01-10',
    helpful: 6
  },
  {
    restaurantId: '3', // Dragon Wok
    userId: 'user5',
    userName: 'Kemal Demir',
    userAvatar: '👨‍💻',
    rating: 4,
    title: 'Güzel Asya mutfağı',
    comment: 'Pad thai ve dim sum çok lezzetliydi. Porsiyon büyüklükleri de gayet iyi. Sadece biraz geç geldi siparişimiz.',
    date: '2024-01-13',
    helpful: 4
  },
  {
    restaurantId: '4', // Burger Palace
    userId: 'user6',
    userName: 'Deniz Çelik',
    userAvatar: '🧑‍🎨',
    rating: 4,
    title: 'Sulu ve lezzetli burgerler',
    comment: 'Klasik burger gerçekten çok sulu ve lezzetliydi. Patates kızartması da çıtır çıtır. Hızlı servis için ideal.',
    date: '2024-01-11',
    helpful: 9
  },
  {
    restaurantId: '5', // Balık Evi
    userId: 'user7',
    userName: 'Fatma Yılmaz',
    userAvatar: '👩‍🍳',
    rating: 5,
    title: 'En taze deniz ürünleri',
    comment: 'Levrek ve çupra çok tazeydi. Mezeler de harika. Deniz manzarası eşliğinde yemek yemek paha biçilemez.',
    date: '2024-01-16',
    helpful: 11
  }
];

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Firebase\'e bağlanıyor...');

  // Firebase bağlantısını kur ve verileri dinle
  useEffect(() => {
    let isComponentMounted = true;

    const initializeFirebase = async () => {
      try {
        console.log('🔄 Firebase bağlantısı kuruluyor...');
        setConnectionStatus('Firebase\'e bağlanıyor...');

        const reviewsRef = ref(database, 'reviews');
        
        // İlk veri kontrolü - eğer veri yoksa mock veriyi yükle
        const snapshot = await get(reviewsRef);
        if (!snapshot.exists()) {
          console.log('📋 İlk veri yükleniyor...');
          
          // Mock verileri Firebase'e yükle
          for (const reviewData of INITIAL_REVIEWS) {
            const newReviewRef = push(reviewsRef);
            await set(newReviewRef, {
              ...reviewData,
              id: newReviewRef.key
            });
          }
          
          console.log('✅ İlk veriler Firebase\'e yüklendi');
        }

        // Real-time veri dinleyici
        const unsubscribe = onValue(reviewsRef, (snapshot) => {
          if (!isComponentMounted) return;

          if (snapshot.exists()) {
            const data = snapshot.val();
            const reviewsList: Review[] = Object.entries(data).map(([key, value]: [string, any]) => ({
              ...value,
              id: key
            }));
            
            // Tarihe göre sırala (yeni olanlar önce)
            reviewsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
            setReviews(reviewsList);
            console.log('📋 Değerlendirmeler güncellendi:', reviewsList.length);
          } else {
            setReviews([]);
          }

          if (!isConnected) {
            setIsConnected(true);
            setConnectionStatus('Firebase\'e bağlandı');
            console.log('✅ Firebase bağlantısı kuruldu');
          }
        }, (error) => {
          console.error('❌ Firebase bağlantı hatası:', error);
          setConnectionStatus('Bağlantı hatası');
          setIsConnected(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error('❌ Firebase başlatma hatası:', error);
        setConnectionStatus('Başlatma hatası');
        setIsConnected(false);
      }
    };

    const unsubscribePromise = initializeFirebase();

    return () => {
      isComponentMounted = false;
      unsubscribePromise.then(unsubscribe => {
        if (unsubscribe) {
          unsubscribe();
        }
      });
    };
  }, []);

  // Yeni değerlendirme ekle
  const addReview = async (newReview: Omit<Review, 'id' | 'date' | 'helpful'>) => {
    try {
      const reviewsRef = ref(database, 'reviews');
      const newReviewRef = push(reviewsRef);
      
      const reviewData = {
        ...newReview,
        id: newReviewRef.key,
        date: new Date().toISOString().split('T')[0],
        helpful: 0,
      };
      
      await set(newReviewRef, reviewData);
      console.log('⭐ Yeni değerlendirme Firebase\'e eklendi:', reviewData.title);
    } catch (error) {
      console.error('❌ Değerlendirme eklenirken hata:', error);
      throw error;
    }
  };

  // Değerlendirmeyi faydalı olarak işaretle
  const markHelpful = async (reviewId: string) => {
    try {
      const reviewRef = ref(database, `reviews/${reviewId}`);
      const snapshot = await get(reviewRef);
      
      if (snapshot.exists()) {
        const currentReview = snapshot.val();
        await update(reviewRef, {
          helpful: (currentReview.helpful || 0) + 1
        });
        console.log('👍 Değerlendirme faydalı olarak işaretlendi');
      }
    } catch (error) {
      console.error('❌ Faydalı işaretlenirken hata:', error);
      throw error;
    }
  };

  // Restoran değerlendirmelerini getir
  const getRestaurantReviews = (restaurantId: string) => {
    return reviews.filter(review => review.restaurantId === restaurantId);
  };

  // Ortalama puan hesapla
  const getAverageRating = (restaurantId: string) => {
    const restaurantReviews = getRestaurantReviews(restaurantId);
    if (restaurantReviews.length === 0) return 0;
    
    const totalRating = restaurantReviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / restaurantReviews.length;
  };

  // Değerlendirme sayısını getir
  const getReviewCount = (restaurantId: string) => {
    return getRestaurantReviews(restaurantId).length;
  };

  const value: ReviewContextType = {
    reviews,
    addReview,
    getRestaurantReviews,
    getAverageRating,
    getReviewCount,
    markHelpful,
    isConnected,
    connectionStatus,
  };

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReviews hook, ReviewProvider içinde kullanılmalıdır');
  }
  return context;
} 