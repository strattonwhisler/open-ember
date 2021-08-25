import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { bleConnectSuccess } from '../ble/ble.actions';
import { exhaustMap, withLatestFrom } from 'rxjs/operators';
import { loadDeviceSuccess } from './device.state';
import { Store } from '@ngrx/store';
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
            entity: {
              deviceId,
              name: device.localName || device.device.name
            }
          })
        ];
      })
    )
  );

  constructor(private actions$: Actions, private store$: Store) {
  }
}
