import { Pipe, PipeTransform } from '@angular/core';
import { BleFacade } from '~domain/ble/ble.facade';
import { DeviceFacade } from '~domain/device/device.facade';
import { ScanResult } from '@capacitor-community/bluetooth-le';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PairStatus } from './pair-status.enum';


@Pipe({
    name: 'pairStatus'
})
export class PairStatusPipe implements PipeTransform {
    constructor(private ble: BleFacade, private device: DeviceFacade) {
    }

    transform(result: ScanResult): Observable<PairStatus> {
        return combineLatest([
            this.ble.connecting$,
            this.device.entities$
        ]).pipe(
            map(([connecting, devices]) =>
                connecting
                    ? PairStatus.Pairing
                    : !!devices[result.device.deviceId]
                        ? PairStatus.Paired
                        : PairStatus.Pair
            )
        );
    }
}
