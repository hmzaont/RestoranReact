import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useCart } from '../../contexts/CartContext';

function CartIcon({ color, size, focused }: { color: string; size: number; focused: boolean }) {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <View style={{ position: 'relative' }}>
      <Ionicons 
        name={focused ? "bag" : "bag-outline"} 
        size={size} 
        color={color} 
      />
      {itemCount > 0 && (
        <View style={{
          position: 'absolute',
          right: -8,
          top: -8,
          backgroundColor: Colors.secondary.main,
          borderRadius: 10,
          minWidth: 20,
          height: 20,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 4,
        }}>
          <Text style={{
            color: Colors.text.white,
            fontSize: 12,
            fontWeight: '700',
          }}>
            {itemCount > 99 ? '99+' : itemCount}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.secondary.main,
        tabBarInactiveTintColor: Colors.text.muted,
        tabBarStyle: {
          backgroundColor: Colors.primary.card,
          borderTopWidth: 0,
          shadowColor: Colors.accent.main,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 8,
          height: 88,
          paddingBottom: 34,
          paddingTop: 12,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
        headerStyle: {
          backgroundColor: Colors.primary.background,
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: Colors.accent.main,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
        headerShown: false, // Her tab'da kendi header'ını gösterecek
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={size} 
              color={color} 
            />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
        }}
      />
      <Tabs.Screen
        name="restaurants"
        options={{
          title: 'Restoranlar',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "storefront" : "storefront-outline"} 
              size={size} 
              color={color} 
            />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menü',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "restaurant" : "restaurant-outline"} 
              size={size} 
              color={color} 
            />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Sepet',
          tabBarIcon: ({ color, size, focused }) => (
            <CartIcon color={color} size={size} focused={focused} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Siparişler',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "receipt" : "receipt-outline"} 
              size={size} 
              color={color} 
            />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={size} 
              color={color} 
            />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
        }}
      />
      <Tabs.Screen
        name="restaurant"
        options={{
          href: null, // Bu route'u tab bar'da gösterme
        }}
      />
    </Tabs>
  );
} 