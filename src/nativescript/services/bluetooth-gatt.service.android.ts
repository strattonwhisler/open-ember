// import { BluetoothGatt } from './bluetooth-gatt.service';
// import List = java.util.List;
// import BluetoothAdapter = android.bluetooth.BluetoothAdapter;
// import ScanCallback = android.bluetooth.le.ScanCallback;
// import ScanResult = android.bluetooth.le.ScanResult;
// import ScanSettings = android.bluetooth.le.ScanSettings;
//
//
// class BleScanCallback extends ScanCallback {
//   constructor(private callback: { onBatchScanResults, onScanFailed, onScanResult }) {
//     super();
//   }
//
//   onBatchScanResults(results: List<ScanResult>): void {
//     this.callback.onBatchScanResults(results);
//   }
//
//   onScanFailed(errorCode: number): void {
//     this.callback.onScanFailed(errorCode);
//   }
//
//   onScanResult(callbackType: number, result: ScanResult): void {
//     this.callback.onScanResult(callbackType, result);
//   }
// }
//
// export class AndroidBluetoothGatt extends BluetoothGatt {
//   private readonly scanCallback: ScanCallback;
//
//   constructor() {
//     super();
//
//     this.scanCallback = new BleScanCallback();
//   }
//
//   async scan(): Promise<unknown> {
//     const scanner = BluetoothAdapter.getDefaultAdapter().getBluetoothLeScanner();
//
//     scanner.startScan(this.scanCallback);
//
//     return null;
//   }
//
//   onBatchScanResults(results: List<ScanResult>): void {
//   }
//
//   onScanFailed(errorCode: number): void {
//     switch(errorCode) {
//       case ScanCallback.SCAN_FAILED_ALREADY_STARTED:
//         break;
//       case ScanCallback.SCAN_FAILED_APPLICATION_REGISTRATION_FAILED:
//         break;
//       case ScanCallback.SCAN_FAILED_FEATURE_UNSUPPORTED:
//         break;
//       case ScanCallback.SCAN_FAILED_INTERNAL_ERROR:
//         break;
//       default:
//         break;
//     }
//   }
//
//   onScanResult(callbackType: number, result: ScanResult): void {
//     switch(callbackType) {
//       case ScanSettings.CALLBACK_TYPE_ALL_MATCHES:
//         const device = result.getDevice();
//         device.getName()
//         break;
//       case ScanSettings.CALLBACK_TYPE_FIRST_MATCH:
//         break;
//       case ScanSettings.CALLBACK_TYPE_MATCH_LOST:
//         break;
//       default:
//         break;
//     }
//   }
// }
//
