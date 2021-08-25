import { Component, OnInit } from '@angular/core';
import { BleFacade } from '../domain/ble/ble.facade';


@Component({
  selector: 'app-pairing',
  templateUrl: 'pairing.page.html'
})
export class PairingPage implements OnInit {
  constructor(public ble: BleFacade) {}

  ngOnInit(): void {
    this.ble.initialize();
  }
}
