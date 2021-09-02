import { Injectable } from '@angular/core';
import { AppState } from '@capacitor/app';
import { select, Store } from '@ngrx/store';
import { bleConnect, bleDisconnect, bleInitialize, bleScan } from './ble.actions';
import { Observable } from 'rxjs';
import { ScanResult } from '@capacitor-community/bluetooth-le';
import { Actions } from '@ngrx/effects';
import { map, shareReplay } from 'rxjs/operators';
import * as EmberBle from './ember-ble.consts';
import { connecting, scanning, scanResults } from './ble.selectors';


@Injectable()
export class BleFacade {
  readonly scanResults$: Observable<ScanResult[]> = this.store$.pipe(
    select(scanResults),
    map(results => results.filter(result => result.device.name === EmberBle.NAME)),
    shareReplay(1)
  );

  readonly scanning$: Observable<boolean> = this.store$.pipe(select(scanning));
  readonly connecting$: Observable<boolean> = this.store$.pipe(select(connecting));

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
