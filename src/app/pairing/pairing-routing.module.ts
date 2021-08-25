import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PairingPage } from './pairing.page';

const ROUTES: Routes = [
  { path: '', component: PairingPage }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PairingPageRoutingModule {
}
