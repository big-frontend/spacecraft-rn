import { View, StyleSheet } from 'react-native';
import SensorChart from '../components/SensorChart';

export default function Home() {
  return (
    <View style={styles.container}>
      <SensorChart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 