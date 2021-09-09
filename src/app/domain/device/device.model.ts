import { Entity, Key } from '@briebug/ngrx-auto-entity';
import { Color } from '~shared/color.model';

@Entity({
  modelName: 'Device'
})
export class Device {
  @Key deviceId: string;

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
