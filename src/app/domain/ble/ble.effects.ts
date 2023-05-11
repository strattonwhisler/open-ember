import { Injectable } from '@angular/core';
import { BleClient, ScanResult } from '@capacitor-community/bluetooth-le';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, from, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, shareReplay } from 'rxjs/operators';
import { timeout } from '../state.utils';
import {
  bleConnect,
  bleConnectFailure,
  bleConnectSuccess,
  bleDisconnect,
  bleDisconnectFailure,
  bleDisconnectSuccess,
  bleInitialize,
  bleInitializeFailure,
  bleInitializeSuccess,
  bleScan,
  bleScanFailure,
  bleScanNoResults,
  bleScanResults,
  bleScanSuccess
} from './ble.actions';


@Injectable()
export class BleEffects {
  private initialized$$: Observable<void> = this.actions$.pipe(
    ofType(bleInitializeSuccess),
    shareReplay(1),
    map(() => void 0)
  );

  bleInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bleInitialize),
      exhaustMap(() => from(BleClient.initialize()).pipe(
        map(() => bleInitializeSuccess()),
        catchError(error => of(bleInitializeFailure({ error })))
      )),
    )
  );

  scanAfterInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bleInitializeSuccess),
      map(() => bleScan({ duration: 5000 }))
    )
  );

  bleScan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bleScan),
      // delayWhen(() => this.initialized$$),
      exhaustMap(({ duration }) => defer(async (): Promise<Action[]> => {
        try {
          const results: ScanResult[] = [];
          await BleClient.requestLEScan({
            // name: NAME
          }, result => results.push(result));

          await timeout(duration);

          await BleClient.stopLEScan();

          return [
            results.length > 0
              ? bleScanResults({ results })
              : bleScanNoResults(),
            bleScanSuccess()
          ];
        } catch(error) {
          return [
            bleScanFailure({ error })
          ];
        }
      }).pipe(
        mergeMap(from)
      ))
    )
  );

  bleConnect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bleConnect),
      exhaustMap(({ deviceId }) => from(BleClient.connect(deviceId)).pipe(
        map(() => bleConnectSuccess({ deviceId })),
        catchError(error => of(bleConnectFailure({ error })))
      ))
    )
  );

  bleDisconnect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bleDisconnect),
      exhaustMap(({ deviceId }) => from(BleClient.disconnect(deviceId)).pipe(
        map(() => bleDisconnectSuccess({ deviceId })),
        catchError(error => of(bleDisconnectFailure({ error })))
      ))
    )
  );

  constructor(private actions$: Actions) {
  }
}
