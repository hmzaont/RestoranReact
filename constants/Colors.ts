// Sıcak tonlarda modern renk paleti
// %70 - %20 - %10 oranında kullanım

export const Colors = {
  // Ana Renkler (%70 kullanım - arka planlar, kartlar)
  primary: {
    background: '#FFF8F5',      // Sıcak krem beyazı
    card: '#FFFFFF',            // Temiz beyaz
    surface: '#FEF7F3',         // Çok açık turuncu
  },

  // İkincil Renkler (%20 kullanım - butonlar, vurgular)
  secondary: {
    main: '#FF6B47',            // Ana turuncu
    light: '#FF8A6B',           // Açık turuncu
    dark: '#E5542E',            // Koyu turuncu
    background: '#FFF5F2',      // Çok açık turuncu arka plan
  },

  // Vurgu Renkleri (%10 kullanım - başlıklar, önemli metinler)
  accent: {
    main: '#8B4513',            // Kahverengi
    light: '#CD853F',           // Açık kahverengi
    dark: '#5D2F0A',            // Koyu kahverengi
  },

  // Metin Renkleri
  text: {
    primary: '#8B4513',         // Ana metin - kahverengi
    secondary: '#A0522D',       // İkincil metin - açık kahverengi
    muted: '#D2B48C',           // Soluk metin - bej
    white: '#FFFFFF',           // Beyaz metin
  },

  // Sistem Renkleri
  system: {
    success: '#32CD32',         // Yeşil
    warning: '#FFB347',         // Sıcak sarı
    error: '#FF6B6B',           // Sıcak kırmızı
    info: '#87CEEB',            // Açık mavi
  },

  // Gölge ve Kenarlık
  border: {
    light: '#F5DEB3',           // Açık bej
    medium: '#DEB887',          // Orta bej
    dark: '#CD853F',            // Koyu bej
  },

  // Gradientler
  gradients: {
    warm: ['#FF6B47', '#FF8A6B'],
    sunset: ['#FF6B47', '#FFB347'],
    coffee: ['#8B4513', '#CD853F'],
  },

  // Eski renkler (backward compatibility)
  light: {
    text: '#8B4513',
    background: '#FFF8F5',
    tint: '#FF6B47',
    tabIconDefault: '#D2B48C',
    tabIconSelected: '#FF6B47',
  },
  dark: {
    text: '#FFF8F5',
    background: '#8B4513',
    tint: '#FF8A6B',
    tabIconDefault: '#A0522D',
    tabIconSelected: '#FF8A6B',
  },
}; 