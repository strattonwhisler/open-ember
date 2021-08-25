import { Component } from '@angular/core';
import { DeviceFacade } from '../domain/device/device.facade';
import { DevicePowerState } from '../domain/device/device-state';
import { BleFacade } from '../domain/ble/ble.facade';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { UUID } from '../domain/ble/ember-ble.consts';
import { AppState } from '../domain/app-state';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-devices',
  templateUrl: 'devices.page.html'
})
export class DevicesPage {
  readonly DevicePowerState = DevicePowerState;

  constructor(public device: DeviceFacade, public ble: BleFacade, private store$: Store<AppState>) {}

  async getTemp(deviceId: string): Promise<number> {
    const dataView = await BleClient.read(deviceId, UUID.CURRENT_TEMP, UUID.CURRENT_TEMP);

    return dataView.getFloat32(0, true) * 0.01;
  }
}
