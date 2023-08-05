import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ScanResult } from '@capacitor-community/bluetooth-le';
import { PairStatus } from './pair-status.enum';
import { RxLet } from '@rx-angular/template/let';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PairStatusPipe } from './pair-status.pipe';


@Component({
  selector: 'oe-scan-result',
  template: `
    <ion-item button (click)="connect.emit(scanResult.device.deviceId)">
      <ion-label>
        {{ scanResult.localName || scanResult.device.name }}
      </ion-label>
      <ng-container
        *rxLet="scanResult | pairStatus; let pairStatus"
        [ngSwitch]="pairStatus"
      >
        <ion-icon *ngSwitchCase="PairStatus.Pair" slot="end" name="unlink-outline"></ion-icon>
        <ion-icon *ngSwitchCase="PairStatus.Paired" slot="end" name="link-outline"></ion-icon>
        <ion-spinner *ngSwitchCase="PairStatus.Pairing" slot="end"></ion-spinner>
      </ng-container>
    </ion-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonicModule,
    RxLet,
    NgSwitch,
    NgSwitchCase,
    PairStatusPipe
  ]
})
export class ScanResultComponent {
  protected readonly PairStatus = PairStatus;

  @Input() scanResult: ScanResult;

  @Output() connect: EventEmitter<string> = new EventEmitter();
}
