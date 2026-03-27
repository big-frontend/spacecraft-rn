import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './MainModule.types';

type MainModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class MainModule extends NativeModule<MainModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(MainModule, 'MainModule');
