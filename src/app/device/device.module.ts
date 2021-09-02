import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DevicePage } from './device.page';
import { DevicesPageRoutingModule } from './device-routing.module';
import { ReactiveComponentModule } from '@ngrx/component';
import { SharedModule } from '~shared/shared.module';


const PAGES = [
  DevicePage
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevicesPageRoutingModule,
    ReactiveComponentModule,
    SharedModule
  ],
  declarations: [...PAGES]
})
export class DevicePageModule {
}
