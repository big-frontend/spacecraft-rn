import { requireNativeModule } from 'expo-modules-core';
import { MainModuleEvents } from './MainModule.types';

interface MainModuleInterface {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<MainModuleInterface>('MainModule');
