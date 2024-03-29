import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectDeviceByKey } from "~domain/device/device.state";

export const initPairingDetailsResolver: ResolveFn<void> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void => {
  const store = inject(Store);
  const key = route.paramMap.get('deviceId');
  store.dispatch(selectDeviceByKey({ key }));
};
