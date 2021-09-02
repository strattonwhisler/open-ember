import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicePowerStatePipe } from './device-power-state.pipe';
import { TemperaturePipe } from './temperature.pipe';


const PIPES = [
  DevicePowerStatePipe,
  TemperaturePipe
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [...PIPES],
  exports: [...PIPES]
})
export class SharedModule {}
