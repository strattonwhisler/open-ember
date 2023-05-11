import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ScanResult } from '@capacitor-community/bluetooth-le';
import { BleState } from './ble.state';


export const mapToScanResults = (state: BleState): ScanResult[] => state.scanResults;

export const mapToIsScanning = (state: BleState): boolean => state.isScanning;
export const mapToIsConnecting = (state: BleState): boolean => state.isConnecting;

export const bleState = createFeatureSelector('ble');

export const scanResults = createSelector(bleState, mapToScanResults);

export const isScanning = createSelector(bleState, mapToIsScanning);
export const isConnecting = createSelector(bleState, mapToIsConnecting);
