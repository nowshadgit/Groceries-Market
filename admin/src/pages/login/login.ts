import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserList } from '../../models/User/User.interface';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	public shopId: string;
public password: string;
public check: boolean;
public y: number;

userlist = {} as UserList;
userdata$: AngularFireList <UserList>;
items: Observable<any[]>;

public itemsarray: Array<any> =[];



  constructor(public navCtrl: NavController,private database: AngularFireDatabase, public navParams: NavParams) {


  this.userdata$ = this.database.list('address');
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

			if(shopId==this.itemsarray[x].Name && password==this.itemsarray[x].password){
				this.check=true;
				this.y=x;
				break;
			}	
		}
		console.log(this.y);
		if(this.check){

			this.navCtrl.push(HomePage, {
  		'value1':shopId
  		});
		}else{
			alert("Please enter correct password (or) username");
			}
		
	}
this.shopId="";
this.password="";

}

}
