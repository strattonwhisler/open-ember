import { Color } from '~shared/color.model';


export class Device {
  deviceId: string;

  /** Friendly name */
  name: string;

  /** Current temperature in C */
  currentTemperature?: number;

  /** Target temperature in C */
  targetTemperature?: number;

  /** Battery 0.0 - 1.0 */
  battery?: number;

  /** Custom led color */
  color?: Color;
}
