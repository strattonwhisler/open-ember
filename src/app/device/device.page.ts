import { Component, OnInit } from '@angular/core';
import { DeviceFacade } from '~domain/device/device.facade';
import { DevicePowerState } from '~shared/device-power-state';
import { asRgbaString } from '~shared/color.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-devices',
  templateUrl: 'device.page.html'
})
export class DevicePage implements OnInit {
  readonly DevicePowerState = DevicePowerState;
  readonly asRgbaString = asRgbaString;

  constructor(public device: DeviceFacade, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.device.selectByKey(id)
    );
  }
}
