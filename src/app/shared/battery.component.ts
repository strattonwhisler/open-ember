import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DevicePowerState } from './device-power-state';
import { NgSwitch, NgSwitchCase, PercentPipe } from '@angular/common';
import { DevicePowerStatePipe } from '~shared/device-power-state.pipe';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'oe-battery',
  template: `
    <ion-text>
      {{ battery | percent }}
      <ng-container [ngSwitch]="battery | devicePowerState">
        <ion-icon *ngSwitchCase="DevicePowerState.Charging" name="battery-charging-outline"></ion-icon>
        <ion-icon *ngSwitchCase="DevicePowerState.Dead" name="battery-dead-outline"></ion-icon>
        <ion-icon *ngSwitchCase="DevicePowerState.Half" name="battery-half-outline"></ion-icon>
        <ion-icon *ngSwitchCase="DevicePowerState.Full" name="battery-full-outline"></ion-icon>
      </ng-container>
    </ion-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PercentPipe,
    DevicePowerStatePipe,
    NgSwitch,
    NgSwitchCase,
    IonicModule
  ]
})
export class BatteryComponent {
  readonly DevicePowerState = DevicePowerState;

  @Input() battery: number;
}
