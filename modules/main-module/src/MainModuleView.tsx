import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainModule from './MainModule';

export default function MainModuleView() {
  const [value, setValue] = React.useState<string>('');

  React.useEffect(() => {
    // 调用原生模块的方法
    const result = MainModule.hello();
    setValue(result);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Module View</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
});
