import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemsesPage } from './itemses';

@NgModule({
  declarations: [
    ItemsesPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemsesPage),
  ],
})
export class ItemsesPageModule {}
