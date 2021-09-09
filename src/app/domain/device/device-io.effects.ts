import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { bleConnectSuccess } from '../ble/ble.actions';
import { catchError, concatMap, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { loadDeviceSuccess } from './device.state';
import { Store } from '@ngrx/store';
import { scanResults } from '../ble/ble.selectors';
import {
  readAll,
  readBattery,
  readBatteryFailure,
  readBatterySuccess,
  readCurrentTemperature,
  readCurrentTemperatureFailure,
  readCurrentTemperatureSuccess,
  readLedColor,
  readLedColorFailure,
  readLedColorSuccess,
  readTargetTemperature,
  readTargetTemperatureFailure,
  readTargetTemperatureSuccess,
  writeLedColor,
  writeLedColorFailure,
  writeLedColorSuccess,
  writeTargetTemperature, writeTargetTemperatureFailure,
  writeTargetTemperatureSuccess
} from '~domain/device/device.actions';
import { DeviceService } from '~domain/device/device.service';
import { from, of } from 'rxjs';


@Injectable()
export class DeviceIoEffects {
  readAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(readAll),
      concatMap(({ deviceId }) => [
        readCurrentTemperature({ deviceId }),
        readTargetTemperature({ deviceId }),
        readBattery({ deviceId }),
        readLedColor({ deviceId })
      ])
    )
  );

  readCurrentTemperature$ = createEffect(() =>
    this.actions$.pipe(
      ofType(readCurrentTemperature),
      switchMap(({ deviceId }) => from(this.deviceService.readCurrentTemperature(deviceId)).pipe(
        map(currentTemperature => readCurrentTemperatureSuccess({ deviceId, currentTemperature })),
        catchError(error => of(readCurrentTemperatureFailure({ error })))
      ))
    )
  );

  readTargetTemperature$ = createEffect(() =>
    this.actions$.pipe(
      ofType(readTargetTemperature),
      switchMap(({ deviceId }) => from(this.deviceService.readTargetTemperature(deviceId)).pipe(
        map(targetTemperature => readTargetTemperatureSuccess({ deviceId, targetTemperature })),
        catchError(error => of(readTargetTemperatureFailure({ error })))
      ))
    )
  );

  writeTargetTemperature$ = createEffect(() =>
    this.actions$.pipe(
      ofType(writeTargetTemperature),
      switchMap(({ deviceId, targetTemperature }) => from(this.deviceService.writeTargetTemperature(deviceId, targetTemperature)).pipe(
        map(() => writeTargetTemperatureSuccess({ deviceId, targetTemperature })),
        catchError(error => of(writeTargetTemperatureFailure({ error })))
      ))
    )
  );

  readBattery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(readBattery),
      switchMap(({ deviceId }) => from(this.deviceService.readBattery(deviceId)).pipe(
        map(battery => readBatterySuccess({ deviceId, battery })),
        catchError(error => of(readBatteryFailure({ error })))
      ))
    )
  );

  readLedColor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(readLedColor),
      switchMap(({ deviceId }) => from(this.deviceService.readLedColor(deviceId)).pipe(
        map(color => readLedColorSuccess({ deviceId, color })),
        catchError(error => of(readLedColorFailure({ error })))
      ))
    )
  );

  writeLedColor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(writeLedColor),
      switchMap(({ deviceId, color }) => from(this.deviceService.writeLedColor(deviceId, color)).pipe(
        map(() => writeLedColorSuccess({ deviceId, color })),
        catchError(error => of(writeLedColorFailure({ error })))
      ))
    )
  );

  constructor(private actions$: Actions, private store$: Store, private deviceService: DeviceService) {}
}
