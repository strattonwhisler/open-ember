import { createAction, props } from '@ngrx/store';
import { ErrorProps } from '~domain/state.utils';
import { Color } from '~shared/color.model';


interface DeviceIdProps {
  deviceId: string;
}

/* Temperature */

export const readCurrentTemperature = createAction('@open-ember/device/read-current-temperature', props<DeviceIdProps>());
interface ReadCurrentTemperatureSuccessProps {
  currentTemperature: number;
}
export const readCurrentTemperatureSuccess = createAction('@open-ember/device/read-current-temperature/success', props<ReadCurrentTemperatureSuccessProps>());
export const readCurrentTemperatureFailure = createAction('@open-ember/device/read-current-temperature/failure', props<ErrorProps>());

export const readTargetTemperature = createAction('@open-ember/device/read-target-temperature', props<DeviceIdProps>());
interface ReadTargetTemperatureSuccessProps {
  targetTemperature: number;
}
export const readTargetTemperatureSuccess = createAction('@open-ember/device/read-target-temperature/success', props<ReadTargetTemperatureSuccessProps>());
export const readTargetTemperatureFailure = createAction('@open-ember/device/read-target-temperature/failure', props<ErrorProps>());

interface WriteTargetTemperatureProps {
  targetTemperature: number;
}
export const writeTargetTemperature = createAction('@open-ember/device/write-target-temperature', props<DeviceIdProps & WriteTargetTemperatureProps>());
interface WriteTargetTemperatureSuccessProps {
  targetTemperature: number;
}
export const writeTargetTemperatureSuccess = createAction('@open-ember/device/write-target-temperature/success', props<WriteTargetTemperatureSuccessProps>());
export const writeTargetTemperatureFailure = createAction('@open-ember/device/write-target-temperature/failure', props<ErrorProps>());

/* Battery */

export const readBattery = createAction('@open-ember/device/read-battery', props<DeviceIdProps>());
interface ReadBatterySuccessProps {
  batteryLevel: number;
}
export const readBatterySuccess = createAction('@open-ember/device/read-battery/success', props<ReadBatterySuccessProps>());
export const readBatteryFailure = createAction('@open-ember/device/read-battery/failure', props<ErrorProps>());

/* LED Color */

export const readLedColor = createAction('@open-ember/device/read-led-color', props<DeviceIdProps>());
interface ReadLedColorSuccessProps {
  color: Color;
}
export const readLedColorSuccess = createAction('@open-ember/device/read-led-color/success', props<ReadLedColorSuccessProps>());
export const readLedColorFailure = createAction('@open-ember/device/read-led-color/failure', props<ErrorProps>());

interface WriteLedColorProps {
  color: Color;
}
export const writeLedColor = createAction('@open-ember/device/write-led-color', props<DeviceIdProps & WriteLedColorProps>());
interface WriteLedColorSuccessProps {
  color: Color;
}
export const writeLedColorSuccess = createAction('@open-ember/device/write-led-color/success', props<WriteLedColorSuccessProps>());
export const writeLedColorFailure = createAction('@open-ember/device/write-led-color/failure', props<ErrorProps>());
