import { Action, createReducer, on } from '@ngrx/store';
import {
  bleConnect, bleConnectFailure, bleConnectSuccess,
  bleScan,
  bleScanFailure,
  bleScanNoResults,
  BleScanResultProps,
  bleScanResults,
  bleScanSuccess
} from './ble.actions';
import { ScanResult } from '@capacitor-community/bluetooth-le';

export interface BleState {
  scanResults: ScanResult[];
  scanning: boolean;
  connecting: boolean;
}

export const initialBleState: BleState = {
  scanResults: [],
  scanning: false,
  connecting: false
};

export const reduceScanResults = (state: BleState, { results }: BleScanResultProps): BleState => ({
  ...state,
  scanResults: results
});

export const reduceScanNoResults = (state: BleState, /* unused */): BleState => ({
  ...state,
  scanResults: []
});

export const reduceScanStart = (state: BleState, /* unused */): BleState => ({
  ...state,
  scanning: true
});

export const reduceScanStop = (state: BleState, /* unused */): BleState => ({
  ...state,
  scanning: false
});

export const reduceConnectStart = (state: BleState, /* unused */): BleState => ({
  ...state,
  connecting: true
});

export const reduceConnectStop = (state: BleState, /* unused */): BleState => ({
  ...state,
  connecting: false
});

const reducer = createReducer(
  initialBleState,
  on(bleScanResults, reduceScanResults),
  on(bleScanNoResults, reduceScanNoResults),
  on(bleScan, reduceScanStart),
  on(bleScanSuccess, bleScanFailure, reduceScanStop),
  on(bleConnect, reduceConnectStart),
  on(bleConnectSuccess, bleConnectFailure, reduceConnectStop),
);

export function bleReducer(state: BleState, action: Action): BleState {
  return reducer(state, action);
}
