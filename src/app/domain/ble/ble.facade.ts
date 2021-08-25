import { Injectable } from '@angular/core';
import { AppState } from '@capacitor/app';
import { select, Store } from '@ngrx/store';
import {
  bleConnect, bleConnectFailure, bleConnectSuccess,
  bleDisconnect,
  bleInitialize,
  bleScan,
  bleScanFailure,
  bleScanResults,
  bleScanSuccess
} from './ble.actions';
import { merge, Observable } from 'rxjs';
import { ScanResult } from '@capacitor-community/bluetooth-le';
import { Actions, ofType } from '@ngrx/effects';
import { map, mapTo, shareReplay } from 'rxjs/operators';
import * as EmberBle from './ember-ble.consts';
import { scanResults } from './ble.selectors';


@Injectable()
export class BleFacade {
  readonly scanning$: Observable<boolean> = merge(
    this.actions$.pipe(ofType(bleScan), mapTo(true)),
    this.actions$.pipe(ofType(bleScanSuccess, bleScanFailure), mapTo(false)),
  ).pipe(
    shareReplay(1)
  );

  readonly connecting$: Observable<boolean> = merge(
    this.actions$.pipe(ofType(bleConnect), mapTo(true)),
    this.actions$.pipe(ofType(bleConnectSuccess, bleConnectFailure), mapTo(false)),
  ).pipe(
    shareReplay(1)
  );

  readonly scanResults$: Observable<ScanResult[]> = this.store$.pipe(
    select(scanResults),
    map(results => results.filter(result => result.device.name === EmberBle.NAME)),
    shareReplay(1)
  );

  constructor(private store$: Store<AppState>, private actions$: Actions) {}

  initialize(): void {
    this.store$.dispatch(bleInitialize());
  }

  scan(): void {
    this.store$.dispatch(bleScan({ duration: 5000 }));
  }

  connect(deviceId: string): void {
    this.store$.dispatch(bleConnect({ deviceId }));
  }

  disconnect(deviceId: string): void {
    this.store$.dispatch(bleDisconnect({ deviceId }));
  }
}
