import { Device } from './device.model';
import { Action, createReducer, on } from '@ngrx/store';
import {
  deleteDeviceByKey,
  DeviceIdProps,
  DeviceProps,
  DevicesProps,
  loadAllDevices,
  loadAllDevicesSuccess,
  loadDeviceByKey,
  loadDeviceSuccess,
  PropertyChangeSuccessProps,
  readBatterySuccess,
  readCurrentTemperatureSuccess,
  readLedColorSuccess,
  readTargetTemperatureSuccess,
  selectDeviceByKey,
  writeLedColorSuccess,
  writeTargetTemperatureSuccess
} from './device.actions';


export interface DeviceState {
  entities: Record<string, Device>;
  ids: string[];
  selections: {
    currentEntityKey?: string;
  };
  tracking: {
    isLoading?: boolean;
    loadedAt?: number;
  };
}

export const initialDeviceState: DeviceState = {
  entities: {},
  ids: [],
  selections: {},
  tracking: {}
}

export const reduceLoadDeviceSuccess = (state: DeviceState, action: DeviceProps): DeviceState => ({
  ...state,
  entities: {
    ...state.entities,
    [action.device.deviceId]: action.device,
  },
  ids: [
    ...state.ids,
    action.device.deviceId
  ]
});

export const reduceLoadAllDevicesSuccess = (state: DeviceState, action: DevicesProps): DeviceState => {
  const entities = { ...state.entities };
  const ids = [...state.ids];

  for (const device of action.devices) {
    entities[device.deviceId] = device;
    ids.push(device.deviceId);
  }

  return {
    ...state,
    entities,
    ids
  };
}

export const reduceLoadStart = (state: DeviceState, /* unused */): DeviceState => ({
  ...state,
  tracking: {
    ...state.tracking,
    isLoading: true
  }
});

export const reduceLoadEnd = (state: DeviceState, /* unused */): DeviceState => ({
  ...state,
  tracking: {
    ...state.tracking,
    isLoading: false
  }
});

export const reduceDeleteDeviceByKey = (state: DeviceState, action: DeviceIdProps): DeviceState => ({
  ...state,
  entities: {
   ...state.entities,
    [action.deviceId]: undefined
  },
  ids: state.ids.filter(id => id !== action.deviceId)
});

export const reduceSelectDeviceByKey = (state: DeviceState, action: DeviceIdProps): DeviceState => ({
  ...state,
  selections: {
    ...state.selections,
    currentEntityKey: action.deviceId
  }
});

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
  initialDeviceState,
  on(loadDeviceSuccess, reduceLoadDeviceSuccess),
  on(loadAllDevicesSuccess, reduceLoadAllDevicesSuccess),
  on(loadDeviceByKey, loadAllDevices, reduceLoadStart),
  on(loadDeviceSuccess, loadAllDevicesSuccess, reduceLoadEnd),
  on(deleteDeviceByKey, reduceDeleteDeviceByKey),
  on(selectDeviceByKey, reduceSelectDeviceByKey),
  on(readCurrentTemperatureSuccess, reduceDevicePropertyChange('currentTemperature')),
  on(readTargetTemperatureSuccess, writeTargetTemperatureSuccess, reduceDevicePropertyChange('targetTemperature')),
  on(readBatterySuccess, reduceDevicePropertyChange('battery')),
  on(readLedColorSuccess, writeLedColorSuccess, reduceDevicePropertyChange('color')),
);

export function deviceReducer(state: DeviceState, action: Action): DeviceState {
  return reducer(state, action);
}
