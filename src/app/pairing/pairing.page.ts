import { Component, OnInit } from '@angular/core';
import { BleFacade } from '~domain/ble/ble.facade';
import { PairStatus } from './pair-status.enum';


@Component({
  selector: 'oe-pairing',
  templateUrl: 'pairing.page.html'
})
export class PairingPage implements OnInit {
  readonly PairStatus = PairStatus;

  constructor(public ble: BleFacade) {
  }

  ngOnInit(): void {
    this.ble.initialize();
  }
}
