import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ItemsesPage } from '../itemses/itemses';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

information : any[];

  public itemsarray: Array<any> =[];
  public items:string;
  public addresses:string;

  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams) {
  	let localData = this.http.get('assets/information.json').map(res => res.json().items);
  	localData.subscribe(data=> {
  	this.information= data;
  	});
    if(this.navParams.get('id1')!=undefined){
     console.log('okkkkkkk',this.navParams.get('id1'),this.navParams.get('id2'));
     this.items=this.navParams.get('id1');
    }else{
      this.items=this.navParams.get('value');
    }
    this.addresses=this.navParams.get('id2');
     
  }

  toggleSection(i) {

  	this.information[i].open = !this.information[i].open;
  }

 toggleitem(child) {
  console.log(child);

    this.navCtrl.push(ItemsesPage,{
      'value':child,
      'value1':this.items,
      'address':this.addresses
    });

  }

}
