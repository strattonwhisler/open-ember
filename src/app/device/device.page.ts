import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceFacade } from '~domain/device/device.facade';
import { Color } from '~shared/color.model';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Temperature } from '~shared/temperature.consts';


@Component({
  selector: 'oe-devices',
  templateUrl: 'device.page.html',
  styles: [
    'ion-range { padding-top: 8px; }'
  ]
})
export class DevicePage implements OnInit, OnDestroy {
  private destroy$$: Subject<void> =  new Subject();

  readonly Temperature = Temperature;

  readonly deviceForm = new UntypedFormGroup({
    targetTemperature: new UntypedFormControl(50),
    color: new UntypedFormGroup({
      r: new UntypedFormControl(0),
      g: new UntypedFormControl(0),
      b: new UntypedFormControl(0)
    })
  });

  readonly targetTemperatureControl = this.deviceForm.get('targetTemperature');
  readonly colorControl = this.deviceForm.get('color');

  constructor(public device: DeviceFacade, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$$)
    ).subscribe(({ id }) => {
      this.device.selectByKey(id);
      this.device.readAll(id);
    });

    this.device.current$.pipe(
      takeUntil(this.destroy$$)
    ).subscribe(device => {
      this.deviceForm.patchValue(device, { emitEvent: false });
    });

    this.targetTemperatureControl.valueChanges.pipe(
      debounceTime(1500),
      withLatestFrom(this.device.current$),
      takeUntil(this.destroy$$)
    ).subscribe(([targetTemperature, { deviceId }]) => {
      this.device.writeTargetTemperature(deviceId, targetTemperature);
    });

    this.colorControl.valueChanges.pipe(
      debounceTime(1500),
      withLatestFrom(this.device.current$),
      takeUntil(this.destroy$$)
    ).subscribe(([color, { deviceId }]) => {
      this.device.writeLedColor(deviceId, { ...color, a: 255 });
    });
  }

  ngOnDestroy() {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  get selectedColor(): Color {
    return { ...this.colorControl.value, a: 255 };
  }
}
