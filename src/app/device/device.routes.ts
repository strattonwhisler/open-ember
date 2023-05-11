import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { readAll } from '~domain/device/device.actions';
import { selectDeviceByKey } from '~domain/device/device.state';
import { DevicePage } from './device.page';


const resolveDevice: ResolveFn<void> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store$ = inject(Store);
  const deviceId = route.paramMap.get('id');
  store$.dispatch(selectDeviceByKey({ key: deviceId }));
  store$.dispatch(readAll({ deviceId }));
};

export const DEVICE_ROUTES: Routes = [
  {
    path: ':id',
    component: DevicePage,
    resolve: {
      device: resolveDevice
    }
  }
];
