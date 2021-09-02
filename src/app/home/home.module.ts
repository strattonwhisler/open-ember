import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { ReactiveComponentModule } from '@ngrx/component';
import { SharedModule } from '~shared/shared.module';


const PAGES = [
  HomePage
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveComponentModule,
    SharedModule
  ],
  declarations: [...PAGES]
})
export class HomePageModule {
}
