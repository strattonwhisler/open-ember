// import { BluetoothGatt } from './nativescript/services/bluetooth-gatt.service';
// import { PlatformNotification } from './shared/platform-notification';


declare module '@nativescript/capacitor' {
  export interface customNativeAPI extends nativeCustom {}
}

/**
 * Define your own custom strongly typed native helpers here.
 */
export interface nativeCustom {
  hello(): void;

  // pollPlatformNotifications(): Array<PlatformNotification>;
  // PlatformBluetoothGatt: BluetoothGatt;
}
