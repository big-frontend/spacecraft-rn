import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, Text, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Accelerometer, Gyroscope, DeviceMotion } from 'expo-sensors';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface SensorData {
  x: number;
  y: number;
  z: number;
  timestamp: number;
}

interface RotationData {
  alpha: number;
  beta: number;
  gamma: number;
  timestamp: number;
}

export default function SensorChart() {
  const [accelData, setAccelData] = useState<SensorData[]>([]);
  const [gyroData, setGyroData] = useState<SensorData[]>([]);
  const [rotationData, setRotationData] = useState<RotationData[]>([]);
  const [accelSub, setAccelSub] = useState<any>(null);
  const [gyroSub, setGyroSub] = useState<any>(null);
  const [rotationSub, setRotationSub] = useState<any>(null);

  const accelBuffer = useRef<SensorData[]>([]);

  useEffect(() => {
    _subscribe();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _subscribe = () => {
    setAccelSub(
      Accelerometer.addListener((data) => {
        accelBuffer.current.push({ x: data.x, y: data.y, z: data.z, timestamp: Date.now() });
      })
    );
    setGyroSub(
      Gyroscope.addListener((data) => {
        setGyroData((prev) => {
          const newData = [
            ...prev,
            { x: data.x, y: data.y, z: data.z, timestamp: Date.now() },
          ];
          return newData.slice(-20);
        });
      })
    );
    setRotationSub(
      DeviceMotion.addListener((data) => {
        setRotationData((prev) => {
          const newData = [
            ...prev,
            {
              alpha: data.rotation?.alpha ?? 0,
              beta: data.rotation?.beta ?? 0,
              gamma: data.rotation?.gamma ?? 0,
              timestamp: Date.now(),
            },
          ];
          return newData.slice(-20);
        });
      })
    );
    // Accelerometer.setUpdateInterval(1000);
    // Gyroscope.setUpdateInterval(1000);
    // DeviceMotion.setUpdateInterval(1000);
  };

  const _unsubscribe = () => {
    accelSub && accelSub.remove();
    gyroSub && gyroSub.remove();
    rotationSub && rotationSub.remove();
    setAccelSub(null);
    setGyroSub(null);
    setRotationSub(null);
  };

  // 数据有效性检查
  const isValid = (arr: any[], keys: string[]) =>
    arr.length > 1 && arr.every(d => keys.every(k => Number.isFinite(d[k])));

  // 图表数据
  const getChartData = (arr: any[], keys: string[], legend: string[]) => ({
    labels: arr.map((_, i) => i.toString()),
    datasets: keys.map((k, idx) => ({
      data: arr.map(d => d[k]),
      color: (opacity = 1) => [
        'rgba(255,0,0,', // x/alpha 红
        'rgba(0,255,0,', // y/beta 绿
        'rgba(0,0,255,', // z/gamma 蓝
      ][idx] + opacity + ')',
      strokeWidth: 2,
    })),
    legend,
  });

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
    labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: '3', strokeWidth: '2' },
  };

  useEffect(() => {
    const id = setInterval(() => {
      setAccelData(accelBuffer.current.slice(-20));
    }, 300);
    return () => clearInterval(id);
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>加速度计 (Accelerometer)</Text>
        {isValid(accelData, ['x', 'y', 'z']) ? (
          <LineChart
            data={getChartData(accelData, ['x', 'y', 'z'], ['X轴', 'Y轴', 'Z轴'])}
            width={SCREEN_WIDTH - 40}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        ) : (
          <Text>等待加速度计数据...</Text>
        )}

        <Text style={styles.title}>陀螺仪 (Gyroscope)</Text>
        {isValid(gyroData, ['x', 'y', 'z']) ? (
          <LineChart
            data={getChartData(gyroData, ['x', 'y', 'z'], ['X轴', 'Y轴', 'Z轴'])}
            width={SCREEN_WIDTH - 40}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        ) : (
          <Text>等待陀螺仪数据...</Text>
        )}

        <Text style={styles.title}>旋转矢量 (DeviceMotion Rotation)</Text>
        {isValid(rotationData, ['alpha', 'beta', 'gamma']) ? (
          <LineChart
            data={getChartData(rotationData, ['alpha', 'beta', 'gamma'], ['Alpha', 'Beta', 'Gamma'])}
            width={SCREEN_WIDTH - 40}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        ) : (
          <Text>等待旋转矢量数据...</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
}); 