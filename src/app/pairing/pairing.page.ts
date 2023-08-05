import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction } from '@angular/core';
import { ScanResult } from '@capacitor-community/bluetooth-le';
import { BleFacade } from '~domain/ble/ble.facade';
import { RxPush } from '@rx-angular/template/push';
import { JsonPipe, NgSwitchCase } from '@angular/common';
import { ScanResultComponent } from './scan-result.component';
import { RxFor } from '@rx-angular/template/for';
import { RxIf } from '@rx-angular/template/if';
import { IonicModule } from '@ionic/angular';
import { Device, DeviceFacade } from "~domain/device";
import { PairStatus } from "./pair-status.enum";
import { PairStatusPipe } from "./pair-status.pipe";
import { RxLet } from "@rx-angular/template/let";
import { RouterLink } from "@angular/router";


export const trackByScanResultDeviceId: TrackByFunction<ScanResult> = (index: number, result: ScanResult) =>
  result.device.deviceId;

export const trackByDeviceId: TrackByFunction<Device> = (index: number, device: Device) => device.deviceId;

@Component({
  selector: 'oe-pairing',
  templateUrl: 'pairing.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonicModule, RxIf, RxFor, ScanResultComponent, JsonPipe, RxPush, NgSwitchCase, PairStatusPipe, RxLet, RouterLink]
})
export class PairingPage implements OnInit {
  protected readonly trackByResultDeviceId = trackByScanResultDeviceId;
  protected readonly trackByDeviceId = trackByDeviceId;

  constructor(
    protected readonly ble: BleFacade,
    protected readonly device: DeviceFacade
  ) {
  }

  ngOnInit(): void {
    this.ble.initialize();
  }

  protected readonly PairStatus = PairStatus;
}
