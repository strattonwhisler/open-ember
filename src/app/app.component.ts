import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';


@Component({
  standalone: true,
  selector: 'oe-root',
  imports: [
    IonicModule
  ],
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `
})
export class AppComponent {
}
