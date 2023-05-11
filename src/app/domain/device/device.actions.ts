import { createAction, props } from '@ngrx/store';
import { ErrorProps } from '~domain/state.utils';
import { Color } from '~shared/color.model';


export interface DeviceIdProps {
  deviceId: string;
}

/* All */

export const readAll = createAction('@open-ember/device/read-all', props<DeviceIdProps>());

/* Temperature */

export const readCurrentTemperature = createAction('@open-ember/device/read-current-temperature', props<DeviceIdProps>());
interface ReadCurrentTemperatureSuccessProps {
  currentTemperature: number;
}
export const readCurrentTemperatureSuccess = createAction('@open-ember/device/read-current-temperature/success', props<DeviceIdProps & ReadCurrentTemperatureSuccessProps>());
export const readCurrentTemperatureFailure = createAction('@open-ember/device/read-current-temperature/failure', props<ErrorProps>());

export const readTargetTemperature = createAction('@open-ember/device/read-target-temperature', props<DeviceIdProps>());
interface ReadTargetTemperatureSuccessProps {
  targetTemperature: number;
}
export const readTargetTemperatureSuccess = createAction('@open-ember/device/read-target-temperature/success', props<DeviceIdProps & ReadTargetTemperatureSuccessProps>());
export const readTargetTemperatureFailure = createAction('@open-ember/device/read-target-temperature/failure', props<ErrorProps>());

interface WriteTargetTemperatureProps {
  targetTemperature: number;
}
export const writeTargetTemperature = createAction('@open-ember/device/write-target-temperature', props<DeviceIdProps & WriteTargetTemperatureProps>());
interface WriteTargetTemperatureSuccessProps {
  targetTemperature: number;
}
export const writeTargetTemperatureSuccess = createAction('@open-ember/device/write-target-temperature/success', props<DeviceIdProps & WriteTargetTemperatureSuccessProps>());
export const writeTargetTemperatureFailure = createAction('@open-ember/device/write-target-temperature/failure', props<ErrorProps>());

/* Battery */

export const readBattery = createAction('@open-ember/device/read-battery', props<DeviceIdProps>());
interface ReadBatterySuccessProps {
  battery: number;
}
export const readBatterySuccess = createAction('@open-ember/device/read-battery/success', props<DeviceIdProps & ReadBatterySuccessProps>());
export const readBatteryFailure = createAction('@open-ember/device/read-battery/failure', props<ErrorProps>());

/* LED Color */

export const readLedColor = createAction('@open-ember/device/read-led-color', props<DeviceIdProps>());
interface ReadLedColorSuccessProps {
  color: Color;
}
export const readLedColorSuccess = createAction('@open-ember/device/read-led-color/success', props<DeviceIdProps & ReadLedColorSuccessProps>());
export const readLedColorFailure = createAction('@open-ember/device/read-led-color/failure', props<ErrorProps>());

interface WriteLedColorProps {
  color: Color;
}
export const writeLedColor = createAction('@open-ember/device/write-led-color', props<DeviceIdProps & WriteLedColorProps>());
interface WriteLedColorSuccessProps {
  color: Color;
}
export const writeLedColorSuccess = createAction('@open-ember/device/write-led-color/success', props<DeviceIdProps & WriteLedColorSuccessProps>());
export const writeLedColorFailure = createAction('@open-ember/device/write-led-color/failure', props<ErrorProps>());

/* Storage */

export const loadPersistedDevices = createAction('@open-ember/device/load-persisted-devices');

/* Utilities */

export type PropertyChangeSuccessProps =
  | ReadCurrentTemperatureSuccessProps
  | ReadTargetTemperatureSuccessProps
  | ReadBatterySuccessProps
  | ReadLedColorSuccessProps
  | WriteTargetTemperatureSuccessProps
  | WriteLedColorSuccessProps
  ;
