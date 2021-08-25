import { IEntityState } from '@briebug/ngrx-auto-entity';
import { Device } from './device/device.model';
import { BleState } from './ble/ble.state';


export interface AppState {
  ble: BleState;
  device: IEntityState<Device>;
}
