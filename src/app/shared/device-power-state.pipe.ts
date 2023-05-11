import { Pipe, PipeTransform } from '@angular/core';
import { DevicePowerState } from '~shared/device-power-state';


@Pipe({
  name: 'devicePowerState',
  standalone: true
})
export class DevicePowerStatePipe implements PipeTransform {
  transform(currentBattery: number): DevicePowerState {
    switch (true) {
      case currentBattery >= 0.0 && currentBattery <= 0.1:
        return DevicePowerState.Dead;
      case currentBattery > 0.1 && currentBattery <= 0.5:
        return DevicePowerState.Half;
      case currentBattery > 0.5 && currentBattery <= 1.0:
        return DevicePowerState.Full;
      default:
        return DevicePowerState.Charging;
    }
  }
}
