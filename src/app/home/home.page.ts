import { Component } from '@angular/core';
import { native } from '@nativescript/capacitor';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {
  }

  openModal() {
    native.hello();
  }

}
