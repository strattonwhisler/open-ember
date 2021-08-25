// import { Injectable } from '@angular/core';
// import {
//   BleClient,
//   BleDevice,
//   DisplayStrings,
//   RequestBleDeviceOptions,
//   ScanResult
// } from '@capacitor-community/bluetooth-le';
// import { from, Observable, ReplaySubject, Subject, throwError } from 'rxjs';
// import { Capacitor } from '@capacitor/core';
// import { tap } from 'rxjs/operators';
//
//
// @Injectable({ providedIn: 'root' })
// export class BleService {
//   private _initialized$: ReplaySubject<void> = new ReplaySubject(1);
//   readonly initalized$$: Observable<void> = this._initialized$.asObservable();
//
//   private _scanResults$: Subject<ScanResult> = new Subject();
//   readonly scanResults$: Observable<ScanResult> = this._scanResults$.asObservable();
//
//   initialize(): Observable<void> {
//     return from(BleClient.initialize()).pipe(
//       tap(() => this._initialized$.next())
//     );
//   }
//
//   isEnabled(): Observable<boolean> {
//     return from(BleClient.isEnabled());
//   }
//
//   // startEnabledNotifications
//
//   // stopEnabledNotifications
//
//   setDisplayStrings(displayStrings: DisplayStrings): Observable<void> {
//     return from(BleClient.setDisplayStrings(displayStrings));
//   }
//
//   requestDevice(options?: RequestBleDeviceOptions): Observable<BleDevice> {
//     return from(BleClient.requestDevice(options));
//   }
//
//   requestLEScan(options: RequestBleDeviceOptions): Observable<void> {
//     return from(BleClient.requestLEScan(options, result => this._scanResults$.next(result)));
//   }
//
//   stopLEScan(): Observable<void> {
//     return from(BleClient.stopLEScan());
//   }
//
//   connect(deviceId: string): Observable<void> {
//     return from(BleClient.connect(deviceId, /* TODO onDisconnect */));
//   }
//
//   isBonded(deviceId: string): Observable<boolean> {
//     if(Capacitor.getPlatform() === 'android') {
//       return from(BleClient.isBonded(deviceId));
//     } else {
//       return throwError(new Error('BleService.isBonded is only available on Android'));
//     }
//   }
//
//   disconnect(deviceId: string): Observable<void> {
//     return from(BleClient.disconnect(deviceId));
//   }
//
//   read(deviceId: string, service: string, characteristic: string): Observable<DataView> {
//     return from(BleClient.read(deviceId, service, characteristic));
//   }
//
//   write(deviceId: string, service, characteristic: string, value: DataView): Observable<void> {
//     return from(BleClient.write(deviceId, service, characteristic, value));
//   }
//
//   writeWithoutResponse(deviceId: string, service, characteristic: string, value: DataView): Observable<void> {
//     return from(BleClient.writeWithoutResponse(deviceId, service, characteristic, value));
//   }
//
//   // startNotifications
//
//   // stopNotifications
// }
