import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { skip, tap, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { ionicStorageAdapter, localStorageAdapter, PersistentBehaviorSubject } from '~util/persistent-behavior-subject';
import { loadPersistedDevices } from './device.actions';
import { Device } from './device.model';
import { allDevices, loadAllDevicesSuccess, makeDeviceEntity } from './device.state';


const STORAGE_DEVICES_KEY = 'devices';

@Injectable()
export class DevicePersistenceEffects {
  storedDevices$ = new PersistentBehaviorSubject<Device[]>(
    [],
    // ionicStorageAdapter(this.storage, STORAGE_DEVICES_KEY),
    localStorageAdapter(STORAGE_DEVICES_KEY),
    {
      writeOnMissing: false
    }
  );

  loadPersistedDevices$ = createEffect(() =>
    zip([
      this.storedDevices$,
      this.actions$.pipe(ofType(loadPersistedDevices))
    ]).pipe(
      map(streams => streams[0]),
      map(devices => devices.map(makeDeviceEntity)),
      map(entities => loadAllDevicesSuccess({ entities }))
    )
  );

  storePersistedDevices$ = createEffect(() =>
    this.store$.select(allDevices).pipe(
      skip(1),
      tap(devices => this.storedDevices$.next(devices))
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private store$: Store, private storage: Storage, private zone: NgZone) {
    //TODO: Handle promise
    this.initStorage();
  }

  private async initStorage(): Promise<void> {
    await this.storage.create();

    this.zone.run(() => {
      this.store$.dispatch(loadPersistedDevices());
    });
  }
}
