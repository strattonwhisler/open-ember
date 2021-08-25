import { IEntityState } from '@briebug/ngrx-auto-entity';
import { Device } from './device/device.model';


export interface AppState {
  device: IEntityState<Device>;
}
