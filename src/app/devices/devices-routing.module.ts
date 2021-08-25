import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesPage } from './devices.page';

const ROUTES: Routes = [
  { path: '', component: DevicesPage }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class DevicesPageRoutingModule {}
