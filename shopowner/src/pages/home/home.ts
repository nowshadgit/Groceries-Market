import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { UserList } from '../../models/User/User.interface';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AddPage } from '../add/add';
import { SignPage } from '../sign/sign';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

public shopId: string;
public password: string;
public check: boolean;
public y: number;

userlist = {} as UserList;
userdata$: AngularFireList <UserList>;
items: Observable<any[]>;

public itemsarray: Array<any> =[];

  constructor(public navCtrl: NavController, private database: AngularFireDatabase, public loadingCtrl: LoadingController) {
  	this.userdata$ = this.database.list('shopowner');
    this.items = this.userdata$.snapshotChanges ().map(actions => {
         return actions.map(action => ({ key: action.key,...action.payload.val() }));
  	});

  	this.items.subscribe(data=>{
      for(let x=0;x<data.length;x++){
      		 this.itemsarray[x]=data[x];
      }
  	});
  		
  }

signin(shopId,password){

		this.check=false;
	if(shopId=="" || password=="" || shopId==undefined || password==undefined){
		alert("please enter all fields completly");
	}else{

		for(let x=0;x<this.itemsarray.length;x++){

			if(shopId==this.itemsarray[x].shopId && password==this.itemsarray[x].password){
				this.check=true;
				this.y=x;
				break;
			}	
		}
		console.log(this.y);
		if(this.check){

			this.navCtrl.push(AddPage, {
  		'value1':shopId
  		});
		}else{
			alert("Please enter correct password (or) username");
			}
		
	}
this.shopId="";
this.password="";

}
addShoping(){
	this.navCtrl.push(AddPage);
}

signup(){
	this.navCtrl.push(SignPage);
}

}
