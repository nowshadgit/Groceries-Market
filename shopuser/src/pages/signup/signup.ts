import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserList } from '../../models/User/User.interface';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { SigninPage } from '../signin/signin';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	user = {} as UserList;
	userdata$: AngularFireList <UserList>;
	items: Observable<any[]>;
	public userarray: Array<any> =[];
	check : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {

  	this.userdata$ = this.database.list('user');
    this.items = this.userdata$.snapshotChanges ().map(actions => {
         return actions.map(action => ({ key: action.key,...action.payload.val() }));
  	});

  	this.items.subscribe(data=>{

  		for(let x=0;x<data.length;x++){
  			this.userarray[x]=data[x];
  		}
  	});


  }
  addUsers(user: UserList){
	  if(user.userName=="" || user.Id=="" || user.password==""|| user.userName==undefined || user.Id==undefined || user.password==undefined){
	  	alert("Please enter all fields");
	  }else{
	  		this.check=false;
	  for(let x=0;x<this.userarray.length;x++){
	  		if(this.userarray[x].Id==user.Id){
	  			this.check=true;
	  			break;
	  		}
	  }
	  if(this.check!=true){
			this.userdata$.push(this.user);
			this.navCtrl.push(SigninPage);
			alert("Registration is successfull.");
		}else{
			alert("Warning! Please Choose another User Id, Because of it is already existed.");
		}
		this.check=false;
	}

	user.userName="";
	user.Id="";
	user.password="";
}
  
}
