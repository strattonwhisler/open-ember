import { CapacitorConfig } from '@capacitor/cli';
const process = require('process');


const serverUrl = process.env.CAP_SERVER_URL;

const config: CapacitorConfig = {
  appId: 'dev.whisler.openember',
  appName: 'open-ember',
  webDir: 'www',
  bundledWebRuntime: false,
  server: serverUrl ? {
    url: serverUrl,
    cleartext: true
  } : undefined,
  android: {
    webContentsDebuggingEnabled: true
  }
};

export default config;
