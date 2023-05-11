import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction } from '@angular/core';
import { ScanResult } from '@capacitor-community/bluetooth-le';
import { BleFacade } from '~domain/ble/ble.facade';
import { PushPipe } from '@rx-angular/template/push';
import { JsonPipe } from '@angular/common';
import { ScanResultComponent } from './scan-result.component';
import { RxFor } from '@rx-angular/template/for';
import { RxIf } from '@rx-angular/template/if';
import { IonicModule } from '@ionic/angular';


export const trackByScanResultDeviceId: TrackByFunction<ScanResult> = (index: number, result: ScanResult) =>
  result.device.deviceId;

@Component({
  selector: 'oe-pairing',
  templateUrl: 'pairing.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonicModule, RxIf, RxFor, ScanResultComponent, JsonPipe, PushPipe]
})
export class PairingPage implements OnInit {
  protected readonly trackByResultDeviceId = trackByScanResultDeviceId;

  constructor(protected readonly ble: BleFacade) {
  }

  ngOnInit(): void {
    this.ble.initialize();
  }
}
