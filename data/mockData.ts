import { MenuItem, Restaurant, User, Address } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Ahmet Yılmaz',
  email: 'ahmet.yilmaz@example.com',
  phone: '+90 (555) 123-4567',
  addresses: [
    {
      id: '1',
      street: 'Bağdat Caddesi No:123',
      city: 'İstanbul',
      state: 'İstanbul',
      zipCode: '34740',
      country: 'Türkiye',
      isDefault: true,
      label: 'Ev',
    },
  ],
  favoriteItems: ['1', '3', '5'],
  dietaryPreferences: [],
};

export const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 75.99,
    description: 'Taze domates, mozzarella peyniri ve fesleğen ile çıtır hamur',
    rating: 4.8,
    ingredients: ['Domates', 'Mozzarella', 'Fesleğen', 'Pizza Hamuru'],
    isVegan: false,
    isGlutenFree: false,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b6eb84fb6?w=500&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'Klasik Burger',
    category: 'Burger',
    price: 59.99,
    description: 'Sulu dana köftesi, marul, domates, soğan ve özel sos',
    rating: 4.6,
    ingredients: ['Dana Köftesi', 'Marul', 'Domates', 'Soğan', 'Burger Ekmeği'],
    isVegan: false,
    isGlutenFree: false,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Somon Roll',
    category: 'Suşi',
    price: 95.99,
    description: 'Taze somon, avokado ve salatalık ile nori\'ye sarılı',
    rating: 4.9,
    ingredients: ['Somon', 'Avokado', 'Salatalık', 'Nori', 'Suşi Pirinç'],
    isVegan: false,
    isGlutenFree: true,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Çikolatalı Pasta',
    category: 'Tatlı',
    price: 35.99,
    description: 'Zengin çikolatalı pasta ve kremalı çikolata süslemesi',
    rating: 4.7,
    ingredients: ['Çikolata', 'Un', 'Şeker', 'Yumurta', 'Tereyağ'],
    isVegan: false,
    isGlutenFree: false,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=300&fit=crop',
  },
  {
    id: '5',
    name: 'Taze Portakal Suyu',
    category: 'İçecek',
    price: 24.99,
    description: 'Taze sıkılmış portakal suyu, şeker ilavesiz',
    rating: 4.5,
    ingredients: ['Taze Portakal'],
    isVegan: true,
    isGlutenFree: true,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&h=300&fit=crop',
  },
  {
    id: '6',
    name: 'Sezar Salata',
    category: 'Salata',
    price: 52.99,
    description: 'Çıtır marul, parmesan, kruton ve sezar sos',
    rating: 4.4,
    ingredients: ['Marul', 'Parmesan', 'Kruton', 'Sezar Sos'],
    isVegan: false,
    isGlutenFree: false,
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=500&h=300&fit=crop',
  },
  // Türk mutfağı ürünleri
  {
    id: '7',
    name: 'Adana Kebap',
    category: 'Kebap',
    price: 85.99,
    description: 'Baharatlı kıyma ile hazırlanmış geleneksel Adana kebabı',
    rating: 4.9,
    ingredients: ['Dana Kıyma', 'Pul Biber', 'Kimyon', 'Sarımsak'],
    isVegan: false,
    isGlutenFree: true,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=300&fit=crop',
  },
  {
    id: '8',
    name: 'Lahmacun',
    category: 'Pide',
    price: 45.99,
    description: 'İnce hamur üzerinde baharatlı kıyma karışımı',
    rating: 4.6,
    ingredients: ['İnce Hamur', 'Kıyma', 'Soğan', 'Maydanoz'],
    isVegan: false,
    isGlutenFree: false,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop',
  },
  {
    id: '9',
    name: 'Döner Kebap',
    category: 'Kebap',
    price: 65.99,
    description: 'Taze pide ekmeği arasında enfes döner eti',
    rating: 4.7,
    ingredients: ['Döner Eti', 'Pide Ekmeği', 'Salata', 'Soğan'],
    isVegan: false,
    isGlutenFree: false,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&h=300&fit=crop',
  },
  // İtalyan mutfağı ürünleri
  {
    id: '10',
    name: 'Quattro Stagioni Pizza',
    category: 'Pizza',
    price: 89.99,
    description: 'Dört mevsim pizzası - mantar, salam, zeytin ve biber',
    rating: 4.8,
    ingredients: ['Pizza Hamuru', 'Mozzarella', 'Mantar', 'Salam', 'Zeytin'],
    isVegan: false,
    isGlutenFree: false,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&h=300&fit=crop',
  },
  {
    id: '11',
    name: 'Carbonara Pasta',
    category: 'Pasta',
    price: 78.99,
    description: 'Kremli yumurta sosu, pancetta ve parmesan ile',
    rating: 4.7,
    ingredients: ['Spagetti', 'Yumurta', 'Pancetta', 'Parmesan'],
    isVegan: false,
    isGlutenFree: false,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500&h=300&fit=crop',
  },
  {
    id: '12',
    name: 'Tiramisu',
    category: 'Tatlı',
    price: 42.99,
    description: 'Geleneksel İtalyan tatlısı - kahve ve mascarpone ile',
    rating: 4.9,
    ingredients: ['Mascarpone', 'Kahve', 'Ladyfinger', 'Kakao'],
    isVegan: false,
    isGlutenFree: false,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=300&fit=crop',
  },
  // Asya mutfağı ürünleri
  {
    id: '13',
    name: 'Dragon Roll',
    category: 'Suşi',
    price: 125.99,
    description: 'Özel sos ile kaplanmış tempura karides roll',
    rating: 4.8,
    ingredients: ['Karides Tempura', 'Avokado', 'Salatalık', 'Dragon Sos'],
    isVegan: false,
    isGlutenFree: true,
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500&h=300&fit=crop',
  },
  {
    id: '14',
    name: 'Pad Thai',
    category: 'Noodle',
    price: 68.99,
    description: 'Geleneksel Thai makarnası tamarind sos ile',
    rating: 4.6,
    ingredients: ['Pirinç Makarnası', 'Tamarind', 'Karides', 'Fıstık'],
    isVegan: false,
    isGlutenFree: true,
    image: 'https://images.unsplash.com/photo-1559314809-0f31657def5e?w=500&h=300&fit=crop',
  },
  {
    id: '15',
    name: 'Kung Pao Tavuk',
    category: 'Çin',
    price: 72.99,
    description: 'Baharatlı tavuk sote, fıstık ve sebzeler ile',
    rating: 4.5,
    ingredients: ['Tavuk', 'Fıstık', 'Biber', 'Soya Sosu'],
    isVegan: false,
    isGlutenFree: true,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=300&fit=crop',
  },
  // Fast Food ürünleri
  {
    id: '16',
    name: 'Double Cheeseburger',
    category: 'Burger',
    price: 89.99,
    description: 'İki kat köfte, çifte cheddar peyniri ve özel sos',
    rating: 4.7,
    ingredients: ['Çift Köfte', 'Cheddar', 'Marul', 'Domates', 'Özel Sos'],
    isVegan: false,
    isGlutenFree: false,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=300&fit=crop',
  },
  {
    id: '17',
    name: 'Çıtır Tavuk Burger',
    category: 'Burger',
    price: 69.99,
    description: 'Çıtır kaplama tavuk göğsü, turşu ve ranch sos',
    rating: 4.4,
    ingredients: ['Çıtır Tavuk', 'Ranch Sos', 'Turşu', 'Coleslaw'],
    isVegan: false,
    isGlutenFree: false,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e9dabd96?w=500&h=300&fit=crop',
  },
  {
    id: '18',
    name: 'Patates Kızartması',
    category: 'Aperitif',
    price: 29.99,
    description: 'Çıtır çıtır altın sarısı patates kızartması',
    rating: 4.3,
    ingredients: ['Patates', 'Tuz', 'Bitkisel Yağ'],
    isVegan: true,
    isGlutenFree: true,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=300&fit=crop',
  },
  // Deniz ürünleri
  {
    id: '19',
    name: 'Karides Güveç',
    category: 'Deniz Ürünleri',
    price: 145.99,
    description: 'Taze karides, domates ve otlar ile güveçte',
    rating: 4.8,
    ingredients: ['Taze Karides', 'Domates', 'Soğan', 'Dereotu'],
    isVegan: false,
    isGlutenFree: true,
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=500&h=300&fit=crop',
  },
  {
    id: '20',
    name: 'Levrek Izgara',
    category: 'Deniz Ürünleri',
    price: 128.99,
    description: 'Mevsim sebzeleri ile ızgara levrek',
    rating: 4.7,
    ingredients: ['Levrek', 'Zeytinyağı', 'Limon', 'Sebze'],
    isVegan: false,
    isGlutenFree: true,
    image: 'https://images.unsplash.com/photo-1559847844-d813c8a5e7f1?w=500&h=300&fit=crop',
  },
  // Ek pizza çeşitleri
  {
    id: '21',
    name: 'Pepperoni Pizza',
    category: 'Pizza',
    price: 82.99,
    description: 'Klasik pepperoni ve mozzarella peyniri',
    rating: 4.6,
    ingredients: ['Pepperoni', 'Mozzarella', 'Pizza Hamuru', 'Domates Sos'],
    isVegan: false,
    isGlutenFree: false,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=300&fit=crop',
  },
  {
    id: '22',
    name: 'Veggie Pizza',
    category: 'Pizza',
    price: 68.99,
    description: 'Karışık sebzeli vegan pizza',
    rating: 4.4,
    ingredients: ['Biber', 'Mantar', 'Soğan', 'Zeytin', 'Vegan Peynir'],
    isVegan: true,
    isGlutenFree: false,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop',
  },
  // Ek burger çeşitleri  
  {
    id: '23',
    name: 'Veggie Burger',
    category: 'Burger',
    price: 55.99,
    description: 'Sebze köftesi, avokado ve taze sebzeler',
    rating: 4.3,
    ingredients: ['Sebze Köftesi', 'Avokado', 'Marul', 'Domates'],
    isVegan: true,
    isGlutenFree: false,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&h=300&fit=crop',
  },
  // Ek pasta çeşitleri
  {
    id: '24',
    name: 'Penne Arrabbiata',
    category: 'Pasta',
    price: 62.99,
    description: 'Acılı domates sosu ile penne makarna',
    rating: 4.5,
    ingredients: ['Penne', 'Domates', 'Sarımsak', 'Pul Biber'],
    isVegan: true,
    isGlutenFree: false,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500&h=300&fit=crop',
  },
  // Ek içecekler
  {
    id: '25',
    name: 'Fresh Lemonade',
    category: 'İçecek',
    price: 18.99,
    description: 'Taze sıkılmış limonata, nane ile',
    rating: 4.4,
    ingredients: ['Limon', 'Su', 'Şeker', 'Nane'],
    isVegan: true,
    isGlutenFree: true,
    image: 'https://images.unsplash.com/photo-1523371683702-80a8e0268681?w=500&h=300&fit=crop',
  },
  {
    id: '26',
    name: 'Cold Brew Coffee',
    category: 'İçecek',
    price: 32.99,
    description: 'Soğuk demleme kahve, süt ile servis',
    rating: 4.6,
    ingredients: ['Kahve', 'Su', 'Süt', 'Şeker'],
    isVegan: false,
    isGlutenFree: true,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=300&fit=crop',
  },
];

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Ottoman Sarayı',
    description: 'Geleneksel Türk mutfağının lezzetleri',
    cuisine: ['Türk', 'Kebap', 'Pide'],
    rating: 4.8,
    deliveryTime: '25-35 dk',
    deliveryFee: 8.99,
    minimumOrder: 50.00,
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&h=400&fit=crop',
    address: {
      id: '1',
      street: 'Beşiktaş Caddesi No:456',
      city: 'İstanbul',
      state: 'İstanbul',
      zipCode: '34353',
      country: 'Türkiye',
    },
    menu: mockMenuItems.filter(item => ['Kebap', 'Pide'].includes(item.category)),
    isOpen: true,
    openingHours: [
      { day: 'Pazartesi', open: '11:00', close: '22:00', isOpen: true },
      { day: 'Salı', open: '11:00', close: '22:00', isOpen: true },
      { day: 'Çarşamba', open: '11:00', close: '22:00', isOpen: true },
      { day: 'Perşembe', open: '11:00', close: '22:00', isOpen: true },
      { day: 'Cuma', open: '11:00', close: '23:00', isOpen: true },
      { day: 'Cumartesi', open: '10:00', close: '23:00', isOpen: true },
      { day: 'Pazar', open: '10:00', close: '21:00', isOpen: true },
    ],
  },
  {
    id: '2',
    name: 'Bella Milano',
    description: 'Otantik İtalyan lezzetleri',
    cuisine: ['İtalyan', 'Pizza', 'Pasta'],
    rating: 4.6,
    deliveryTime: '30-40 dk',
    deliveryFee: 12.99,
    minimumOrder: 60.00,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
    address: {
      id: '2',
      street: 'Kadıköy Sokak No:123',
      city: 'İstanbul',
      state: 'İstanbul',
      zipCode: '34710',
      country: 'Türkiye',
    },
    menu: mockMenuItems.filter(item => ['Pizza', 'Pasta', 'Tatlı'].includes(item.category)),
    isOpen: true,
    openingHours: [
      { day: 'Pazartesi', open: '11:00', close: '22:00', isOpen: true },
      { day: 'Salı', open: '11:00', close: '22:00', isOpen: true },
      { day: 'Çarşamba', open: '11:00', close: '22:00', isOpen: true },
      { day: 'Perşembe', open: '11:00', close: '22:00', isOpen: true },
      { day: 'Cuma', open: '11:00', close: '23:00', isOpen: true },
      { day: 'Cumartesi', open: '10:00', close: '23:00', isOpen: true },
      { day: 'Pazar', open: '10:00', close: '21:00', isOpen: true },
    ],
  },
  {
    id: '3',
    name: 'Dragon Wok',
    description: 'Uzak Doğu mutfağının en iyileri',
    cuisine: ['Asya', 'Çin', 'Suşi'],
    rating: 4.4,
    deliveryTime: '20-30 dk',
    deliveryFee: 9.99,
    minimumOrder: 45.00,
    image: 'https://images.unsplash.com/photo-1562158079-6bbbf0b40a05?w=600&h=400&fit=crop',
    address: {
      id: '3',
      street: 'Şişli Bulvarı No:789',
      city: 'İstanbul',
      state: 'İstanbul',
      zipCode: '34380',
      country: 'Türkiye',
    },
    menu: mockMenuItems.filter(item => ['Suşi', 'Noodle', 'Çin'].includes(item.category)),
    isOpen: false,
    openingHours: [
      { day: 'Pazartesi', open: '11:00', close: '22:00', isOpen: true },
      { day: 'Salı', open: '11:00', close: '22:00', isOpen: true },
      { day: 'Çarşamba', open: '11:00', close: '22:00', isOpen: true },
      { day: 'Perşembe', open: '11:00', close: '22:00', isOpen: true },
      { day: 'Cuma', open: '11:00', close: '23:00', isOpen: true },
      { day: 'Cumartesi', open: '10:00', close: '23:00', isOpen: true },
      { day: 'Pazar', open: '10:00', close: '21:00', isOpen: true },
    ],
  },
  {
    id: '4',
    name: 'Burger Palace',
    description: 'Sulu burgerler ve çıtır patates',
    cuisine: ['Fast Food', 'Burger', 'Amerikan'],
    rating: 4.2,
    deliveryTime: '15-25 dk',
    deliveryFee: 6.99,
    minimumOrder: 35.00,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop',
    address: {
      id: '4',
      street: 'Taksim Meydanı No:321',
      city: 'İstanbul',
      state: 'İstanbul',
      zipCode: '34437',
      country: 'Türkiye',
    },
    menu: mockMenuItems.filter(item => ['Burger', 'Aperitif'].includes(item.category)),
    isOpen: true,
    openingHours: [
      { day: 'Pazartesi', open: '10:00', close: '24:00', isOpen: true },
      { day: 'Salı', open: '10:00', close: '24:00', isOpen: true },
      { day: 'Çarşamba', open: '10:00', close: '24:00', isOpen: true },
      { day: 'Perşembe', open: '10:00', close: '24:00', isOpen: true },
      { day: 'Cuma', open: '10:00', close: '02:00', isOpen: true },
      { day: 'Cumartesi', open: '10:00', close: '02:00', isOpen: true },
      { day: 'Pazar', open: '10:00', close: '24:00', isOpen: true },
    ],
  },
  {
    id: '5',
    name: 'Balık Evi',
    description: 'Taze deniz ürünleri ve meze çeşitleri',
    cuisine: ['Deniz Ürünleri', 'Türk', 'Meze'],
    rating: 4.7,
    deliveryTime: '35-45 dk',
    deliveryFee: 15.99,
    minimumOrder: 80.00,
    image: 'https://images.unsplash.com/photo-1559847844-d813c8a5e7f1?w=600&h=400&fit=crop',
    address: {
      id: '5',
      street: 'Bebek Sahil No:567',
      city: 'İstanbul',
      state: 'İstanbul',
      zipCode: '34342',
      country: 'Türkiye',
    },
    menu: mockMenuItems.filter(item => ['Deniz Ürünleri', 'Salata'].includes(item.category)),
    isOpen: true,
    openingHours: [
      { day: 'Pazartesi', open: '12:00', close: '23:00', isOpen: true },
      { day: 'Salı', open: '12:00', close: '23:00', isOpen: true },
      { day: 'Çarşamba', open: '12:00', close: '23:00', isOpen: true },
      { day: 'Perşembe', open: '12:00', close: '23:00', isOpen: true },
      { day: 'Cuma', open: '12:00', close: '24:00', isOpen: true },
      { day: 'Cumartesi', open: '11:00', close: '24:00', isOpen: true },
      { day: 'Pazar', open: '11:00', close: '23:00', isOpen: true },
    ],
  },
  {
    id: '6',
    name: 'Sweet Dreams',
    description: 'Özel tatlılar ve kahve çeşitleri',
    cuisine: ['Tatlı', 'Kahve', 'Pastane'],
    rating: 4.5,
    deliveryTime: '20-30 dk',
    deliveryFee: 5.99,
    minimumOrder: 25.00,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop',
    address: {
      id: '6',
      street: 'Nişantaşı Caddesi No:234',
      city: 'İstanbul',
      state: 'İstanbul',
      zipCode: '34365',
      country: 'Türkiye',
    },
    menu: mockMenuItems.filter(item => ['Tatlı', 'İçecek'].includes(item.category)),
    isOpen: true,
    openingHours: [
      { day: 'Pazartesi', open: '08:00', close: '22:00', isOpen: true },
      { day: 'Salı', open: '08:00', close: '22:00', isOpen: true },
      { day: 'Çarşamba', open: '08:00', close: '22:00', isOpen: true },
      { day: 'Perşembe', open: '08:00', close: '22:00', isOpen: true },
      { day: 'Cuma', open: '08:00', close: '23:00', isOpen: true },
      { day: 'Cumartesi', open: '09:00', close: '23:00', isOpen: true },
      { day: 'Pazar', open: '09:00', close: '21:00', isOpen: true },
    ],
  },
];

export const cuisineTypes = ['Tümü', 'Türk', 'İtalyan', 'Asya', 'Fast Food', 'Deniz Ürünleri', 'Tatlı']; 