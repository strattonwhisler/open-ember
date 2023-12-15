import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, withLatestFrom } from 'rxjs/operators';
import { loadDeviceSuccess, readAll } from './device.actions';
import { bleConnectSuccess } from '../ble/ble.actions';
import { scanResults } from '../ble/ble.selectors';


@Injectable()
export class DeviceEffects {
  connected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bleConnectSuccess),
      withLatestFrom(
        this.store$.select(scanResults)
      ),
      exhaustMap(([{ deviceId }, results]) => {
        const device = results.find(result => result.device.deviceId === deviceId);
        return [
          loadDeviceSuccess({
            device: {
              deviceId,
              name: device.localName || device.device.name
            },
            correlationId: crypto.randomUUID()
          }),
          readAll({ deviceId })
        ];
      })
    )
  );

  constructor(private actions$: Actions, private store$: Store) {
  }
}
