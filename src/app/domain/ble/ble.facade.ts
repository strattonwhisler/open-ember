import { Injectable } from '@angular/core';
import { ScanResult } from '@capacitor-community/bluetooth-le';
import { AppState } from '@capacitor/app';
import { Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { bleConnect, bleDisconnect, bleInitialize, bleScan } from './ble.actions';
import { isConnecting, isScanning, scanResults } from './ble.selectors';
import * as EmberBle from './ember-ble.consts';


@Injectable()
export class BleFacade {
  readonly scanResults$: Observable<ScanResult[]> = this.store$.pipe(
    select(scanResults),
    // map(results => results.filter(result => result.device.name === EmberBle.NAME)),
    shareReplay(1)
  );

  readonly isScanning$: Observable<boolean> = this.store$.pipe(select(isScanning));
  readonly isConnecting$: Observable<boolean> = this.store$.pipe(select(isConnecting));

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
