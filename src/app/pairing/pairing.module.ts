import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PairingPageRoutingModule } from './pairing-routing.module';
import { ReactiveComponentModule } from '@ngrx/component';
import { PairingPage} from './pairing.page';
import { PairStatusPipe } from './pair-status.pipe';
import { SharedModule } from '~shared/shared.module';


const PIPES = [
  PairStatusPipe
];

const PAGES = [
  PairingPage
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PairingPageRoutingModule,
    ReactiveComponentModule,
    SharedModule
  ],
  declarations: [...PIPES, ...PAGES]
})
export class PairingPageModule {
}
