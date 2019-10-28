import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { ItemsList } from '../../models/DataAdd/DataAdd.interface';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-busket',
  templateUrl: 'busket.html',
})
export class BusketPage {

	public itemsName:string;
	public name:string;
	public kg: number;
	public counts:number;
  public sum: number=0;
  public username: string;
  public size: number=0;
  public csize: number=0;
  public check: boolean=false;
  public address: string;

	items1: Observable<any[]>;
  it: Observable<any[]>;
	corderitems: Observable<any[]>;

	corderlist = {} as ItemsList;
	orderlist = {} as ItemsList;
  orderlist1 = {} as ItemsList;
  modifylist = {} as ItemsList;

	corderdata$: AngularFireList <ItemsList>;
	orderdata$: AngularFireList <ItemsList>;
  itemsdata$: AngularFireList <ItemsList>;

	public itemsarray: Array<any> =[];
  public orderarray: Array<any> =[];
  public orderarray1: Array<any> =[];
  public corderarray: Array<any> =[];



  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private actionSheetCtrl: ActionSheetController) {


      this.username=navParams.get('id1');
      this.address=navParams.get('id2');

  	this.corderdata$ = this.database.list('corders');
    this.orderdata$ = this.database.list('orders');
    this.itemsdata$ = this.database.list('items');

    this.it = this.itemsdata$.snapshotChanges ().map(actions => {
         return actions.map(action => ({ key: action.key,...action.payload.val() }));
     });

    this.it.subscribe(data=>{
      for(let x=0;x<data.length;x++){
            this.itemsarray[x]=data[x];
      }  
    });



  	this.items1 = this.orderdata$.snapshotChanges ().map(actions => {
         return actions.map(action => ({ key: action.key,...action.payload.val() }));
  	});
    this.items1.subscribe(data=>{

      this.size=0;
      for(let x=0,y=0;x<data.length;x++){
      if(data[x].userId==this.username && data[x].address==this.address){
          this.orderarray[y]=data[x]; 
          y++;
          this.size++; 
    	}       
      }
    });

    this.corderitems=this.corderdata$.snapshotChanges ().map(actions => {
         return actions.map(action => ({ key: action.key,...action.payload.val() }));
  	});
    this.corderitems.subscribe(data=>{
       
        this.csize=0;
        this.sum=0;
       for(let x=0,y=0;x<data.length;x++){ 
        if(data[x].userId==this.username && data[x].address==this.address){
          this.corderarray[y]=data[x];
          console.log('This is corder items: ',this.corderarray[y]); 
          this.sum=this.sum+this.corderarray[y].totalAmount;
          y++;
          this.csize++; 

          
        }
      }
     
    });

   
  }

  	selectItems(item: ItemsList){
        this.corderlist.Name=item.Name;
        this.corderlist.amount=item.amount;
        this.actionSheetCtrl.create({
      title: `${"Request"}`,
      buttons: [
        {
          text: 'Order Cancel',
          role: 'destructive',
          handler: () =>{
                
            this.database.object('/orders/'+item.key).remove();
            this.orderarray.length=this.orderarray.length-1;
          }
        }
      ]
    }).present();
  	}

    confirm(size: number){
       for(let x=0;x<this.orderarray.length;x++){
        if(this.orderarray[x].userId==this.username){
            this.orderlist1.userId=this.username;
            this.orderlist1.Count=this.orderarray[x].Count;
            this.orderlist1.Id=this.orderarray[x].Id;
            this.orderlist1.Name=this.orderarray[x].Name;
            this.orderlist1.amount=this.orderarray[x].amount;
            this.orderlist1.quantity=this.orderarray[x].quantity;
            this.orderlist1.totalAmount=this.orderarray[x].totalAmount;
            this.orderlist1.Type=this.orderarray[x].Type;
            this.orderlist1.status='Ordered';
            this.orderlist1.address=this.orderarray[x].address;
            this.corderdata$.push(this.orderlist1);
           this.database.object('/orders/'+this.orderarray[x].key).remove();

            
          }
       }

       for(let x=0;x<this.orderarray.length;x++){


        for(let z=0;z<this.itemsarray.length;z++){

              if(this.itemsarray[z].Name==this.orderarray[x].Name && this.itemsarray[z].Type==this.orderarray[x].Type && this.itemsarray[z].quantity==this.orderarray[x].quantity && this.itemsarray[z].address==this.orderarray[x].address && this.itemsarray[z].Id==this.orderarray[x].Id && this.itemsarray[z].amount==this.orderarray[x].amount && this.itemsarray[z].Count>=this.orderarray[x].Count){

                  this.modifylist.Name=this.itemsarray[z].Name;
                  this.modifylist.amount=this.itemsarray[z].amount;
                  this.modifylist.quantity=this.itemsarray[z].quantity;
                  this.modifylist.Type=this.itemsarray[z].Type;
                  this.modifylist.address=this.itemsarray[z].address;
                  this.modifylist.Id=this.itemsarray[z].Id;
                  this.modifylist.Count=this.itemsarray[z].Count-this.orderarray[x].Count;

                  this.database.object('/items/'+this.itemsarray[z].key).remove();

                  this.itemsdata$.push(this.modifylist);

                  console.log('sucessssssssssssssssssssssss');
                  break;
              }
            }
     
       }

       this.size=0;
      alert("Confirmation is success full");

    }


    acceptedItems(csize: number){
    this.check=false;
      let y=0;
    		for(let x=0;x<this.corderarray.length;x++){

    			if(this.corderarray[x].status=="Delivered"){
    				y++;
    			}
    		}
        if(y==this.corderarray.length){

          for(let x=0;x<this.corderarray.length;x++){
            this.database.object('/corders/'+this.corderarray[x].key).remove();
          }
            this.csize=0;
            this.check=true;
        }
        if(this.check){
          alert("Thanks for using our app");
        }else{
          alert("Please just wait upto recieve all things");
        }


    }

}
