import { Injectable } from '@angular/core';
import { AppState } from '@capacitor/app';
import { Store } from '@ngrx/store';
import {
  bleConnect,
  bleDisconnect,
  bleInitialize,
  bleScan,
  bleScanFailure,
  bleScanResults,
  bleScanSuccess
} from './ble.state';
import { merge, Observable } from 'rxjs';
import { ScanResult } from '@capacitor-community/bluetooth-le';
import { Actions, ofType } from '@ngrx/effects';
import { map, mapTo, shareReplay } from 'rxjs/operators';
import { NAME } from './ember-ble.consts';


@Injectable()
export class BleFacade {
  readonly scanning$: Observable<boolean> = merge(
    this.actions$.pipe(ofType(bleScan), mapTo(true)),
    this.actions$.pipe(ofType(bleScanSuccess, bleScanFailure), mapTo(false)),
  ).pipe(
    shareReplay(1)
  );

  readonly scanResults$: Observable<ScanResult[]> = this.actions$.pipe(
    ofType(bleScanResults),
    map(({ results }) => results.filter(result => result.device.name === NAME)),
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
