import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ReviewProvider } from '../contexts/ReviewContext';
import { CartProvider } from '../contexts/CartContext';
import { OrderProvider } from '../contexts/OrderContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ReviewProvider>
        <CartProvider>
          <OrderProvider>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(auth)" />
            </Stack>
          </OrderProvider>
        </CartProvider>
      </ReviewProvider>
    </SafeAreaProvider>
  );
} 