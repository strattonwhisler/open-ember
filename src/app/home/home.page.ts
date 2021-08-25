import { Component, OnInit } from '@angular/core';
import { BleService } from '../service/ble.service';
import { of } from 'rxjs';
import { delay, exhaustMap, filter, tap } from 'rxjs/operators';
import { NAME } from '../ember/ember-ble.consts';
import { ScanResult } from '@capacitor-community/bluetooth-le';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private spinner!: HTMLIonLoadingElement;

  results: ScanResult[];

  constructor(private bleService: BleService, private loadingController: LoadingController) {
  }

  ngOnInit(): void {
    this.bleService.initialize().subscribe(undefined, console.error);

    this.bleService.scanResults$.pipe(
      filter(result => result.device.name === NAME)
    ).subscribe(result => {
      this.results.push(result);
    }, console.error);
  }

  scan(): void {
    of(null).pipe(
      // delayWhen(() => this.bleService.initalized$$),
      exhaustMap(async () => {
        this.results = [];

        this.spinner = await this.loadingController.create({
          message: 'Scanning',
        });
        await this.spinner.present();
      }),
      exhaustMap(() =>
        // this.bleService.requestLEScan({ name: NAME })
        this.bleService.requestLEScan({})
      ),
      delay(5000), // Wait 5 seconds
      exhaustMap(() =>
        this.bleService.stopLEScan()
      ),
      exhaustMap(async () => {
        await this.spinner.dismiss();
      })
    ).subscribe(undefined, console.error);
  }

  pair(): void {

  }
}
