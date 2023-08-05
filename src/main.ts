import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { STATE_PROVIDERS } from '~domain/state.module';
import { ROUTE_PROVIDERS } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { RxIf } from "@rx-angular/template/if";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(
  AppComponent,
  {
    providers: [
      ...STATE_PROVIDERS,
      ...ROUTE_PROVIDERS,
      importProvidersFrom(
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        RxIf
      ),
    ]
  }
).catch(err => console.log(err));
