import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicePowerStatePipe } from './device-power-state.pipe';
import { TemperaturePipe } from './temperature.pipe';
import { BatteryComponent } from './battery.component';
import { ColorComponent, ColorDotComponent } from './color.component';
import { TemperatureComponent } from './temperature.component';
import { IonicModule } from '@ionic/angular';


const COMPONENTS = [
  BatteryComponent,
  ColorComponent,
  TemperatureComponent,
  ColorDotComponent
];

const PIPES = [
  DevicePowerStatePipe,
  TemperaturePipe
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [...COMPONENTS, ...PIPES],
  exports: [...COMPONENTS, ...PIPES]
})
export class SharedModule {}
