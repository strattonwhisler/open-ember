import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ScanResult } from '@capacitor-community/bluetooth-le';
import { BleState } from './ble.state';


export const mapToScanResults = (state: BleState): ScanResult[] => state.scanResults;

export const mapToScanning = (state: BleState): boolean => state.scanning;
export const mapToConnecting = (state: BleState): boolean => state.connecting;

export const bleState = createFeatureSelector('ble');

export const scanResults = createSelector(bleState, mapToScanResults);

export const scanning = createSelector(bleState, mapToScanning);
export const connecting = createSelector(bleState, mapToConnecting);
