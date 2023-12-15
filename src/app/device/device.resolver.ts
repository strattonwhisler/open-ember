import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { readAll, selectDeviceByKey } from '~domain/device/device.actions';


export const deviceResolver: ResolveFn<void> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store$ = inject(Store);
  const deviceId = route.paramMap.get('id');
  store$.dispatch(selectDeviceByKey({ deviceId }));
  store$.dispatch(readAll({ deviceId }));
};
