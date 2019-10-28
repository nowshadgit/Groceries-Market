import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import	'rxjs/add/operator/map';

import { ItemsList } from '../../models/DataAdd/DataAdd.interface';
import { AngularFireDatabase, AngularFireList,   } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import { ItemsesPage } from '../itemses/itemses';

import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

	information : any[];
  public shopId: string;
  public password: string;
  public check: boolean;
  public y: number;


  public addressitem: string;

  address1: Observable<any[]>;

  addresslist = {} as ItemsList;

  addresdata$: AngularFireList <ItemsList>;

  orderlist = {} as ItemsList;

  orderdata$: AngularFireList <ItemsList>;

  items: Observable<any[]>;
  order: Observable<any[]>;

  public orderarray: Array<any> =[];  

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private database: AngularFireDatabase, private actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {

  		let localData = this.http.get('assets/information.json').map(res => res.json().items);
  		localData.subscribe(data=>{
  		this.information=data;
  		});

      this.shopId=this.navParams.get('value1');


      this.addresdata$ = this.database.list('shopowner');
    this.address1 = this.addresdata$.snapshotChanges ().map(actions => {
         return actions.map(action => ({ key: action.key,...action.payload.val() }));
    });


    this.address1.subscribe(data=>{
        for(let x=0;x<data.length;x++){
          if(this.shopId==data[x].shopId){
              this.addressitem=data[x].address;
              break;

          }
        }
      });


      console.log('hai',this.shopId);
      this.orderdata$ = this.database.list('corders');
    this.order = this.orderdata$.snapshotChanges ().map(actions => {
         return actions.map(action => ({ key: action.key,...action.payload.val() }));
    });

    this.order.subscribe(data=>{
      console.log(data);
      for(let x=0,y=0;x<data.length;x++){
        console.log(data[x].Id,this.shopId)
        if( data[x].address==this.addressitem){
           this.orderarray[y]=data[x];
           y++;
            console.log('ok');
        }
      }
    });


  }
  toggleSection(i) {

  	this.information[i].open = !this.information[i].open;
  }

  toggleitem(child) {
  console.log(child);
  	this.navCtrl.push(ItemsesPage,{
  		'value':child.name,
      'value2':this.shopId
  	}
    );

  }

  orderdetails(item){

      this.actionSheetCtrl.create({
      title: `${"Request"}`,
      buttons: [
        {
          text: 'Delivered',
          role: 'destructive',
          handler: () =>{
                
              this.database.object('/corders/'+item.key).remove();
              this.orderlist.Name=item.Name;
              this.orderlist.Type=item.Type;
              this.orderlist.Id=item.Id;
              this.orderlist.amount=item.amount;
              this.orderlist.quantity=item.quantity;
              this.orderlist.userId=item.userId;
              this.orderlist.totalAmount=item.totalAmount;
              this.orderlist.Count=item.Count;
              this.orderlist.address=item.address;

              this.orderlist.status='Delivered';
              
                this.orderdata$.push(this.orderlist);
          }
        },
        {
          text: 'Details',
          role: 'destructive',
          handler: () =>{
                
            let alert = this.alertCtrl.create({
             title: `All details of ORDER \n Total Amount:`+item.totalAmount,

              message:'Item Name: '+item.Name+
              '<br>'+'Item Type: '+item.Type+
              '<br>'+'ShopId: '+item.Id+
              '<br>'+'Item Cost: '+item.amount+
              '<br>'+'Number of items: '+item.Count+
              '<br>'+'Item quantity: '+item.quantity+
              '<br>'+'User ID: '+item.userId+
              '<br>'+'Item status: '+item.status+
              '<br>'+'Item Address: '+item.address
               ,
              buttons: ['Okay']
            });
            alert.present(); 
          }
        }
      ]
    }).present();      

  }
 
}
