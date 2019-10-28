import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ItemsList } from '../../models/DataAdd/DataAdd.interface';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-itemses',
  templateUrl: 'itemses.html',
})
export class ItemsesPage {

	public itemsName:string;
	public kg: number;
  public counts:number;
  public Id: string;
  public search: string;
  public username: string;
  public address: string;



	items1: Observable<any[]>;

	itemslist = {} as ItemsList;
  orderlist = {} as ItemsList;

	itemsdata$: AngularFireList <ItemsList>;
  orderdata$: AngularFireList <ItemsList>;

	public itemsarray: Array<any> =[];
  public itemsarray1: Array<any> =[];



  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private database: AngularFireDatabase) {

  	this.itemsName=this.navParams.get('value');
    this.address=this.navParams.get('address');


    if(this.navParams.get('value1')!=undefined){
      this.username=this.navParams.get('value1');
    }else{
        this.username=this.navParams.get('value4')
    }
    this.search=this.navParams.get('value3');
   
  	this.itemsdata$ = this.database.list('items');
    this.orderdata$ = this.database.list('orders');


  	this.items1 = this.itemsdata$.snapshotChanges ().map(actions => {
         return actions.map(action => ({ key: action.key,...action.payload.val() }));
  });
      if(this.itemsName==undefined){
          this.itemsName=this.search;
          console.log('hai');
      }

      console.log('dondodnendoednd');

  	this.items1.subscribe(data=>{
      console.log(data);
      for(let x=0,y=0;x<data.length;x++){

      	if(data[x].Type==this.itemsName || data[x].Type==this.search){
            this.itemsarray[y]=data[x];
            y++;
      	}
      }
      console.log(data);
  });
  }

  kgs(ite: Array<any> =[], i: number){


      console.log(ite);
      
      console.log(ite[i].Id);
    if(ite[i].Count>0){
        let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter Count of item",
      inputs: [
        {
          name: 'title',
          placeholder: 'Count'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Count data:', data);
           this.counts = parseInt(data.title);
           console.log(this.counts,ite[i].Count);
        if(this.counts<=ite[i].Count){
          this.orderlist.address=this.address;
          this.orderlist.Id=ite[i].Id;
if(this.username==undefined){

       alert("Warning! Please do the registration first.");

      }else{

          this.orderlist.userId=this.username;
          this.orderlist.amount=ite[i].amount;
          this.orderlist.Count=this.counts;
          this.orderlist.quantity=ite[i].quantity;
          this.counts=this.counts*ite[i].quantity*this.orderlist.amount;
          console.log('helooooo',this.counts);
          this.orderlist.Name=ite[i].Name;
          this.orderlist.totalAmount=this.counts;
          this.orderlist.userId=this.username;
          this.orderlist.Type=ite[i].Type;
        if(this.counts>0 || this.counts!=NaN){
          this.orderdata$.push(this.orderlist);
          alert("Please see your busket");
        }else{
            alert("Please choose currect qunatity");
          }
      }
      }else{
        alert('Suggestion! Please enter within item available count');
      }
        }
        }
      ]
    });
    prompt.present();
  }else{
    alert("Warning! Here items are not available");
    }
  }

  
}
