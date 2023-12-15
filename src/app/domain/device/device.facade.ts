import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { deleteDeviceByKey, readAll, writeLedColor, writeTargetTemperature } from './device.actions';
import { map } from 'rxjs/operators';
import { Color } from '~shared/color.model';
import { allDevices, deviceIds, deviceEntities, currentDevice } from './device.selectors';


export const isNotEmpty = <T>(value: T[]): boolean => value.length > 0;

@Injectable()
export class DeviceFacade {
  public readonly ids$ = this.store$.pipe(select(deviceIds))
  public readonly entities$ = this.store$.pipe(select(deviceEntities))
  public readonly all$ = this.store$.pipe(select(allDevices));
  public readonly current$ = this.store$.pipe(select(currentDevice));

  public readonly knownDevices$ = this.all$;

  public readonly connectedDevices$ = this.all$.pipe(
    map(devices => devices.filter(device => !!device.battery))
  );

  public readonly hasConnectedDevice$ = this.connectedDevices$.pipe(
    map(isNotEmpty)
  );

  constructor(private store$: Store<AppState>) {
  }

  deleteByKey(deviceId: string): void {
    this.store$.dispatch(deleteDeviceByKey({ deviceId, correlationId: crypto.randomUUID() }));
  }

  readAll(deviceId: string): void {
    this.store$.dispatch(readAll({ deviceId }));
  }

  writeTargetTemperature(deviceId: string, targetTemperature: number): void {
    this.store$.dispatch(writeTargetTemperature({ deviceId, targetTemperature }));
  }

  writeLedColor(deviceId: string, color: Color): void {
    this.store$.dispatch(writeLedColor({ deviceId, color }));
  }
}
