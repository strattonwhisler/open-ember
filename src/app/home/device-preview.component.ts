import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RxFor } from '@rx-angular/template/for';
import { Device } from '~domain/device';
import { BatteryComponent } from '~shared/battery.component';
import { ColorDotComponent } from '~shared/color.component';
import { TemperatureComponent } from '~shared/temperature.component';
import { DevicePowerStatePipe } from '~shared/device-power-state.pipe';
import { NgSwitch, NgSwitchCase, PercentPipe } from '@angular/common';
import { DevicePowerState } from '~shared/device-power-state';
import { RgbaPipe } from '~shared/color.pipe';
import { TemperaturePipe } from '~shared/temperature.pipe';


@Component({
  selector: 'oe-device-preview',
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title>
          <ion-icon src="assets/mug.svg"></ion-icon>
          {{ device.name }}
        </ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <ion-grid>
          <ion-row class="ion-justify-content-between">
            <ion-col>
<!--              <oe-temperature [temperature]="device.currentTemperature" text="Current"></oe-temperature>-->
              <div class="flex ion-justify-content-center">
                  <p class="ion-text-center">
              <ion-icon name="thermometer-outline"></ion-icon>
              <br/>
              <ion-text color="medium">
                <small class="text-mute">Current</small>
              </ion-text>
                  </p>
              </div>
            </ion-col>
            <ion-col>
<!--              <oe-temperature [temperature]="device.targetTemperature" text="Target"></oe-temperature>-->
              <div class="flex ion-justify-content-center">
                  <p class="ion-text-center">
              <ion-icon name="thermometer-outline"></ion-icon>
              <br/>
              <ion-text color="medium">
                <small class="text-mute">Target</small>
              </ion-text>
                  </p>
              </div>
            </ion-col>
            <ion-col>
<!--              <oe-battery [battery]="device.battery"></oe-battery>-->
              <div class="flex ion-justify-content-center">
              <ng-container [ngSwitch]="device.battery | devicePowerState">
                <ion-icon *ngSwitchCase="DevicePowerState.Charging" name="battery-charging-outline"></ion-icon>
                <ion-icon *ngSwitchCase="DevicePowerState.Dead" name="battery-dead-outline"></ion-icon>
                <ion-icon *ngSwitchCase="DevicePowerState.Half" name="battery-half-outline"></ion-icon>
                <ion-icon *ngSwitchCase="DevicePowerState.Full" name="battery-full-outline"></ion-icon>
              </ng-container>
              </div>
            </ion-col>
            <ion-col>
<!--              <oe-color-dot [color]="device.color"></oe-color-dot>-->
              <div class="flex ion-justify-content-center">
              <ion-icon name="color-filter-outline"></ion-icon>
              </div>
            </ion-col>
          </ion-row>
          <ion-row class="ion-justify-content-between">
            <ion-col>
              <div class="flex ion-justify-content-center">
                <ion-text>{{ device.currentTemperature | temperature }}</ion-text>
              </div>
            </ion-col>
            <ion-col>
              <div class="flex ion-justify-content-center">
                <ion-text>{{ device.targetTemperature | temperature }}</ion-text>
              </div>
            </ion-col>
            <ion-col>
              <div class="flex ion-justify-content-center">
                <ion-text>{{ device.battery | percent }}</ion-text>
              </div>
            </ion-col>
            <ion-col>
              <div class="flex ion-justify-content-center">
                <svg style="height: 1em;" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
                  <circle r="0.5" cx="0.5" cy="0.5" [style.fill]="device.color | rgba"/>
                </svg>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-content>
    </ion-card>
  `,
  styles: [`
    .flex {
      display: flex;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RxFor,
    IonicModule,
    TemperatureComponent,
    BatteryComponent,
    ColorDotComponent,
    DevicePowerStatePipe,
    NgSwitchCase,
    PercentPipe,
    NgSwitch,
    RgbaPipe,
    TemperaturePipe
  ]
})
export class DevicePreviewComponent {
  readonly DevicePowerState = DevicePowerState;

  @Input() device: Device;
}
