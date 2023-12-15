import { Routes } from '@angular/router';
import { DevicePage } from './device.page';
import { deviceResolver } from './device.resolver';


export const DEVICE_ROUTES: Routes = [
  {
    path: ':id',
    component: DevicePage,
    resolve: {
      device: deviceResolver
    }
  }
];
