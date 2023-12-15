import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ROUTE_PROVIDERS } from './app.routes';
import { STATE_PROVIDERS } from '~domain/state.module';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { BrowserModule } from '@angular/platform-browser';

export const APP_IMPORTS: NgModule['imports'] = [
  IonicModule.forRoot(),
  IonicStorageModule.forRoot(),
];

export const APP_PROVIDERS: NgModule['providers'] = [
  ...STATE_PROVIDERS,
  ...ROUTE_PROVIDERS,
];

@NgModule({
  imports: [
    BrowserModule,
    ...APP_IMPORTS
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: APP_PROVIDERS
})
export class AppModule {}
