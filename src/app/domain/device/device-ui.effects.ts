import { Injectable } from '@angular/core';
import {
  readBatteryFailure,
  readCurrentTemperatureFailure,
  readLedColorFailure,
  readTargetTemperatureFailure,
  writeLedColorFailure,
  writeTargetTemperatureFailure
} from '~domain/device/device.actions';
import { createErrorToastEffect } from '~util/effects';


@Injectable()
export class DeviceUiEffects {
  readCurrentTemperatureFailureToast$ = createErrorToastEffect(readCurrentTemperatureFailure, {
    message: 'Failed to load the current temperature!'
  });

  readTargetTemperatureFailureToast$ = createErrorToastEffect(readTargetTemperatureFailure, {
    message: 'Failed to load the desired temperature!'
  });

  writeTargetTemperatureFailureToast$ = createErrorToastEffect(writeTargetTemperatureFailure, {
    message: 'Failed to save the desired temperature!'
  });

  readBatteryFailureToast$ = createErrorToastEffect(readBatteryFailure, {
    message: 'Failed to load the battery level!'
  });

  readLedColorFailureToast$ = createErrorToastEffect(readLedColorFailure, {
    message: 'Failed to load the LED color!'
  });

  writeLedColorFailureToast$ = createErrorToastEffect(writeLedColorFailure, {
    message: 'Failed to save the LED color!'
  });

  constructor() {
  }
}
