import { Action, createReducer, on } from '@ngrx/store';
import { bleScanNoResults, BleScanResultProps, bleScanResults } from './ble.actions';
import { ScanResult } from '@capacitor-community/bluetooth-le';

export interface BleState {
  scanResults: ScanResult[];
}

export const initialBleState: BleState = {
  scanResults: []
};

const reduceScanResults = (state: BleState, { results }: BleScanResultProps): BleState => ({
  ...state,
  scanResults: results
});

const reduceScanNoResults = (state, /* unused */): BleState => ({
  ...state,
  scanResults: []
});

const reducer = createReducer(
  initialBleState,
  on(bleScanResults, reduceScanResults),
  on(bleScanNoResults, reduceScanNoResults),
);

export function bleReducer(state: BleState, action: Action): BleState {
  return reducer(state, action);
}
