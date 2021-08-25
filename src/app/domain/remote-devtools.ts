// import { ReduxDevtoolsExtension, ReduxDevtoolsExtensionConnection } from '@ngrx/store-devtools/src/extension';
// import { connect } from 'remotedev';
//
// export class RemoteDevToolsProxyConnection implements ReduxDevtoolsExtensionConnection {
//   constructor(private remotedev: any) {}
//
//   subscribe(listener: (change: any) => void): any {
//     const listenerWrapper = (change: any) => {
//       listener(change);
//     };
//
//     this.remotedev.subscribe(listenerWrapper);
//     setTimeout(() => listenerWrapper({ type: 'START' }));
//   }
//
//   unsubscribe(): any {
//     return () => this.remotedev.unsubscribe();
//   }
//
//   send(action: any, state: any): any {
//     this.remotedev.send(action, state);
//   }
//
//   error(anyErr: any): void {
//     this.remotedev.error(anyErr);
//   }
//
//   init(state?: any): void {
//     this.remotedev.init(state);
//   }
// }
//
// export class RemoteDevToolsProxy implements ReduxDevtoolsExtension {
//   private remotedev: any;
//   private connection: RemoteDevToolsProxyConnection;
//
//   readonly defaultOptions: Record<any, any> = {
//     realtime: true,
//     autoReconnect: true,
//     connectTimeout: 20000,
//     ackTimeout: 10000,
//     secure: true
//   };
//
//   constructor(defaultOptions: any) {
//     this.defaultOptions = Object.assign(this.defaultOptions, defaultOptions);
//   }
//
//   connect(options: Record<any, any>): ReduxDevtoolsExtensionConnection {
//     const connectOptions = Object.assign(this.defaultOptions, options);
//     this.remotedev = connect(connectOptions);
//     this.connection = new RemoteDevToolsProxyConnection(this.remotedev);
//     return this.connection;
//   }
//
//   send(action: any, state: any): void {
//     this.connection.send(action, state);
//   }
// }
//
// if (!window['__REDUX_DEVTOOLS_EXTENSION__']) {
//   window['__REDUX_DEVTOOLS_EXTENSION__'] = new RemoteDevToolsProxy({
//     hostname: '192.168.1.17',
//     port: 8000,
//     connectTimeout: 300000, // extend for pauses during debugging
//     ackTimeout: 120000, // extend for pauses during debugging
//     secure: false // dev only
//   });
// }
