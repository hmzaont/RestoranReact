import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

interface ImageViewProps {
  source?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
  placeholder?: 'restaurant' | 'food' | 'user';
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

export function ImageView({
  source,
  width = 100,
  height = 100,
  borderRadius = 12,
  style,
  placeholder = 'food',
  resizeMode = 'cover',
}: ImageViewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getPlaceholderIcon = () => {
    switch (placeholder) {
      case 'restaurant':
        return 'storefront';
      case 'user':
        return 'person';
      case 'food':
      default:
        return 'restaurant';
    }
  };

  const containerStyle = [
    styles.container,
    {
      width,
      height,
      borderRadius,
    },
    style,
  ];

  const imageStyle = {
    width: '100%',
    height: '100%',
    borderRadius,
  };

  if (!source || hasError) {
    return (
      <View style={[containerStyle, styles.placeholder]}>
        <Ionicons 
          name={getPlaceholderIcon()} 
          size={Math.min(width, height) * 0.4} 
          color={Colors.secondary.main} 
        />
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <Image
        source={{ uri: source }}
        style={imageStyle}
        contentFit={resizeMode}
        transition={300}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        placeholder={{
          blurhash: 'LKN0$W9F1voz~qWCIARP%2M{M{RP',
        }}
        cachePolicy="memory-disk"
      />
      
      {/* Loading Overlay */}
      {isLoading && !hasError && (
        <View style={[styles.overlay, { borderRadius }]}>
          <View style={styles.loadingSpinner}>
            <Ionicons name="refresh" size={24} color={Colors.secondary.main} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: Colors.primary.surface,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary.surface,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingSpinner: {
    padding: 8,
  },
}); 