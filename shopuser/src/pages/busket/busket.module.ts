import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusketPage } from './busket';

@NgModule({
  declarations: [
    BusketPage,
  ],
  imports: [
    IonicPageModule.forChild(BusketPage),
  ],
})
export class BusketPageModule {}
