import { Injectable } from '@angular/core';
import { createErrorToastEffect, createInfoToastEffect } from '~util/effects';
import {
  bleConnectFailure,
  bleDisconnectFailure,
  bleInitializeFailure,
  bleScanFailure,
  bleScanNoResults
} from './ble.actions';


@Injectable()
export class BleUiEffects {
  bleInitializeFailureToast$ = createErrorToastEffect(bleInitializeFailure, {
    message: 'Failed to initialize bluetooth!'
  });

  bleScanNoResultsToast$ = createInfoToastEffect(bleScanNoResults, {
    message: 'No bluetooth devices found.'
  });

  bleScanFailureToast$ = createErrorToastEffect(bleScanFailure, {
    message: 'Failed to scan for bluetooth devices!'
  });

  bleConnectFailureToast$ = createErrorToastEffect(bleConnectFailure, {
    message: 'Failed to connect to the bluetooth device!'
  });

  bleDisconnectFailureToast$ = createErrorToastEffect(bleDisconnectFailure, {
    message: 'Failed to disconnect from the bluetooth device!'
  });

  constructor() {
  }
}
