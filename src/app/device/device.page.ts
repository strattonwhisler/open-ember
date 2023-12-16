import { ChangeDetectionStrategy, Component, effect, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RxEffects } from '@rx-angular/state/effects';
import { RxIf } from '@rx-angular/template/if';
import { debounceTime, withLatestFrom } from 'rxjs/operators';
import { DeviceFacade } from '~domain/device/device.facade';
import { BatteryComponent } from '~shared/battery.component';
import { ColorComponent } from '~shared/color.component';
import { Color } from '~shared/color.model';
import { TemperatureComponent } from '~shared/temperature.component';
import { Temperature } from '~shared/temperature.consts';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'oe-devices',
  templateUrl: 'device.page.html',
  styles: [
    'ion-range { padding-top: 8px; }'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    BatteryComponent,
    ColorComponent,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RxIf,
    TemperatureComponent
  ],
  providers: [RxEffects]
})
export class DevicePage implements OnInit {
  protected readonly Temperature = Temperature;

  protected readonly deviceForm = new FormGroup({
    targetTemperature: new FormControl<number>(50),
    color: new FormGroup({
      r: new FormControl<number>(0),
      g: new FormControl<number>(0),
      b: new FormControl<number>(0)
    })
  });

  private readonly targetTemperatureControl = this.deviceForm.get('targetTemperature');
  private readonly colorControl = this.deviceForm.get('color');

  constructor(
    protected readonly device: DeviceFacade,
    private readonly activatedRoute: ActivatedRoute,
    private readonly effects: RxEffects
  ) {
    // const currentDevice = toSignal(this.device.current$);
    //
    // const targetTemperature = toSignal(this.targetTemperatureControl.valueChanges.pipe(
    //   debounceTime(1500)
    // ), {
    //   initialValue: this.targetTemperatureControl.value
    // });
    //
    // effect(() => {
    //   this.device.writeTargetTemperature(currentDevice().deviceId, targetTemperature());
    // });
    //
    // const color = toSignal(this.colorControl.valueChanges.pipe(
    //   debounceTime(1500)
    // ), {
    //   initialValue: this.colorControl.value
    // });
    //
    // effect(() => {
    //   this.device.writeLedColor(currentDevice().deviceId, { ...color(), a: 255 });
    // });
  }

  ngOnInit(): void {
    this.effects.register(
      this.device.current$.pipe(
      ).subscribe(device => {
        this.deviceForm.patchValue(device, { emitEvent: false });
      })
    );

    this.effects.register(
      this.targetTemperatureControl.valueChanges.pipe(
        debounceTime(1500),
        withLatestFrom(this.device.current$)
      ).subscribe(([targetTemperature, { deviceId }]) => {
        this.device.writeTargetTemperature(deviceId, targetTemperature);
      })
    );

    this.effects.register(
      this.colorControl.valueChanges.pipe(
        debounceTime(1500),
        withLatestFrom(this.device.current$)
      ).subscribe(([color, { deviceId }]) => {
        this.device.writeLedColor(deviceId, { ...color, a: 255 });
      })
    );
  }

  get selectedColor(): Color {
    return { ...this.colorControl.value, a: 255 };
  }
}
