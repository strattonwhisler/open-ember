import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { Device } from './device.model';
import { Action, createReducer, on } from '@ngrx/store';
import {
  DeviceIdProps, readBatterySuccess,
  readCurrentTemperatureSuccess, readLedColorSuccess,
  PropertyChangeSuccessProps,
  readTargetTemperatureSuccess, writeLedColorSuccess, writeTargetTemperatureSuccess
} from '~domain/device/device.actions';


export const {
  initialState,
  facade: DeviceFacadeBase,
  actions: {
    loadSuccess: loadDeviceSuccess
  }
} = buildState(Device);

export interface DeviceState extends IEntityState<Device> {
}

export const reduceDevicePropertyChange = (property: keyof Device) => (state: DeviceState, action: DeviceIdProps & PropertyChangeSuccessProps): DeviceState => ({
  ...state,
  entities: {
    ...state.entities,
    [action.deviceId]: {
      ...state.entities[action.deviceId],
      [property]: action[property]
    }
  }
});

const reducer = createReducer(
  initialState,
  on(readCurrentTemperatureSuccess, reduceDevicePropertyChange('currentTemperature')),
  on(readTargetTemperatureSuccess, writeTargetTemperatureSuccess, reduceDevicePropertyChange('targetTemperature')),
  on(readBatterySuccess, reduceDevicePropertyChange('battery')),
  on(readLedColorSuccess, writeLedColorSuccess, reduceDevicePropertyChange('color')),
);

export function deviceReducer(state: DeviceState, action: Action): DeviceState {
  return reducer(state, action);
}
