import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ItemsList } from '../../models/DataAdd/DataAdd.interface';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-all',
  templateUrl: 'all.html',
})
export class AllPage {

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, public alertCtrl: AlertController) {

    
        this.username=this.navParams.get('id1');
    this.address=this.navParams.get('id2');          
    
    this.orderdata$ = this.database.list('orders');
    this.itemsdata$ = this.database.list('items');

    this.items1 = this.itemsdata$.snapshotChanges ().map(actions => {
         return actions.map(action => ({ key: action.key,...action.payload.val() }));
  });

    this.items1.subscribe(data=>{
      for(let x=0;x<data.length;x++){
            this.itemsarray[x]=data[x];
      }  
    });


    this.items1.subscribe(data=>{
      for(let x=0;x<data.length;x++){
            if(data[x].Count==0){
              this.database.object('/items/'+data[x].key).remove();
            }
      }  
    }); 

  }

  Itemdetails(ite: Array<any> =[], i: number){
      
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
           console.log(this.counts);
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
            alert("Please choose currect quantity");
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

        alert("Here items are not available");

    }

  }

  

}
