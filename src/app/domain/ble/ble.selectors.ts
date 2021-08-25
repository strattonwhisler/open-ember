import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ScanResult } from '@capacitor-community/bluetooth-le';
import { BleState } from './ble.state';


export const mapToScanResults = (state: BleState): ScanResult[] => state.scanResults;

export const bleState = createFeatureSelector('ble');

export const scanResults = createSelector(bleState, mapToScanResults);
