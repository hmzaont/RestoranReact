import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  useEffect(() => {
    // Auto redirect to home page
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>RestoranPro Yükleniyor...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  text: {
    fontSize: 18,
    color: '#FF6B47',
    fontWeight: '600',
  },
}); 