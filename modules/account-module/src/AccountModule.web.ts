import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './AccountModule.types';

type AccountModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class AccountModule extends NativeModule<AccountModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(AccountModule, 'AccountModule');
