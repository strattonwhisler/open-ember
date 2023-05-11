import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, withLatestFrom } from 'rxjs/operators';
import { readAll } from '~domain/device/device.actions';
import { bleConnectSuccess } from '../ble/ble.actions';
import { scanResults } from '../ble/ble.selectors';
import { loadDeviceSuccess } from './device.state';


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
            entity: {
              deviceId,
              name: device.localName || device.device.name
            }
          }),
          readAll({ deviceId })
        ];
      })
    )
  );

  constructor(private actions$: Actions, private store$: Store) {
  }
}
