import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useReviews } from '../contexts/ReviewContext';
import { Colors } from '../constants/Colors';

export default function FirebaseStatus() {
  const { isConnected, connectionStatus } = useReviews();

  return (
    <View style={[
      styles.container, 
      { backgroundColor: isConnected ? Colors.system.success + '15' : Colors.system.error + '15' }
    ]}>
      <View style={styles.statusRow}>
        <Ionicons 
          name={isConnected ? 'checkmark-circle' : 'alert-circle'} 
          size={16} 
          color={isConnected ? Colors.system.success : Colors.system.error} 
        />
        <Text style={[
          styles.statusText, 
          { color: isConnected ? Colors.system.success : Colors.system.error }
        ]}>
          {connectionStatus}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 24,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
}); 