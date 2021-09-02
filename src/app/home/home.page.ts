import { Component } from '@angular/core';
import { asRgbaString } from '~shared/color.model';
import { DeviceFacade } from '~domain/device/device.facade';
import { BleFacade } from '~domain/ble/ble.facade';
import { DevicePowerState } from '~shared/device-power-state';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage {
  readonly DevicePowerState = DevicePowerState;
  readonly asRgbaString = asRgbaString;

  constructor(
    public device: DeviceFacade,
    public ble: BleFacade,
    public router: Router
  ) {}
}
