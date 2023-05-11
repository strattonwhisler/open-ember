import { IEntityState } from '@briebug/ngrx-auto-entity';
import { Device } from './device';
import { BleState } from './ble';


export interface AppState {
  ble: BleState;
  device: IEntityState<Device>;
}
