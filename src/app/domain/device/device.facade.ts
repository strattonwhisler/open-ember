import { Injectable } from '@angular/core';
import { DeviceFacadeBase } from './device.state';
import { Device } from './device.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { Reads } from '~domain/device/reads';


@Injectable()
export class DeviceFacade extends DeviceFacadeBase {
  private reads: Map<string, Reads> = new Map();

  constructor(private store$: Store<AppState>) {
    super(Device, store$);
  }

  getReads(deviceId: string): Reads {
    if (!this.reads.has(deviceId)) {
      this.reads.set(deviceId, new Reads(deviceId));
    }
    return this.reads.get(deviceId);
  }
}
