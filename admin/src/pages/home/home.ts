import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';


import { ItemsList } from '../../models/DataAdd/DataAdd.interface';
import { AngularFireDatabase, AngularFireList,   } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	

	public shopId: string;
	public password: string;
	public check: boolean;
	public y: number;

	itemslist = {} as ItemsList;
  addresslist = {} as ItemsList;

	itemsdata$: AngularFireList <ItemsList>;
	orderdata$: AngularFireList <ItemsList>;


	items: Observable<any[]>;
	order: Observable<any[]>;

	addressdata$: AngularFireList <ItemsList>;

	public itemsarray: Array<any> =[];
	public orderarray: Array<any> =[];	

  constructor(public navCtrl: NavController, private database: AngularFireDatabase,public alertCtrl: AlertController) {

  	this.addressdata$ = this.database.list('address');

  	this.itemsdata$ = this.database.list('items');
    this.items = this.itemsdata$.snapshotChanges ().map(actions => {
         return actions.map(action => ({ key: action.key,...action.payload.val() }));
  	});

  	this.items.subscribe(data=>{
      for(let x=0;x<data.length;x++){
      		 this.itemsarray[x]=data[x];
      }
  	});

  	this.orderdata$ = this.database.list('corders');
    this.order = this.orderdata$.snapshotChanges ().map(actions => {
         return actions.map(action => ({ key: action.key,...action.payload.val() }));
  	});

  	this.order.subscribe(data=>{
      for(let x=0;x<data.length;x++){
      		 this.orderarray[x]=data[x];
      }
  	});




  }

  addressIs(shopId: string){
    this.addresslist.address=shopId;
  	this.addressdata$.push(this.addresslist);
  	this.shopId="";
  }

  Itemdetails(item: ItemsList){
  		let alert = this.alertCtrl.create({
     title: `All details of ITEM`,
      message:'Item Name: '+item.Name+
      '<br>'+'Item Type: '+item.Type+
      '<br>'+'ShopId: '+item.Id+
      '<br>'+'Item Cost: '+item.amount+
      '<br>'+'Number of items: '+item.Count+
      '<br>'+'Item quantity: '+item.quantity+
      '<br>'+'Item address: '+item.address
       ,
      buttons: ['Okay']
    });
    alert.present();
  }

  orderdetails(item: ItemsList){

		let alert = this.alertCtrl.create({
     title: `All details of ORDER \n Total Amount:`+item.totalAmount,

      message:'Item Name: '+item.Name+
      '<br>'+'Item Type: '+item.Type+
      '<br>'+'ShopId: '+item.Id+
      '<br>'+'Item Cost: '+item.amount+
      '<br>'+'Number of items: '+item.Count+
      '<br>'+'Item quantity: '+item.quantity+
      '<br>'+'Item address: '+item.address+
      '<br>'+'User ID: '+item.userId
       ,
      buttons: ['Okay']
    });
    alert.present();  	

  }

}
