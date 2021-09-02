import { Injectable } from '@angular/core';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { UUID } from '~domain/ble/ember-ble.consts';
import { Color } from '~shared/color.model';


const TEMPERATURE_SCALE_FACTOR = 100;

@Injectable()
// export class DeviceService implements IAutoEntityService<Device> {
export class DeviceService {
  async readCurrentTemperature(deviceId: string): Promise<number> {
    const dataView = await BleClient.read(deviceId, UUID.EMBER_SERVICE, UUID.CURRENT_TEMP);
    return dataView.getUint16(0, true) / TEMPERATURE_SCALE_FACTOR;
  }

  async readTargetTemperature(deviceId: string): Promise<number> {
    const dataView = await BleClient.read(deviceId, UUID.EMBER_SERVICE, UUID.TARGET_TEMP);
    return dataView.getUint16(0, true) / TEMPERATURE_SCALE_FACTOR;
  }

  async writeTargetTemperature(deviceId: string, temperature: number): Promise<void> {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint16(0, temperature * TEMPERATURE_SCALE_FACTOR, true);
    await BleClient.write(deviceId, UUID.EMBER_SERVICE, UUID.TARGET_TEMP, dataView);
  }

  async readBattery(deviceId: string): Promise<number> {
    const dataView = await BleClient.read(deviceId, UUID.EMBER_SERVICE, UUID.CURRENT_BAT);
    //TODO: Not sure what data format the battery uses
    return dataView.getFloat32(0, true);
  }

  async readLedColor(deviceId: string): Promise<Color> {
    const dataView = await BleClient.read(deviceId, UUID.EMBER_SERVICE, UUID.LED_COLOR);
    return {
      r: dataView.getUint8(0),
      g: dataView.getUint8(1),
      b: dataView.getUint8(2),
      a: dataView.getUint8(3),
    };
  }

  async writeLedColor(deviceId: string, color: Color): Promise<void> {
    const dataView = new DataView(new ArrayBuffer(4));
    dataView.setUint8(0, color.r);
    dataView.setUint8(1, color.g);
    dataView.setUint8(2, color.b);
    dataView.setUint8(3, color.a);
    await BleClient.write(deviceId, UUID.EMBER_SERVICE, UUID.LED_COLOR, dataView);
  };
}
