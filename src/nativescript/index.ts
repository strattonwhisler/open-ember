import '@nativescript/capacitor/bridge';

// import './examples/modal';

// import '../shared/platform-notifications.native';
// import './services/bluetooth-gatt.service';

native.hello = function hello() {
  if(native.isAndroid) {
    android.util.Log.i('OpenEmber', 'Hello Worlds!');
  }
};
