import { requireNativeModule } from 'expo-modules-core';

interface ICppModule {
  processData(input: string): Promise<string>;
  calculateValue(x: number, y: number, z: number): Promise<number>;
}

export default requireNativeModule<ICppModule>('CppModule'); 