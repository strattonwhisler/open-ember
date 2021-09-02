import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { Device } from './device.model';
import { Action, createReducer } from '@ngrx/store';


export const {
  initialState,
  facade: DeviceFacadeBase,
  actions: {
    loadSuccess: loadDeviceSuccess
  }
} = buildState(Device);

const reducer = createReducer(
  initialState
);

export function deviceReducer(state: IEntityState<Device>, action: Action): IEntityState<Device> {
  return reducer(state, action);
}
