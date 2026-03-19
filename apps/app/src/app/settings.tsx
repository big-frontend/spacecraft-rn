import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Switch, TextInput, View } from 'react-native';

import { Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

type Units = 'metric' | 'imperial';

export default function SettingsScreen() {
  const [displayName, setDisplayName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [units, setUnits] = useState<Units>('metric');

  const borderColor = useThemeColor({ light: '#C7C7CC', dark: '#3A3A3C' }, 'text');
  const inputTextColor = useThemeColor({ light: '#111', dark: '#F2F2F7' }, 'text');
  const placeholderTextColor = useThemeColor({ light: '#8E8E93', dark: '#8E8E93' }, 'text');

  const unitsLabel = useMemo(() => (units === 'metric' ? 'Metric (km, °C)' : 'Imperial (mi, °F)'), [units]);

  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ThemedView style={styles.container}>
          <ThemedText type="title">Settings</ThemedText>

          <ThemedView style={styles.card}>
            <ThemedText type="subtitle">Profile</ThemedText>

            <View style={styles.field}>
              <ThemedText type="defaultSemiBold">Display name</ThemedText>
              <TextInput
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="e.g. Alex Chen"
                placeholderTextColor={placeholderTextColor}
                style={[styles.input, { borderColor, color: inputTextColor }]}
                autoCapitalize="words"
                autoCorrect={false}
                textContentType="name"
              />
            </View>

            <View style={styles.field}>
              <ThemedText type="defaultSemiBold">Email</ThemedText>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                placeholderTextColor={placeholderTextColor}
                style={[styles.input, { borderColor, color: inputTextColor }]}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
              />
            </View>
          </ThemedView>

          <ThemedView style={styles.card}>
            <ThemedText type="subtitle">Preferences</ThemedText>

            <View style={styles.rowBetween}>
              <View style={styles.rowLabel}>
                <ThemedText type="defaultSemiBold">Notifications</ThemedText>
                <ThemedText type="default" style={styles.muted}>
                  Mission updates and alerts
                </ThemedText>
              </View>
              <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
            </View>

            <View style={styles.field}>
              <ThemedText type="defaultSemiBold">Units</ThemedText>
              <View style={styles.pillRow}>
                <View
                  style={[
                    styles.pill,
                    { borderColor },
                    units === 'metric' ? styles.pillActive : undefined,
                  ]}
                >
                  <ThemedText
                    type="defaultSemiBold"
                    onPress={() => setUnits('metric')}
                    style={styles.pillText}
                  >
                    Metric
                  </ThemedText>
                </View>
                <View
                  style={[
                    styles.pill,
                    { borderColor },
                    units === 'imperial' ? styles.pillActive : undefined,
                  ]}
                >
                  <ThemedText
                    type="defaultSemiBold"
                    onPress={() => setUnits('imperial')}
                    style={styles.pillText}
                  >
                    Imperial
                  </ThemedText>
                </View>
              </View>
              <ThemedText type="default" style={styles.muted}>
                Current: {unitsLabel}
              </ThemedText>
            </View>
          </ThemedView>
        </ThemedView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  card: {
    gap: 12,
    padding: 12,
    borderRadius: 12,
  },
  field: {
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  rowLabel: {
    flex: 1,
    gap: 4,
  },
  muted: {
    opacity: 0.7,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  pill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pillActive: {
    opacity: 0.9,
  },
  pillText: {
    lineHeight: 18,
  },
});

