import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { BleFacade } from '~domain/ble/ble.facade';
import { DeviceFacade } from '~domain/device/device.facade';
import { ScanResult } from '@capacitor-community/bluetooth-le';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PairStatus } from './pair-status.enum';
import { IEntityDictionary } from '@briebug/ngrx-auto-entity';
import { Device } from '~domain/device';


export const mapToPairStatus = (deviceId: string) => (
  connecting: boolean,
  devices: IEntityDictionary<Device>
): PairStatus =>
  connecting
    ? PairStatus.Pairing
    : !!devices[deviceId]
      ? PairStatus.Paired
      : PairStatus.Pair;

@Pipe({
    name: 'pairStatus',
    standalone: true
})
export class PairStatusPipe implements PipeTransform {
  constructor(private readonly ble: BleFacade, private readonly device: DeviceFacade) {
  }

  transform(result: ScanResult): Observable<PairStatus> {
    return combineLatest([
      this.ble.isConnecting$,
      this.device.entities$
    ]).pipe(
      map(([connecting, devices]) =>
        mapToPairStatus(result.device.deviceId)(connecting, devices)
      )
    );
  }
}
