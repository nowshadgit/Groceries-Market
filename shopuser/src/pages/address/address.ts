import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

	public check:boolean;
	public itemsarray:string;

	addressdata$: AngularFireList <string>;

	public addressarray: Array<any> =[];

	address1: Observable<any[]>;



  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {

  			this.itemsarray=this.navParams.get('value1');

  			this.addressdata$ = this.database.list('address');


  		this.address1 = this.addressdata$.snapshotChanges ().map(actions => {
         return actions.map(action => ({ key: action.key,...action.payload.val() }));
  	});

  }

  checking(address: string){

  			this.check=false;
  		 this.address1.subscribe(data=>{
      	console.log(data,address);
      for(let x=0;x<data.length;x++){

      	if(data[x].address==address){
            this.check=true;
            break;

      	}
      }
      if(this.check==true){
      	alert('Thanks! Your address is avaiable');
      	this.navCtrl.push(HomePage,{
      		'address':address,
      		'value1':this.itemsarray
      	});
      }else{
      	alert('Sorry! Your entered address is Not avaiable. Please choose another place');
      }
  });
  }

}
