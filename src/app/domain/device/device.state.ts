import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { Device } from './device.model';


export const {
  initialState,
  facade: DeviceFacadeBase,
  actions: {
    loadSuccess: loadDeviceSuccess
  }
} = buildState(Device);

export function deviceReducer(state = initialState): IEntityState<Device> {
  return state;
}
