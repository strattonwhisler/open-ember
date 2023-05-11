import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RxFor } from '@rx-angular/template/for';
import { RxIf } from '@rx-angular/template/if';
import { BleFacade } from '~domain/ble/ble.facade';
import { DeviceFacade } from '~domain/device/device.facade';
import { DevicePreviewComponent } from './device-preview.component';


@Component({
  selector: 'oe-home',
  templateUrl: 'home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonicModule, RouterLink, RxIf, RxFor, DevicePreviewComponent]
})
export class HomePage {
  constructor(
    protected readonly device: DeviceFacade,
    protected readonly ble: BleFacade
  ) {
  }
}
