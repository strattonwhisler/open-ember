import { BluetoothGatt } from './bluetooth-gatt.service';


export class IosBluetoothGatt extends BluetoothGatt {
  async scan(): Promise<unknown> {
    return null;
  }
}
