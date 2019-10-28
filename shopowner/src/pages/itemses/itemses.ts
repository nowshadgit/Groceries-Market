import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ItemsList } from '../../models/DataAdd/DataAdd.interface';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-itemses',
  templateUrl: 'itemses.html',
})
export class ItemsesPage {

	public itemsName:string;

  public check: boolean;

  public addressitem: string;

	items1: Observable<any[]>;

	itemslist = {} as ItemsList;

  address1: Observable<any[]>;

  addresslist = {} as ItemsList;

	itemsdata$: AngularFireList <ItemsList>;
  addresdata$: AngularFireList <ItemsList>;

	public itemsarray: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
  this.itemsName=this.navParams.get('value');
  this.itemsarray=this.navParams.get('value2');
  this.itemsdata$ =this.database.list('items');

  this.addresdata$ = this.database.list('shopowner');
    this.address1 = this.addresdata$.snapshotChanges ().map(actions => {
         return actions.map(action => ({ key: action.key,...action.payload.val() }));
    });


    this.address1.subscribe(data=>{
        for(let x=0;x<data.length;x++){
          console.log(data[x].shopId,data[x].address);
          console.log(this.itemsarray);

          if(this.itemsarray==data[x].shopId){
              this.addressitem=data[x].address;
              break;

          }
        }
      });


  }

  addItems(item: ItemsList){

      this.check=false;
      if( item.Name==undefined || item.amount==undefined || item.Count==undefined || item.quantity==undefined || item.amount==null || item.Count==null|| item.quantity==null){
        alert("Please fill all input fields");
      }else{

        item.address=this.addressitem;
          item.Id=this.itemsarray;
      		item.Type=this.itemsName;
      		this.itemsdata$.push(item);
      			console.log(item);

      	}	

    item.Name="";
    item.amount=null;
    item.Count=null;
    item.quantity=null;
  }

}
