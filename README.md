# 🍕 RestoranPro - Restoran Sipariş Uygulaması

<div align="center">
  <img src="./assets/icon.png" alt="RestoranPro Logo" width="120" height="120">
  
  **Modern ve kullanıcı dostu restoran sipariş uygulaması**
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.79.4-blue.svg)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-53.0.12-000020.svg)](https://expo.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
  [![Firebase](https://img.shields.io/badge/Firebase-11.9.1-orange.svg)](https://firebase.google.com/)
</div>

## 📱 Uygulama Hakkında

RestoranPro, kullanıcıların favori restoranlarından kolayca sipariş verebileceği modern bir mobil uygulamadır. React Native ve Expo Router kullanılarak geliştirilmiş olan bu uygulama, hem iOS hem de Android platformlarında mükemmel performans sunar.

### ✨ Temel Özellikler

- 🏠 **Ana Sayfa**: Popüler yemekler, kategoriler ve hızlı erişim menüleri
- 🍽️ **Restoran Keşfi**: Geniş restoran ağı ile arama ve filtreleme
- 📋 **Menü İncelemesi**: Detaylı yemek menüleri ve fiyatları
- 🛒 **Sepet Yönetimi**: Kolay sipariş ekleme ve çıkarma
- 📦 **Sipariş Takibi**: Gerçek zamanlı sipariş durumu takibi
- 👤 **Profil Yönetimi**: Kişisel bilgiler ve sipariş geçmişi
- ⭐ **Değerlendirme Sistemi**: Restoran ve yemek puanlama
- 🔍 **Akıllı Arama**: Restoran ve yemek bazlı gelişmiş arama

## 🛠️ Kullanılan Teknolojiler

- **Framework**: React Native 0.79.4
- **Platform**: Expo 53.0.12
- **Navigation**: Expo Router 5.1.0
- **Veritabanı**: Firebase Realtime Database
- **Dil**: TypeScript 5.8.3
- **State Management**: React Context API
- **UI Components**: Custom UI Library
- **Icons**: Expo Vector Icons
- **Styling**: React Native StyleSheet

## 📋 Ön Gereksinimler

Uygulamayı çalıştırmadan önce aşağıdaki araçların bilgisayarınızda kurulu olması gerekmektedir:

- [Node.js](https://nodejs.org/) (18.0 veya üzeri)
- [npm](https://www.npmjs.com/) veya [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

### 📱 Mobil Cihaz için:
- iOS: [Expo Go](https://apps.apple.com/app/expo-go/id982107779) uygulaması
- Android: [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) uygulaması

## 🚀 Kurulum Adımları

### 1️⃣ Projeyi İndirin

```bash
# Repository'yi klonlayın
git clone https://github.com/KULLANICI_ADINIZ/RestoranPro.git

# Proje klasörüne gidin
cd RestoranPro
```

### 2️⃣ Bağımlılıkları Yükleyin

```bash
# NPM ile
npm install

# Veya Yarn ile
yarn install
```

### 3️⃣ Firebase Kurulumu

Bu proje Firebase Realtime Database kullanmaktadır. Firebase kurulumu için:

1. [Firebase Console](https://console.firebase.google.com/) üzerinden yeni bir proje oluşturun
2. **Realtime Database** servisini etkinleştirin
3. **Authentication** servisini kurulum yapın (opsiyonel)
4. Web uygulaması olarak projenizi kaydedin

#### Firebase Yapılandırması:

1. `.env.example` dosyasını `.env` olarak kopyalayın:
```bash
cp .env.example .env
```

2. `.env` dosyasını açın ve Firebase proje bilgilerinizi girin:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> ⚠️ **Önemli**: `.env` dosyasını asla Git'e commit etmeyin! Bu dosya `.gitignore` içinde yer almaktadır.

### 4️⃣ Uygulamayı Başlatın

```bash
# Development server'ı başlatın
npm start

# Veya yarn ile
yarn start
```

## 📱 Nasıl Kullanılır?

### Web Browser'da Çalıştırma:
```bash
npm run web
```
Tarayıcınızda `http://localhost:8081` adresini açın.

### Mobil Cihazda Çalıştırma:
1. Expo Go uygulamasını indirin
2. Terminal'de görünen QR kodu Expo Go ile tarayın
3. Uygulama otomatik olarak yüklenecektir

### Emülatörde Çalıştırma:
```bash
# Android emülatörü için
npm run android

# iOS simülatörü için (sadece macOS)
npm run ios
```

## 📁 Proje Yapısı

```
RestoranPro/
├── app/                    # Expo Router sayfaları
│   ├── (auth)/            # Kimlik doğrulama sayfaları
│   ├── (tabs)/            # Ana tab sayfaları
│   │   ├── index.tsx      # Ana sayfa
│   │   ├── restaurants.tsx # Restoran listesi
│   │   ├── menu.tsx       # Menü sayfası
│   │   ├── cart.tsx       # Sepet sayfası
│   │   ├── orders.tsx     # Siparişler
│   │   ├── profile.tsx    # Profil sayfası
│   │   └── restaurant/    # Restoran detay sayfaları
│   ├── home.tsx           # Karşılama sayfası
│   ├── payment.tsx        # Ödeme sayfası
│   └── _layout.tsx        # Ana layout
├── components/            # Yeniden kullanılabilir bileşenler
│   ├── ui/               # UI bileşenleri
│   │   ├── Button.tsx    # Buton bileşeni
│   │   ├── Card.tsx      # Kart bileşeni
│   │   └── ImageView.tsx # Resim görüntüleme bileşeni
│   └── restaurant/       # Restoran özel bileşenleri
├── contexts/             # Context API
│   ├── CartContext.tsx   # Sepet yönetimi
│   ├── OrderContext.tsx  # Sipariş yönetimi
│   └── ReviewContext.tsx # Değerlendirme yönetimi
├── config/               # Yapılandırma dosyaları
│   └── firebase.ts       # Firebase konfigürasyonu
├── constants/            # Sabit değerler
│   └── Colors.ts         # Renk paleti
├── data/                 # Mock veriler
│   └── mockData.ts       # Test verileri
├── types/                # TypeScript tip tanımları
│   └── index.ts          # Genel tipler
├── utils/                # Yardımcı fonksiyonlar
├── assets/               # Görseller ve statik dosyalar
└── package.json          # Proje bağımlılıkları
```

## 🎨 Ekran Görüntüleri

### 🏠 Ana Sayfa
Ana sayfada popüler yemekler, kategoriler ve hızlı erişim menüleri bulunur.

### 🍽️ Restoran Listesi
Filtreleme ve arama özelliği ile restoranları keşfedin.

### 📋 Menü Sayfası
Restoran menülerini kategoriler halinde inceleyin.

### 🛒 Sepet
Seçtiğiniz ürünleri sepetinizde görüntüleyin ve sipariş verin.

### 📦 Siparişler
Aktif ve geçmiş siparişlerinizi takip edin.

### 👤 Profil
Kişisel bilgilerinizi yönetin ve uygulama ayarlarını değiştirin.

## 🔧 Geliştirme

### Development Mode'da Çalıştırma:
```bash
npm start
```

### Linting:
```bash
npm run lint
```

### Type Checking:
```bash
npx tsc --noEmit
```

## 🌟 Özellikler Detayı

### 🛒 Sepet Yönetimi
- Ürün ekleme/çıkarma
- Miktar güncelleme
- Toplam fiyat hesaplama
- Sepeti temizleme

### 📱 Responsive Tasarım
- Tüm ekran boyutlarına uyumlu
- iOS ve Android platformları için optimize edilmiş
- Modern ve kullanıcı dostu arayüz

### 🔍 Arama ve Filtreleme
- Restoran adına göre arama
- Mutfak türüne göre filtreleme
- Puan bazlı filtreleme
- Fiyat aralığına göre sıralama

### ⭐ Değerlendirme Sistemi
- Restoran puanlama
- Yorum yazma
- Ortalama puan hesaplama
- Değerlendirme geçmişi

## 🤝 Katkıda Bulunma

Bu projeye katkıda bulunmak isterseniz:

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

### 📝 Commit Mesaj Formatı:
```
feat: yeni özellik ekleme
fix: hata düzeltme
docs: dokümantasyon güncelleme
style: kod formatlama
refactor: kod yeniden düzenleme
test: test ekleme
chore: bakım işleri
```

## 🐛 Hata Bildirimi

Bir hata ile karşılaştığınızda lütfen [Issues](https://github.com/KULLANICI_ADINIZ/RestoranPro/issues) sayfasından bildirin.

Hata bildiriminde aşağıdaki bilgileri dahil edin:
- Cihaz/Platform bilgisi
- Hata mesajı (varsa)
- Hatayı tekrar oluşturma adımları
- Beklenen davranış

## 📞 Destek

Sorularınız için:
- 📧 Email: destek@restoranpro.com
- 🐛 Issues: [GitHub Issues](https://github.com/KULLANICI_ADINIZ/RestoranPro/issues)
- 📖 Dokümantasyon: [Wiki](https://github.com/KULLANICI_ADINIZ/RestoranPro/wiki)

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 👨‍💻 Geliştirici

**RestoranPro Ekibi**
- 🔗 GitHub: [@KULLANICI_ADINIZ](https://github.com/KULLANICI_ADINIZ)
- 📧 Email: developer@restoranpro.com

---

<div align="center">
  <p>❤️ ile Türkiye'de geliştirilmiştir</p>
  
  **RestoranPro** - *Lezzetin Dijital Adresi*
</div>

## 🔄 Güncelleme Notları

### v1.0.0 (Mevcut)
- ✅ Temel restoran sipariş sistemi
- ✅ Firebase entegrasyonu
- ✅ Sepet yönetimi
- ✅ Kullanıcı profil sistemi
- ✅ Değerlendirme sistemi

### 🚀 Gelecek Özellikler
- 🔔 Push notification desteği
- 💳 Çoklu ödeme yöntemi entegrasyonu
- 🗺️ Harita entegrasyonu
- 🎯 Kişiselleştirilmiş öneriler
- 📊 Sipariş analytics
- 🌙 Dark mode desteği

---

> **Not**: Bu uygulama eğitim amaçlı geliştirilmiştir. Gerçek bir ticari ürün değildir.