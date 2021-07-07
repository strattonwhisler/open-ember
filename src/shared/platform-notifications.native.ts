// import { PlatformNotification } from './platform-notification';
// import { Subject } from 'rxjs';
//
//
// export const platformNotifications$: Subject<PlatformNotification> = new Subject();
//
// export function pollPlatformNotifications(): Array<PlatformNotification> {
//
// }
//
// native.pollPlatformNotifications = pollPlatformNotifications;
//
// export function sendPlatformNotification(notification: PlatformNotification): void {
//   const sendResponse: (msg: any) => void = (native as any).NativeInterface.instance.sendResponse;
//
//   sendResponse()
// }
