import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { PairingPageRoutingModule } from "./pairing-routing.module";
import { ReactiveComponentModule } from '@ngrx/component';
import { StateModule } from '../domain/state.module';
import { PairingPage } from './pairing.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PairingPageRoutingModule,
    ReactiveComponentModule,
    StateModule
  ],
  declarations: [PairingPage]
})
export class PairingPageModule {
}
