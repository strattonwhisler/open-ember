import { ScanResult } from '@capacitor-community/bluetooth-le';
import { createAction, props } from '@ngrx/store';
import { ErrorProps } from '../state.utils';

/* Initialize */

export const bleInitialize = createAction('@open-ember/ble/initialize');
export const bleInitializeSuccess = createAction('@open-ember/ble/initialize/success');
export const bleInitializeFailure = createAction('@open-ember/ble/initialize/failure', props<ErrorProps>());

/* Scan */

export interface BleScanProps {
  duration: number;
}
export const bleScan = createAction('@open-ember/ble/scan', props<BleScanProps>());
export const bleScanSuccess = createAction('@open-ember/ble/scan/success');
export const bleScanFailure = createAction('@open-ember/ble/scan/failure', props<ErrorProps>());

export interface BleScanResultProps {
  results: ScanResult[];
}
export const bleScanResults = createAction('@open-ember/ble/scan/results', props<BleScanResultProps>());
export const bleScanNoResults = createAction('@open-ember/ble/scan/no-results');

/* Connection */

export interface BleConnectProps {
  deviceId: string;
}
export const bleConnect = createAction('@open-ember/ble/connect', props<BleConnectProps>());
export interface BleConnectSuccessProps {
  deviceId: string;
}
export const bleConnectSuccess = createAction('@open-ember/ble/connect/success', props<BleConnectSuccessProps>());
export const bleConnectFailure = createAction('@open-ember/ble/connect/failure', props<ErrorProps>());

export interface BleDisconnectProps {
  deviceId: string;
}
export const bleDisconnect = createAction('@open-ember/ble/disconnect', props<BleDisconnectProps>());
export interface BleDisconnectSuccessProps {
  deviceId: string;
}
export const bleDisconnectSuccess = createAction('@open-ember/ble/disconnect/success', props<BleDisconnectSuccessProps>());
export const bleDisconnectFailure = createAction('@open-ember/ble/disconnect/failure', props<ErrorProps>());

