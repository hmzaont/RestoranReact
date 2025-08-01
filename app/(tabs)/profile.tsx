import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';
import { Card, ImageView } from '../../components/ui';
import { mockUser } from '../../data/mockData';

const STATS_DATA = [
  { id: '1', title: 'Toplam Sipariş', value: '47', icon: 'receipt', color: Colors.secondary.main },
  { id: '2', title: 'Favori Yemek', value: '12', icon: 'heart', color: Colors.system.error },
  { id: '3', title: 'Puan', value: '2,450', icon: 'star', color: Colors.system.warning },
  { id: '4', title: 'Tasarruf', value: '₺127', icon: 'wallet', color: Colors.system.success },
];

const SETTINGS_SECTIONS = [
  {
    id: '1',
    title: 'Hesap',
    items: [
      { id: '1', title: 'Kişisel Bilgiler', icon: 'person-outline', subtitle: 'Ad, email, telefon' },
      { id: '2', title: 'Adreslerim', icon: 'location-outline', subtitle: '3 kayıtlı adres' },
      { id: '3', title: 'Ödeme Yöntemleri', icon: 'card-outline', subtitle: '2 kayıtlı kart' },
    ],
  },
  {
    id: '2',
    title: 'Tercihler',
    items: [
      { id: '4', title: 'Bildirimler', icon: 'notifications-outline', subtitle: 'Push, email bildirimleri' },
      { id: '5', title: 'Dil Ayarları', icon: 'language-outline', subtitle: 'Türkçe' },
      { id: '6', title: 'Tema', icon: 'moon-outline', subtitle: 'Açık tema' },
    ],
  },
  {
    id: '3',
    title: 'Destek',
    items: [
      { id: '7', title: 'Yardım Merkezi', icon: 'help-circle-outline', subtitle: 'SSS ve rehberler' },
      { id: '8', title: 'İletişim', icon: 'mail-outline', subtitle: 'Bize ulaşın' },
      { id: '9', title: 'Geri Bildirim', icon: 'chatbubble-outline', subtitle: 'Önerileriniz' },
    ],
  },
];

export default function ProfileScreen() {
  const renderStatsCard = (item: typeof STATS_DATA[0]) => (
    <Card key={item.id} variant="default" padding="medium" style={styles.statsCard}>
      <View style={[styles.statsIcon, { backgroundColor: `${item.color}15` }]}>
        <Ionicons name={item.icon as any} size={24} color={item.color} />
      </View>
      <Text style={styles.statsValue}>{item.value}</Text>
      <Text style={styles.statsTitle}>{item.title}</Text>
    </Card>
  );

  const renderSettingsItem = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.settingsItem}>
      <View style={styles.settingsItemLeft}>
        <View style={styles.settingsIcon}>
          <Ionicons name={item.icon} size={20} color={Colors.secondary.main} />
        </View>
        <View style={styles.settingsTextContainer}>
          <Text style={styles.settingsItemTitle}>{item.title}</Text>
          <Text style={styles.settingsItemSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color={Colors.text.muted} />
    </TouchableOpacity>
  );

  const renderSettingsSection = (section: typeof SETTINGS_SECTIONS[0]) => (
    <View key={section.id} style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Card variant="default" padding="none" style={styles.settingsCard}>
        {section.items.map((item, index) => (
          <View key={item.id}>
            {renderSettingsItem(item)}
            {index < section.items.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </Card>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profil</Text>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={24} color={Colors.secondary.main} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <Card variant="elevated" padding="none" style={styles.profileCard}>
          <LinearGradient
            colors={['#FF6B47', '#FFB347']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileGradient}
          >
            <View style={styles.profileContent}>
              <View style={styles.avatarContainer}>
                <ImageView
                  source="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  width={80}
                  height={80}
                  borderRadius={40}
                  placeholder="user"
                />
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                </View>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{mockUser.name}</Text>
                <Text style={styles.userEmail}>{mockUser.email}</Text>
                <Text style={styles.userPhone}>{mockUser.phone}</Text>
              </View>
            </View>
          </LinearGradient>
        </Card>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>İstatistikler</Text>
          <View style={styles.statsGrid}>
            {STATS_DATA.map(renderStatsCard)}
          </View>
        </View>

        {/* Settings Sections */}
        {SETTINGS_SECTIONS.map(renderSettingsSection)}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color={Colors.system.error} />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.accent.main,
  },
  editButton: {
    padding: 8,
  },
  
  // Profile Card
  profileCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    overflow: 'hidden',
  },
  profileGradient: {
    padding: 24,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 20,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    backgroundColor: Colors.primary.card,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    backgroundColor: Colors.system.success,
    borderRadius: 6,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text.white,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  // Stats
  statsContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.accent.main,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
  },
  statsCard: {
    flex: 1,
    alignItems: 'center',
  },
  statsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statsTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text.secondary,
    textAlign: 'center',
  },

  // Settings
  settingsSection: {
    marginBottom: 24,
  },
  settingsCard: {
    marginHorizontal: 24,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.secondary.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingsTextContainer: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 2,
  },
  settingsItemSubtitle: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border.light,
    marginLeft: 76,
  },

  // Logout
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: `${Colors.system.error}10`,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: `${Colors.system.error}20`,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.system.error,
  },
  bottomSpacer: {
    height: 24,
  },
}); 