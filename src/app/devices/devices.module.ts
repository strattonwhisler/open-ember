import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DevicesPage } from './devices.page';

import { DevicesPageRoutingModule } from './devices-routing.module';
import { ReactiveComponentModule } from '@ngrx/component';
import { StateModule } from '../domain/state.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevicesPageRoutingModule,
    ReactiveComponentModule,
    StateModule
  ],
  declarations: [DevicesPage]
})
export class DevicesPageModule {
}
