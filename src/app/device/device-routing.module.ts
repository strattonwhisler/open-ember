import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicePage } from './device.page';

const ROUTES: Routes = [
  { path: ':id', component: DevicePage }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class DevicesPageRoutingModule {}
