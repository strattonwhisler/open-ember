import { ReduxDevtoolsExtension } from '@ngrx/store-devtools/src/extension';

declare global {
  interface Window {
    global: Window;
    __REDUX_DEVTOOLS_EXTENSION__: ReduxDevtoolsExtension;
  }
}
