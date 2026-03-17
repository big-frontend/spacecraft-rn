import { StyleSheet } from 'react-native';

import ParallaxScrollView from '../components/ParallaxScrollView';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { HelloWave } from '../components/HelloWave';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <ThemedView style={styles.headerImage}>
          <HelloWave />
        </ThemedView>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello!</ThemedText>
      </ThemedView>
      <ThemedText>
        Welcome to your Expo app! This is a template with some example code to help you get started.
      </ThemedText>
      <ThemedText>
        The app includes a tab navigator with two screens, a light and dark mode toggle, and some
        example components.
      </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});