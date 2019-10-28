import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BusketPage } from '../busket/busket';
import { SearchPage } from '../search/search';
import { CategoriesPage } from '../categories/categories';
import { AllPage } from '../all/all';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  tab1Root = AllPage;
  tab2Root = CategoriesPage;
  tab3Root = SearchPage;
  tab4Root = BusketPage;

  tabParams:any;
   public itemsarray: string;
   public addressarray: string;



  constructor(public navCtrl: NavController, public navParams: NavParams) {

  		this.itemsarray=this.navParams.get('value1');
      this.addressarray=this.navParams.get('address');
  		console.log('hai',this.itemsarray);

      this.tabParams={id1: this.itemsarray,id2: this.addressarray};
        console.log(this.tabParams);
  }

}
