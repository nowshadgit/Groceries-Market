import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserList } from '../../models/User/User.interface';
import { ItemsList } from '../../models/DataAdd/DataAdd.interface';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-sign',
  templateUrl: 'sign.html',
})
export class SignPage {

user = {} as UserList;

shopingItemRef$: AngularFireList <UserList>;

public shopId: string;
  public password: string;
  public check: boolean;
  public y: number;

  itemslist = {} as ItemsList;
  addresslist = {} as ItemsList;


  owner: Observable<any[]>;

  addressdata$: AngularFireList <ItemsList>;

  public ownerarray: Array<any> =[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {

  this.shopingItemRef$ = this.database.list('shopowner');

  this.owner = this.shopingItemRef$.snapshotChanges ().map(actions => {
         return actions.map(action => ({ key: action.key,...action.payload.val() }));
    });

  this.owner.subscribe(data=>{
      for(let x=0;x<data.length;x++){
           this.ownerarray[x]=data[x];
      }
    });


  }

  addUsers(user: UserList){

    if(user.userName=="" || user.shopId=="" || user.password==""|| user.userName==undefined || user.shopId==undefined || user.password==undefined){
    	alert("Please enter all fields");
    }else{
        this.check=false;
      for(let x=0;x<this.ownerarray.length;x++){
        if(this.ownerarray[x].shopId==user.shopId){
          this.check=true;
          break;
        }
      }
      if(!this.check){
      	this.shopingItemRef$.push(this.user);
      	this.navCtrl.pop();
        alert("You registered successfully");
      }else{
        alert("Please choose another shopId, Because of it is already existed");
      }
  	}

    user.userName="";
    user.shopId="";
    user.password="";
    user.address="";
}


}
