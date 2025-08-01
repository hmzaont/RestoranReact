import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined' | 'warm';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export function Card({ 
  children, 
  style, 
  variant = 'default',
  padding = 'medium'
}: CardProps) {
  const cardStyle = [
    styles.base,
    styles[variant],
    styles[padding],
    style,
  ];

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 20,
    overflow: 'hidden',
  },

  // Variants
  default: {
    backgroundColor: Colors.primary.card,
    shadowColor: Colors.accent.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  elevated: {
    backgroundColor: Colors.primary.card,
    shadowColor: Colors.accent.main,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  outlined: {
    backgroundColor: Colors.primary.card,
    borderWidth: 2,
    borderColor: Colors.border.medium,
    shadowColor: Colors.accent.main,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  warm: {
    backgroundColor: Colors.secondary.background,
    borderWidth: 1,
    borderColor: Colors.border.light,
    shadowColor: Colors.secondary.main,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },

  // Padding options
  none: {
    padding: 0,
  },
  small: {
    padding: 12,
  },
  medium: {
    padding: 20,
  },
  large: {
    padding: 28,
  },
}); 