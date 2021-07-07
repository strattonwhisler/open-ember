import { AndroidBluetoothGatt } from './bluetooth-gatt.service.android';
import { IosBluetoothGatt } from './bluetooth-gatt.service.ios';


export abstract class BluetoothGatt {
  abstract async scan(): Promise<unknown>;
}

export function newPlatformBluetoothGatt(): BluetoothGatt {
  if(native.isAndroid) {
    return new AndroidBluetoothGatt();
  } else if(native.isIOS) {
    return new IosBluetoothGatt();
  } else {
    throw new Error(`Failed to instantiate BluetoothGatt for the current platform!`);
  }
}

native.PlatformBluetoothGatt = newPlatformBluetoothGatt();
