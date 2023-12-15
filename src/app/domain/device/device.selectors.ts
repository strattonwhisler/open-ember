import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeviceState } from './device.state';
import { Device } from '~domain/device/device.model';

export const mapToDeviceIds = (state: DeviceState) => state.ids;
export const mapToDeviceEntities = (state: DeviceState) => state.entities;
export const mapToAllDevices = (ids: string[], entities: Record<string, Device>) => ids.map(id => entities[id]);
export const mapToCurrentDeviceKey = (state: DeviceState) => state.selections.currentEntityKey;
export const mapToCurrentDevice = (id: string | undefined, entities: Record<string, Device>) => id ? entities[id] : undefined;

export const deviceState = createFeatureSelector('device');

export const deviceIds = createSelector(deviceState, mapToDeviceIds);
export const deviceEntities = createSelector(deviceState, mapToDeviceEntities);
export const allDevices = createSelector(deviceIds, deviceEntities, mapToAllDevices);
export const currentDeviceKey = createSelector(deviceState, mapToCurrentDeviceKey);
export const currentDevice = createSelector(currentDeviceKey, deviceEntities, mapToCurrentDevice);
