import { Injectable } from '@angular/core';
import { DeviceFacadeBase } from './device.state';
import { Device } from './device.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';


@Injectable()
export class DeviceFacade extends DeviceFacadeBase {
  constructor(private store$: Store<AppState>) {
    super(Device, store$);
  }
}
