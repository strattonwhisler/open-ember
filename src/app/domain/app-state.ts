import { Device } from './device';
import { BleState } from './ble';
import { DeviceState } from '~domain/device/device.state';


export interface AppState {
  ble: BleState;
  device: DeviceState;
}
