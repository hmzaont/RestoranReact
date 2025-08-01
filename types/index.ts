export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  rating: number;
  image?: string;
  ingredients?: string[];
  allergens?: string[];
  isVegan?: boolean;
  isGlutenFree?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'preparing' | 'ready' | 'delivered' | 'cancelled';
  items: string[] | OrderItem[];
  total: number;
  estimatedTime?: number;
  date?: string;
  restaurant: string;
  deliveryAddress?: Address;
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
  customizations?: Customization[];
}

export interface Customization {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
  label?: string; // Home, Work, etc.
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  favoriteItems: string[];
  dietaryPreferences: DietaryPreference[];
}

export interface DietaryPreference {
  id: string;
  name: string;
  type: 'allergy' | 'preference';
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  image: string;
  address: Address;
  menu: MenuItem[];
  isOpen: boolean;
  openingHours: OpeningHours[];
}

export interface OpeningHours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations: Customization[];
  specialInstructions?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'applepay' | 'googlepay';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promotion' | 'system';
  isRead: boolean;
  createdAt: string;
}

export type TabParamList = {
  index: undefined;
  menu: undefined;
  orders: undefined;
  profile: undefined;
}; 