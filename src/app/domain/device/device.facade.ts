import { Injectable } from '@angular/core';
import { DeviceFacadeBase } from './device.state';
import { Device } from './device.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { readAll, writeLedColor, writeTargetTemperature } from './device.actions';
import { pluck } from 'rxjs/operators';
import { Color } from '~shared/color.model';


@Injectable()
export class DeviceFacade extends DeviceFacadeBase {
  constructor(private store$: Store<AppState>) {
    super(Device, store$);
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
