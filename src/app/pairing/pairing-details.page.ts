import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BleFacade } from '~domain/ble/ble.facade';
import { RxPush } from '@rx-angular/template/push';
import { RxFor } from '@rx-angular/template/for';
import { RxIf } from '@rx-angular/template/if';
import { IonicModule } from '@ionic/angular';
import { DeviceFacade } from "~domain/device";
import { RxLet } from "@rx-angular/template/let";


@Component({
  selector: 'oe-pairing-details',
  templateUrl: 'pairing-details.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonicModule, RxIf, RxFor, RxPush, RxLet]
})
export class PairingDetailsPage {
  constructor(
    protected readonly ble: BleFacade,
    protected readonly device: DeviceFacade
  ) {
  }
}
