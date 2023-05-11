import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RxFor } from '@rx-angular/template/for';
import { Device } from '~domain/device';
import { BatteryComponent } from '~shared/battery.component';
import { ColorDotComponent } from '~shared/color.component';
import { TemperatureComponent } from '~shared/temperature.component';


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
              <oe-temperature [temperature]="device.currentTemperature" text="Current"></oe-temperature>
            </ion-col>
            <ion-col>
              <oe-temperature [temperature]="device.targetTemperature" text="Target"></oe-temperature>
            </ion-col>
            <ion-col>
              <oe-battery [battery]="device.battery"></oe-battery>
            </ion-col>
            <ion-col>
              <oe-color-dot [color]="device.color"></oe-color-dot>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-content>
    </ion-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RxFor,
    IonicModule,
    TemperatureComponent,
    BatteryComponent,
    ColorDotComponent
  ]
})
export class DevicePreviewComponent {
  @Input() device: Device;
}
