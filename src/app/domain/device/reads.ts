import { from, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Color } from '~shared/color.model';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { UUID } from '~domain/ble/ember-ble.consts';


export class Reads {
    readonly currentTemp$: Observable<number> = from(this.getCurrentTemp()).pipe(shareReplay(1));
    readonly targetTemp$: Observable<number> = from(this.getTargetTemp()).pipe(shareReplay(1));
    readonly currentBattery$: Observable<number> = from(this.getCurrentBattery()).pipe(shareReplay(1));
    readonly ledColor$: Observable<Color> = from(this.getLedColor()).pipe(shareReplay(1));

    constructor(private deviceId: string) {
    }

    private async getCurrentTemp(): Promise<number> {
        const dataView = await BleClient.read(this.deviceId, UUID.EMBER_SERVICE, UUID.CURRENT_TEMP);
        // return dataView.getFloat32(0, true) * 0.01;
        return dataView.getUint16(0, true) * 0.01;
    }

    private async getTargetTemp(): Promise<number> {
        const dataView = await BleClient.read(this.deviceId, UUID.EMBER_SERVICE, UUID.TARGET_TEMP);
        // return dataView.getFloat32(0, true) * 0.01;
        return dataView.getUint16(0, true) * 0.01;
    }

    private async getCurrentBattery(): Promise<number> {
        const dataView = await BleClient.read(this.deviceId, UUID.EMBER_SERVICE, UUID.CURRENT_BAT);
        return dataView.getFloat32(0, true);
    }

    private async getLedColor(): Promise<Color> {
        const dataView = await BleClient.read(this.deviceId, UUID.EMBER_SERVICE, UUID.LED_COLOR);
        return {
            r: dataView.getUint8(0),
            g: dataView.getUint8(1),
            b: dataView.getUint8(2),
            a: dataView.getUint8(3),
        };
    }
}
