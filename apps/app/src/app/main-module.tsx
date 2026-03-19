import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { Stack, router } from 'expo-router';

import MainModule, { type ChangeEventPayload, type MainModuleEvents } from 'main-module';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function MainModuleScreen() {
  const [helloText, setHelloText] = useState<string>('');
  const [valueToSet, setValueToSet] = useState<string>('Hello from MainModule page');
  const [lastChangedValue, setLastChangedValue] = useState<string>('');
  const piText = useMemo(() => String(MainModule.PI), []);

  useEffect(() => {
    setHelloText(MainModule.hello());

    const maybeAddListener = (MainModule as unknown as { addListener?: MainModuleEvents['onChange'] extends (...args: any[]) => any ? (eventName: 'onChange', listener: (payload: ChangeEventPayload) => void) => { remove: () => void } : never }).addListener;
    if (!maybeAddListener) return;

    const subscription = maybeAddListener('onChange', (payload) => {
      setLastChangedValue(payload.value);
    });

    return () => subscription.remove();
  }, []);

  const onPressSetValue = async () => {
    await MainModule.setValueAsync(valueToSet);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'MainModule' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">MainModule</ThemedText>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">Navigation</ThemedText>
          <TouchableOpacity onPress={() => (router.push as unknown as (href: string) => void)('/settings')} style={styles.button}>
            <ThemedText type="defaultSemiBold">Open Settings</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">Constants</ThemedText>
          <ThemedText>PI: {piText}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">hello()</ThemedText>
          <ThemedText>{helloText}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">setValueAsync(value)</ThemedText>
          <View style={styles.row}>
            <TextInput
              value={valueToSet}
              onChangeText={setValueToSet}
              placeholder="Value to set"
              placeholderTextColor="#8E8E93"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity onPress={onPressSetValue} style={styles.button}>
              <ThemedText type="defaultSemiBold">Set</ThemedText>
            </TouchableOpacity>
          </View>
          {lastChangedValue ? (
            <ThemedText>onChange: {lastChangedValue}</ThemedText>
          ) : (
            <ThemedText type="default" style={styles.muted}>
              Tip: On web, setValueAsync will emit an onChange event.
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  card: {
    gap: 8,
    padding: 12,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#111',
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C7C7CC',
  },
  muted: {
    opacity: 0.7,
  },
});

